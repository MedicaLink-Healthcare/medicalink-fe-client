import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowRightLong, FaStethoscope } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import BreadCrumb from '@/Shared/BreadCrumb/BreadCrumb';
import Loading from '@/Shared/Loading/Loading';
import { useSpecialtiesQuery } from '@/api/hooks/specialty/useSpecialtyQueries';
import {
  useAIRecommendDoctorMutation,
  useAISuggestSpecialtiesMutation,
} from '@/api/hooks/ai/useAIQueries';

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

const DoctorAiFinder = () => {
  const persisted = useMemo(() => readPersisted(), []);

  const [symptoms, setSymptoms] = useState(() => persisted.symptoms ?? '');
  const [selectedIds, setSelectedIds] = useState(() => {
    const ids = persisted.selectedIds;
    return new Set(Array.isArray(ids) ? ids.map(String) : []);
  });
  const [aiNote, setAiNote] = useState(() => persisted.aiNote ?? '');
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
      selectedIds: Array.from(selectedIds),
      aiNote,
      recommendations,
    });
  }, [symptoms, selectedIds, aiNote, recommendations]);

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
    setSelectedIds(new Set());
    setAiNote('');
    setRecommendations(null);
    setErrorMsg('');
  };

  const applyAiSuggestion = () => {
    setErrorMsg('');
    setAiNote('');
    if (symptoms.trim().length < 8) {
      setErrorMsg('Please enter at least 8 characters describing your symptoms or needs.');
      return;
    }
    if (!catalog.length) {
      setErrorMsg('Specialty list is still loading. Try again in a moment.');
      return;
    }
    suggestMutation.mutate(
      { symptoms: symptoms.trim(), specialties: catalog },
      {
        onSuccess: (res) => {
          const payload = unwrapAiPayload(res);
          const ids = payload?.specialty_ids ?? payload?.specialtyIds ?? [];
          setAiNote(payload?.note ?? '');
          if (Array.isArray(ids) && ids.length) {
            setSelectedIds(new Set(ids.map(String)));
          } else {
            setSelectedIds(new Set());
          }
        },
        onError: (e) => {
          setErrorMsg(e?.message || 'Could not analyze specialties. Please try again.');
        },
      },
    );
  };

  const findDoctors = () => {
    setErrorMsg('');
    if (symptoms.trim().length < 8) {
      setErrorMsg('Please enter at least 8 characters describing your symptoms or needs.');
      return;
    }
    const specialtyIds = Array.from(selectedIds);
    const body = {
      symptoms: symptoms.trim(),
      topK: 5,
      ...(specialtyIds.length ? { specialtyIds } : {}),
    };
    recommendMutation.mutate(body, {
      onSuccess: (res) => {
        const payload = unwrapAiPayload(res);
        const recs = payload?.recommendations ?? [];
        setRecommendations(Array.isArray(recs) ? recs : []);
        scrollToResults();
      },
      onError: (e) => {
        setErrorMsg(e?.message || 'Could not get recommendations. Please try again.');
      },
    });
  };

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'AI Doctor Finder'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'AI Doctor Finder'}
      />
      <section className='bg-BodyBg-0 py-24 md:py-28 transition-opacity duration-300'>
        <div className='Container max-w-5xl'>
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8'>
            <div className='flex items-center gap-3'>
              <FaStethoscope className='text-PrimaryColor-0 text-3xl shrink-0' aria-hidden />
              <div>
                <h1 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0'>
                  Find a doctor with AI
                </h1>
                <p className='text-TextColor2-0 text-[15px] mt-1 max-w-2xl leading-relaxed'>
                  Describe how you feel. AI suggests relevant specialties—you confirm or adjust the
                  tags, then we search our directory. Suggestions are informational only and do not
                  replace medical advice.
                </p>
              </div>
            </div>
            <button
              type='button'
              onClick={clearSavedSession}
              className='self-start text-sm font-AlbertSans text-TextColor2-0 underline underline-offset-2 hover:text-HeadingColor-0'
            >
              Reset form & saved results
            </button>
          </div>

          <div className='bg-white rounded-3xl border border-BodyBg2-0 shadow-sm p-6 md:p-10 transition-shadow duration-300 hover:shadow-md'>
            <label
              htmlFor='doctor-ai-symptoms'
              className='block font-AlbertSans font-semibold text-HeadingColor-0 mb-2'
            >
              Symptoms or reason for visit
            </label>
            <textarea
              id='doctor-ai-symptoms'
              className='w-full min-h-[140px] rounded-2xl border border-BodyBg2-0 px-4 py-3 font-AlbertSans text-TextColor2-0 focus:outline-none focus:ring-2 focus:ring-PrimaryColor-0 transition-shadow duration-200'
              placeholder='e.g. I have upper abdominal pain and nausea for several days…'
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              autoComplete='off'
            />

            <div className='flex flex-wrap gap-3 mt-5'>
              <button
                type='button'
                className='px-5 py-2.5 rounded-full bg-Secondarycolor-0 text-white font-AlbertSans text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity duration-200'
                disabled={suggestMutation.isPending || specLoading}
                onClick={applyAiSuggestion}
              >
                {suggestMutation.isPending ? 'Analyzing…' : 'Suggest specialties (AI)'}
              </button>
              <button
                type='button'
                className='px-5 py-2.5 rounded-full bg-PrimaryColor-0 text-white font-AlbertSans text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity duration-200 inline-flex items-center gap-2'
                disabled={recommendMutation.isPending}
                onClick={findDoctors}
              >
                {recommendMutation.isPending ? (
                  <>
                    <span className='inline-block size-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    Searching…
                  </>
                ) : (
                  'Find doctors'
                )}
              </button>
            </div>

            {aiNote ? (
              <p
                className='mt-4 text-sm text-HeadingColor-0 bg-BodyBg-0 rounded-xl px-4 py-3 border border-BodyBg2-0'
                role='status'
              >
                <span className='font-semibold'>AI note: </span>
                {aiNote}
              </p>
            ) : null}

            {errorMsg ? (
              <p className='mt-4 text-sm text-red-600 font-AlbertSans' role='alert'>
                {errorMsg}
              </p>
            ) : null}

            <div className='mt-10'>
              <h2 className='font-AlbertSans font-bold text-xl text-HeadingColor-0 mb-3'>
                Specialties (tap to toggle — used as filters when you click Find doctors)
              </h2>
              {specLoading ? (
                <Loading />
              ) : (
                <div className='flex flex-wrap gap-2 max-h-64 overflow-y-auto p-1 scroll-smooth'>
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
                Leave none selected to search across all active doctors (no hard specialty filter).
                Select one or more to narrow results to those specialties—ideal after you confirm AI
                suggestions.
              </p>
            </div>
          </div>

          <div id='ai-doctor-results' ref={resultsAnchorRef} className='scroll-mt-24' />

          {recommendations && recommendations.length > 0 ? (
            <div className='mt-12'>
              <div className='flex flex-wrap items-center gap-2 mb-6'>
                <span className='inline-flex items-center rounded-full bg-amber-50 text-amber-900 text-xs font-semibold px-3 py-1 border border-amber-200'>
                  AI suggestion based on your description
                </span>
                {recommendMutation.isPending ? (
                  <span className='text-xs text-TextColor2-0'>Updating list…</span>
                ) : null}
              </div>
              <ul className='space-y-4'>
                {recommendations.map((r) => (
                  <li
                    key={r.doctor_id}
                    className='bg-white rounded-2xl border border-BodyBg2-0 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md'
                  >
                    <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                      <div>
                        <p className='font-AlbertSans font-bold text-lg text-HeadingColor-0'>
                          Doctor #{r.doctor_id.slice(0, 8)}…
                        </p>
                        <p className='text-TextColor2-0 text-[15px] mt-2 leading-relaxed'>
                          {r.reason}
                        </p>
                      </div>
                      <Link
                        to={`/team_details/${r.doctor_id}`}
                        state={{ fromAiFinder: true }}
                        className='shrink-0 inline-flex items-center justify-center px-4 py-2 rounded-full bg-Secondarycolor-0 text-white text-sm font-semibold hover:opacity-90 transition-opacity'
                      >
                        View profile
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : recommendations && recommendations.length === 0 ? (
            <p className='mt-10 text-center text-TextColor2-0 font-AlbertSans'>
              No matching doctors in the directory. Try a different description or clear specialty
              filters.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default DoctorAiFinder;
