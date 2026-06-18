import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import BreadCrumb from '@/Shared/BreadCrumb/BreadCrumb';
import HelmetChanger from '@/Shared/Helmet/Helmet';
import Loading from '@/Shared/Loading/Loading';
import { useSpecialtiesQuery } from '@/api/hooks/specialty/useSpecialtyQueries';
import {
  useAIRecommendDoctorMutation,
  useAISuggestSpecialtiesMutation,
} from '@/api/hooks/ai/useAIQueries';
import { doctorService } from '@/api/services/doctorService';

const STORAGE_KEY = 'mediic:doctor-ai-finder:v1';

const readPersisted = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const persistSnapshot = (snapshot) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* ignore quota */
  }
};

const unwrapList = (res) => res?.data?.data ?? res?.data ?? [];

const unwrapAiPayload = (res) => res?.data ?? res;

// const pickPublicDoctor = (res) => {
//   const body = res?.data ?? res;
//   return body?.data ?? body;
// };

async function enrichRecommendationsWithProfiles(recs) {
  const list = Array.isArray(recs) ? recs : [];
  if (list.length === 0) return list;

  const doctorIds = list.map((r) => r?.doctor_id ?? r?.doctorId).filter(Boolean);
  if (doctorIds.length === 0) return list;

  try {
    const res = await doctorService.getDoctorsBulkPublic(doctorIds);
    const profiles = res?.data?.data ?? res?.data ?? [];

    // Create a map for quick lookup
    const profileMap = {};
    if (Array.isArray(profiles)) {
      profiles.forEach((p) => {
        if (p?.id) {
          profileMap[p.id] = p;
        }
      });
    }

    // Merge profiles back into recommendations
    return list.map((r) => {
      const id = r?.doctor_id ?? r?.doctorId;
      const d = profileMap[id];
      if (!d) return r;
      return {
        ...r,
        profile: {
          fullName: d.fullName ?? d.full_name,
          avatarUrl: d.avatarUrl ?? d.avatar_url,
          degree: d.degree,
          position: d.position,
        },
      };
    });
  } catch (error) {
    console.error('Failed to fetch bulk profiles:', error);
    return list; // fallback to un-enriched list
  }
}

const DoctorAiFinder = () => {
  const persisted = useMemo(() => readPersisted(), []);

  const [symptoms, setSymptoms] = useState(() => persisted.symptoms ?? '');
  const [extractedSymptoms, setExtractedSymptoms] = useState(() => persisted.extractedSymptoms ?? []);
  const [selectedIds, setSelectedIds] = useState(() => {
    const ids = persisted.selectedIds;
    return new Set(Array.isArray(ids) ? ids.map(String) : []);
  });
  const [aiNote, setAiNote] = useState(() => persisted.aiNote ?? '');

  // New CQU States
  const [cquData, setCquData] = useState(() => persisted.cquData ?? null);
  const [clarificationQuestion, setClarificationQuestion] = useState(() => persisted.clarificationQuestion ?? '');
  const [isEmergency, setIsEmergency] = useState(() => persisted.isEmergency ?? false);
  const [emergencyReason, setEmergencyReason] = useState(() => persisted.emergencyReason ?? '');
  const [isOutOfScope, setIsOutOfScope] = useState(() => persisted.isOutOfScope ?? false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnalyzed, setIsAnalyzed] = useState(() => persisted.isAnalyzed ?? false);

  const [recommendations, setRecommendations] = useState(() =>
    Array.isArray(persisted.recommendations) ? persisted.recommendations : null,
  );
  const [errorMsg, setErrorMsg] = useState('');

  const resultsAnchorRef = useRef(null);

  const { data: specRes, isLoading: specLoading } = useSpecialtiesQuery({
    page: 1,
    limit: 100,
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const specialties = useMemo(() => unwrapList(specRes), [specRes]);

  const catalog = useMemo(
    () =>
      specialties
        .filter((s) => s?.id && s?.name)
        .map((s) => ({ id: String(s.id), name: String(s.name) })),
    [specialties],
  );

  const suggestMutation = useAISuggestSpecialtiesMutation();
  const recommendMutation = useAIRecommendDoctorMutation();

  useEffect(() => {
    persistSnapshot({
      symptoms,
      extractedSymptoms,
      selectedIds: Array.from(selectedIds),
      aiNote,
      cquData,
      clarificationQuestion,
      isEmergency,
      emergencyReason,
      isOutOfScope,
      recommendations,
      isAnalyzed,
    });
  }, [symptoms, extractedSymptoms, selectedIds, aiNote, cquData, clarificationQuestion, isEmergency, emergencyReason, isOutOfScope, recommendations, isAnalyzed]);

  const scrollToResults = useCallback(() => {
    requestAnimationFrame(() => {
      resultsAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const toggleSpecialty = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSavedSession = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setSymptoms('');
    setExtractedSymptoms([]);
    setSelectedIds(new Set());
    setAiNote('');
    setCquData(null);
    setClarificationQuestion('');
    setIsEmergency(false);
    setEmergencyReason('');
    setIsOutOfScope(false);
    setUserAnswer('');
    setRecommendations(null);
    setErrorMsg('');
    setIsAnalyzed(false);
  };

  const emergencyRef = useRef(null);

  useEffect(() => {
    if (isEmergency && emergencyRef.current) {
      emergencyRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emergencyRef.current.classList.add('animate-shake');
      setTimeout(() => {
        if (emergencyRef.current) {
          emergencyRef.current.classList.remove('animate-shake');
        }
      }, 600);
    }
  }, [isEmergency]);

  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
    setIsAnalyzed(false);
    if (isEmergency) setIsEmergency(false);
    if (isOutOfScope) setIsOutOfScope(false);
    if (clarificationQuestion) setClarificationQuestion('');
    if (aiNote) setAiNote('');
    if (cquData) setCquData(null);
    if (errorMsg) setErrorMsg('');
  };

  const applyAiSuggestion = (overrideSymptoms = null) => {
    setErrorMsg('');
    setAiNote('');
    setClarificationQuestion('');
    setIsEmergency(false);
    setEmergencyReason('');
    setIsOutOfScope(false);
    setCquData(null);

    // Support being called directly from onClick (Event object) or from code (string)
    const textToAnalyze = typeof overrideSymptoms === 'string' ? overrideSymptoms : symptoms;

    if (textToAnalyze.trim().length < 8) {
      setErrorMsg('Vui lòng nhập ít nhất 8 ký tự mô tả triệu chứng hoặc nhu cầu của bạn.');
      return;
    }
    if (!catalog.length) {
      setErrorMsg('Danh sách chuyên khoa đang tải. Vui lòng thử lại sau.');
      return;
    }
    suggestMutation.mutate(
      { symptoms: textToAnalyze.trim() },
      {
        onSuccess: (res) => {
          const payload = unwrapAiPayload(res);
          const ids = payload?.specialty_ids ?? payload?.specialtyIds ?? [];
          const extracted = payload?.extracted_symptoms ?? payload?.extractedSymptoms ?? [];

          setAiNote(payload?.note ?? '');
          setExtractedSymptoms(extracted);
          setClarificationQuestion(payload?.clarification_question || '');
          setIsEmergency(payload?.is_emergency || false);
          setEmergencyReason(payload?.emergency_reason || '');
          setIsOutOfScope(payload?.is_fallback && payload?.fallback_reason === 'out_of_scope');
          setCquData(payload);
          setIsAnalyzed(true);

          // Do not auto-select specialties if the AI is actively asking for clarification.
          if (payload?.clarification_question) {
            setSelectedIds(new Set());
          } else if (Array.isArray(ids) && ids.length) {
            setSelectedIds(new Set(ids.map(String)));
          } else {
            setSelectedIds(new Set());
          }
        },
        onError: (e) => {
          setErrorMsg(e?.message || 'Không thể phân tích chuyên khoa. Vui lòng thử lại.');
        },
      },
    );
  };

  const handleAnswerSubmit = () => {
    if (!userAnswer.trim()) return;
    const updatedSymptoms = symptoms + '\n\nBổ sung: ' + userAnswer.trim();
    setSymptoms(updatedSymptoms);
    setUserAnswer('');
    applyAiSuggestion(updatedSymptoms);
  };

  const findDoctors = () => {
    setErrorMsg('');
    if (symptoms.trim().length < 8) {
      setErrorMsg('Vui lòng nhập ít nhất 8 ký tự mô tả triệu chứng hoặc nhu cầu của bạn.');
      return;
    }
    if (isEmergency || isOutOfScope || clarificationQuestion) {
      setErrorMsg('Vui lòng giải quyết cảnh báo hoặc trả lời câu hỏi làm rõ trước khi tìm bác sĩ.');
      return;
    }
    if (!isAnalyzed) {
      setErrorMsg('Vui lòng nhấn "Phân Tích Bằng AI" trước khi tìm bác sĩ.');
      return;
    }
    const specialtyIds = Array.from(selectedIds);
    const searchSymptoms = extractedSymptoms.length > 0 ? extractedSymptoms.join(', ') : symptoms.trim();
    const body = {
      symptoms: searchSymptoms,
      topK: 5,
      cquData,
      ...(specialtyIds.length ? { specialtyIds } : {}),
    };
    recommendMutation.mutate(body, {
      onSuccess: async (res) => {
        const payload = unwrapAiPayload(res);
        const recs = payload?.recommendations ?? [];
        const base = Array.isArray(recs) ? recs : [];
        setRecommendations(base);
        scrollToResults();
        try {
          const withProfiles = await enrichRecommendationsWithProfiles(base);
          setRecommendations(withProfiles);
        } catch {
          /* giữ danh sách gốc nếu profile lỗi */
        }
      },
      onError: (e) => {
        setErrorMsg(e?.message || 'Không thể lấy gợi ý bác sĩ. Vui lòng thử lại.');
      },
    });
  };

  return (
    <>
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          .animate-shake {
            animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
          }
        `}
      </style>
      <HelmetChanger
        title="Tìm kiếm bác sĩ AI - Gợi ý chuyên khoa thông minh"
        description="Mô tả triệu chứng và để AI gợi ý chuyên khoa, bác sĩ phù hợp nhất cho bạn. Công nghệ RAG hàng đầu cho y tế"
        url="/doctor-ai-finder"
      />
      <BreadCrumb
        breadCrumbTitle={'Trợ Lý AI'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Trợ Lý AI'}
      />
      <section className='bg-BodyBg-0 py-24 md:py-28 transition-opacity duration-300'>
        <div className='Container max-w-5xl'>
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8'>
            <div className='flex items-center gap-3'>
              <div>
                <h1 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0'>
                  Tìm Bác Sĩ Cùng Trợ Lý AI
                </h1>
                <p className='text-TextColor2-0 text-[15px] mt-1 max-w-2xl leading-relaxed '>
                  Mô tả triệu chứng để AI phân tích và gợi ý bác sĩ phù hợp nhất.
                  <br />
                  <span className='font-bold text-HeadingColor-0'>Lưu ý:</span> Kết quả từ AI chỉ mang tính tham khảo, không thay thế chẩn đoán y khoa.
                </p>
              </div>
            </div>
            <button
              type='button'
              onClick={clearSavedSession}
              className='self-start text-sm font-AlbertSans text-TextColor2-0 underline underline-offset-2 hover:text-HeadingColor-0'
            >
              Xóa dữ liệu & làm lại
            </button>
          </div>

          <div className='bg-white rounded-3xl border border-BodyBg2-0 shadow-sm p-6 md:p-8 transition-shadow duration-300 hover:shadow-md'>
            <label
              htmlFor='doctor-ai-symptoms'
              className='block font-AlbertSans font-semibold text-HeadingColor-0 mb-2'
            >
              Mô tả triệu chứng / Lý do khám
            </label>
            <textarea
              id='doctor-ai-symptoms'
              className='w-full min-h-[120px] rounded-2xl border border-BodyBg2-0 px-4 py-3 font-AlbertSans text-TextColor2-0 focus:outline-none focus:ring-2 focus:ring-PrimaryColor-0 transition-shadow duration-200'
              placeholder='VD: Tôi bị đau bụng vùng thượng vị và buồn nôn đã vài ngày...'
              value={symptoms}
              onChange={handleSymptomsChange}
              autoComplete='off'
            />
            {symptoms.trim().length < 8 && (
              <p className='text-xs text-TextColor2-0 mt-2 font-AlbertSans'>
                * Vui lòng mô tả chi tiết hơn, ít nhất 8 ký tự.
              </p>
            )}

            <div className='flex flex-wrap items-center gap-3 mt-4'>
              <button
                type='button'
                className='px-5 py-2.5 rounded-full bg-Secondarycolor-0 text-white font-AlbertSans text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity duration-200'
                disabled={suggestMutation.isPending || specLoading || symptoms.trim().length < 8}
                onClick={applyAiSuggestion}
              >
                {suggestMutation.isPending ? 'Đang phân tích...' : 'Phân Tích Bằng AI'}
              </button>
              <button
                type='button'
                className='px-5 py-2.5 rounded-full bg-PrimaryColor-0 text-white font-AlbertSans text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity duration-200 inline-flex items-center gap-2'
                disabled={recommendMutation.isPending || isEmergency || isOutOfScope || !!clarificationQuestion || symptoms.trim().length < 8 || !isAnalyzed}
                onClick={findDoctors}
              >
                {recommendMutation.isPending ? (
                  <>
                    <span className='inline-block size-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    Đang tìm kiếm...
                  </>
                ) : (
                  'Tìm Bác Sĩ'
                )}
              </button>
            </div>

            {aiNote && !isOutOfScope ? (
              <p
                className='mt-4 text-sm text-HeadingColor-0 bg-BodyBg-0 rounded-xl px-4 py-3 border border-BodyBg2-0'
                role='status'
              >
                <span className='font-semibold'>Ghi chú từ AI: </span>
                {aiNote}
              </p>
            ) : null}

            {isOutOfScope ? (
              <div className='mt-5 p-4 rounded-xl bg-orange-50 border border-orange-200 flex items-start gap-3'>
                <span className='text-orange-600 text-2xl'>⚠️</span>
                <div>
                  <h3 className='font-AlbertSans font-bold text-orange-800 text-base mb-1'>CÂU HỎI NGOÀI LỀ</h3>
                  <p className='text-sm text-orange-700 font-AlbertSans leading-relaxed'>
                    {aiNote || "Hệ thống MedicaLink chỉ hỗ trợ tư vấn và gợi ý bác sĩ chuyên khoa. Xin vui lòng đặt các câu hỏi liên quan đến sức khỏe và triệu chứng bệnh."}
                  </p>
                </div>
              </div>
            ) : null}

            {isEmergency ? (
              <div ref={emergencyRef} className='mt-5 p-4 rounded-xl bg-red-50 border border-red-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <div className='flex items-start gap-3'>
                  <span className='text-red-600 text-2xl mt-0.5'>🚨</span>
                  <div>
                    <h3 className='font-AlbertSans font-bold text-red-800 text-base mb-1'>CẢNH BÁO Y TẾ KHẨN CẤP</h3>
                    <p className='text-sm text-red-700 font-AlbertSans leading-relaxed'>
                      Dựa trên mô tả của bạn, tình trạng này có thể nguy hiểm đến tính mạng ({emergencyReason}).
                      <br/><span className='font-semibold'>Vui lòng gọi cấp cứu 115 hoặc đến ngay cơ sở y tế gần nhất!</span>
                    </p>
                  </div>
                </div>
                <a
                  href='tel:115'
                  className='shrink-0 inline-flex items-center justify-center px-6 py-2.5 bg-red-600 text-white font-AlbertSans font-bold text-sm rounded-full hover:bg-red-700 hover:shadow-lg transition-all animate-pulse'
                >
                  Gọi 115 Ngay
                </a>
              </div>
            ) : null}

            {clarificationQuestion && !isEmergency ? (
              <div className='mt-5 p-5 rounded-2xl bg-PrimaryColor-0/5 border border-PrimaryColor-0/20'>
                <div className='flex gap-3 mb-3'>
                  <div className='size-8 rounded-full bg-PrimaryColor-0 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm'>AI</div>
                  <div>
                    <p className='text-HeadingColor-0 font-AlbertSans font-semibold text-sm'>Trợ lý Y tế MedicaLink cần thêm thông tin:</p>
                    <p className='text-TextColor2-0 text-sm mt-1'>{clarificationQuestion}</p>
                  </div>
                </div>
                <div className='flex gap-2 mt-3 pl-11'>
                  <input
                    type='text'
                    className='flex-1 rounded-xl border border-BodyBg2-0 px-4 py-2 font-AlbertSans text-sm text-HeadingColor-0 focus:outline-none focus:ring-2 focus:ring-PrimaryColor-0/50 shadow-sm'
                    placeholder='Câu trả lời của bạn...'
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAnswerSubmit();
                    }}
                  />
                  <button
                    type='button'
                    className='px-5 py-2 rounded-xl bg-Secondarycolor-0 text-white font-AlbertSans text-sm font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 shadow-sm'
                    onClick={handleAnswerSubmit}
                    disabled={!userAnswer.trim() || suggestMutation.isPending}
                  >
                    Trả lời
                  </button>
                </div>
              </div>
            ) : null}

            {errorMsg ? (
              <p className='mt-4 text-sm text-red-600 font-AlbertSans' role='alert'>
                {errorMsg}
              </p>
            ) : null}

            <div className='mt-10'>
              <h2 className='font-AlbertSans font-semibold text-lg text-HeadingColor-0 mb-3'>
                Lọc theo chuyên khoa
              </h2>
              {specLoading ? (
                <Loading />
              ) : (
                <div className='flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1 scroll-smooth'>
                  {catalog.map((s) => {
                    const on = selectedIds.has(s.id);
                    return (
                      <button
                        key={s.id}
                        type='button'
                        onClick={() => toggleSpecialty(s.id)}
                        className={`px-3 py-1.5 rounded-full text-sm font-AlbertSans transition-all duration-200 border ${
                            on
                                ? 'bg-PrimaryColor-0 text-white border-PrimaryColor-0 shadow-sm scale-[1.02]'
                                : 'bg-white text-TextColor2-0 border-BodyBg2-0 hover:border-PrimaryColor-0 hover:-translate-y-0.5'
                        }`}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              )}
              <p className='text-xs text-TextColor2-0 mt-2 leading-relaxed'>
                Chọn chuyên khoa để thu hẹp kết quả. Bỏ trống để tìm trên toàn bộ danh sách bác sĩ.
              </p>
            </div>
          </div>

          <div id='ai-doctor-results' ref={resultsAnchorRef} className='scroll-mt-24' />

          {recommendations && recommendations.length > 0 ? (
            <div className='mt-12'>
              <div className='flex flex-wrap items-center gap-2 mb-6'>
                <span className='inline-flex items-center rounded-full bg-amber-50 text-amber-900 text-xs font-semibold px-3 py-1 border border-amber-200'>
                  Bác sĩ được AI đề xuất
                </span>
                {recommendMutation.isPending ? (
                  <span className='text-xs text-TextColor2-0'>Đang cập nhật danh sách...</span>
                ) : null}
              </div>
              <ul className='space-y-4'>
                {recommendations.map((r) => {
                  const docId = r.doctor_id ?? r.doctorId;
                  const displayName =
                    r.profile?.fullName ||
                    (docId ? `Bác sĩ #${String(docId).slice(0, 8)}…` : 'Bác sĩ');
                  const avatar = r.profile?.avatarUrl;
                  const position = r.profile?.position?.[0] || 'Bác sĩ';
                  return (
                    <li
                      key={docId}
                      className='bg-white rounded-2xl border border-BodyBg2-0 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md'
                    >
                      <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                        <div className='flex gap-4 min-w-0'>
                          {avatar ? (
                            <img
                              src={avatar}
                              alt=''
                              className='size-16 md:size-20 rounded-2xl object-cover border border-BodyBg2-0 shrink-0'
                            />
                          ) : (
                            <div className='size-16 md:size-20 rounded-2xl bg-PrimaryColor-0/10 shrink-0' />
                          )}
                          <div className='min-w-0'>
                            <p className='font-AlbertSans font-bold text-lg text-HeadingColor-0'>
                              {displayName}
                            </p>
                            {position ? (
                              <p className='text-xs text-TextColor2-0 mt-0.5'>{position}</p>
                            ) : null}
                            <p className='text-TextColor2-0 text-[15px] mt-2 leading-relaxed'>
                              {r.reason}
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-col sm:flex-row gap-2 shrink-0'>
                          <Link
                            to={`/appointment?doctorId=${encodeURIComponent(docId)}`}
                            className='inline-flex items-center justify-center px-4 py-2 rounded-full bg-PrimaryColor-0 text-white text-sm font-semibold hover:opacity-90 transition-opacity text-center'
                          >
                              Đặt Lịch Khám
                          </Link>
                          <Link
                            to={`/team_details/${docId}`}
                            state={{ fromAiFinder: true }}
                            className='inline-flex items-center justify-center px-4 py-2 rounded-full bg-Secondarycolor-0 text-white text-sm font-semibold hover:opacity-90 transition-opacity text-center'
                          >
                            Xem Hồ Sơ
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : recommendations && recommendations.length === 0 ? (
            <p className='mt-10 text-center text-TextColor2-0 font-AlbertSans'>
              Không tìm thấy bác sĩ phù hợp. Vui lòng thử mô tả khác hoặc bỏ lọc chuyên khoa.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default DoctorAiFinder;
