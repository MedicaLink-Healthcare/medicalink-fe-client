import { useEffect, useMemo, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import moment from 'moment';
import BreadCrumb from '@/Shared/BreadCrumb/BreadCrumb';
import Loading from '@/Shared/Loading/Loading';
import Pagination from '@/Shared/Pagination/Pagination';
import usePagination from '@/hooks/usePagination';
import {
  useQuestionsQuery,
  useCreateQuestionMutation,
} from '@/api/hooks/qa/useQAQueries';
import { useSpecialtiesQuery } from '@/api/hooks/specialty/useSpecialtyQueries';

const statusLabel = {
  PENDING: 'Đang chờ',
  ANSWERED: 'Trả lời',
  CLOSED: 'Đã đóng',
};

const extractQuestions = (payload) => {
  if (!payload) return [];
  return Array.isArray(payload.data) ? payload.data : [];
};

const extractMeta = (payload) => {
  if (!payload?.meta) return {};
  return payload.meta;
};

const extractSpecialties = (response) => {
  if (!response) return [];
  return response?.data?.data || response?.data || [];
};

const CommunityQAInner = () => {
  const itemsPerPage = 8;
  const [totalItems, setTotalItems] = useState(0);

  const pagination = usePagination({
    totalItems,
    limit: itemsPerPage,
  });

  const {
    currentPage,
    totalPage,
    pagesInCurrentGroup,
    handlePageChangeButtonClick,
    handleNextButtonClick,
    handlePreviousButtonClick,
    handleNextPageGroupButtonClick,
    handlePreviousPageGroupButtonClick,
  } = pagination;

  const { data: listPayload, isLoading, isError, error } = useQuestionsQuery({
    page: currentPage,
    limit: itemsPerPage,
    sortOrder: 'desc',
  });

  const questions = useMemo(() => extractQuestions(listPayload), [listPayload]);
  const meta = useMemo(() => extractMeta(listPayload), [listPayload]);

  useEffect(() => {
    const total = meta?.total ?? 0;
    setTotalItems(total);
  }, [meta?.total]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const { data: specialtiesResponse } = useSpecialtiesQuery({
    page: 1,
    limit: 100,
  });
  const specialties = useMemo(
    () => extractSpecialties(specialtiesResponse),
    [specialtiesResponse]
  );

  const createMutation = useCreateQuestionMutation();
  const [form, setForm] = useState({
    title: '',
    body: '',
    authorName: '',
    authorEmail: '',
    specialtyId: '',
  });
  const [formMessage, setFormMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormMessage(null);
    const payload = {
      title: form.title.trim(),
      body: form.body.trim(),
      authorName: form.authorName.trim() || undefined,
      authorEmail: form.authorEmail.trim() || undefined,
      specialtyId: form.specialtyId || undefined,
    };
    createMutation.mutate(payload, {
      onSuccess: () => {
        setFormMessage({ type: 'ok', text: 'Cảm ơn! Câu hỏi của bạn đã được gửi.' });
        setForm({ title: '', body: '', authorName: '', authorEmail: '', specialtyId: '' });
      },
      onError: (err) => {
        setFormMessage({
          type: 'err',
          text: err?.message || 'Không gửi được câu hỏi. Vui lòng thử lại.',
        });
      },
    });
  };

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Hỏi đáp cộng đồng'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Hỏi đáp cộng đồng'}
      />
      <section className='bg-BodyBg-0 pt-10 pb-28'>
        <div className='Container'>
          <div
            className='max-w-3xl mx-auto mb-16 rounded-3xl border-2 border-white bg-white bg-opacity-25 p-6 md:p-10'
            data-aos='fade-up'
            data-aos-duration='800'
          >
            <h3 className='font-AlbertSans font-bold text-HeadingColor-0 text-2xl mb-2'>
              Đặt câu hỏi
            </h3>
            <p className='font-DMSans text-TextColor2-0 mb-6 text-sm md:text-base'>
              Điền thông tin bên dưới (email tùy chọn). Hệ thống có giới hạn số lần gửi trong phút - vui lòng không spam.
            </p>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
              <div>
                <label className='font-AlbertSans text-sm text-HeadingColor-0 block mb-1'>
                  Tiêu đề <span className='text-red-500'>*</span>
                </label>
                <input
                  required
                  maxLength={200}
                  className='w-full rounded-xl border-2 border-white bg-white bg-opacity-80 px-4 py-3 font-DMSans'
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder='Ví dụ: Triệu chứng đau đầu kéo dài...'
                />
              </div>
              <div>
                <label className='font-AlbertSans text-sm text-HeadingColor-0 block mb-1'>
                  Nội dung <span className='text-red-500'>*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  className='w-full rounded-xl border-2 border-white bg-white bg-opacity-80 px-4 py-3 font-DMSans'
                  value={form.body}
                  onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                  placeholder='Mô tả chi tiết...'
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='font-AlbertSans text-sm text-HeadingColor-0 block mb-1'>
                    Tên hiển thị
                  </label>
                  <input
                    maxLength={120}
                    className='w-full rounded-xl border-2 border-white bg-white bg-opacity-80 px-4 py-3 font-DMSans'
                    value={form.authorName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, authorName: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className='font-AlbertSans text-sm text-HeadingColor-0 block mb-1'>
                    E-mail
                  </label>
                  <input
                    type='email'
                    className='w-full rounded-xl border-2 border-white bg-white bg-opacity-80 px-4 py-3 font-DMSans'
                    value={form.authorEmail}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, authorEmail: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div>
                <label className='font-AlbertSans text-sm text-HeadingColor-0 block mb-1'>
                  Chuyên khoa (tùy chọn)
                </label>
                <select
                  className='w-full rounded-xl border-2 border-white bg-white bg-opacity-80 px-4 py-3 font-DMSans'
                  value={form.specialtyId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, specialtyId: e.target.value }))
                  }
                >
                  <option value=''>— Select —</option>
                  {specialties.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              {formMessage && (
                <p
                  className={`font-DMSans text-sm ${
                    formMessage.type === 'ok' ? 'text-green-700' : 'text-red-600'
                  }`}
                >
                  {formMessage.text}
                </p>
              )}
              <button
                type='submit'
                disabled={createMutation.isPending}
                className='primary-btn w-fit disabled:opacity-50'
              >
                {createMutation.isPending ? 'Đang gửi...' : 'Gửi câu hỏi'}
              </button>
            </form>
          </div>

          <div className='text-center mb-10'>
            <h2 className='font-AlbertSans font-bold text-HeadingColor-0 text-2xl md:text-3xl'>
              Câu hỏi gần đây
            </h2>
            {isError && (
              <p className='text-red-600 mt-4 font-DMSans'>
                {error?.message || 'Không tải được danh sách.'}
              </p>
            )}
          </div>

          {isLoading ? (
            <Loading />
          ) : questions.length === 0 ? (
            <p className='font-AlbertSans text-TextColor2-0 text-center text-lg'>
              Hiện chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi ở trên.
            </p>
          ) : (
            <>
              <div className='grid grid-cols-1 gap-5'>
                {questions.map((q) => (
                  <article
                    key={q.id}
                    className='rounded-2xl border-2 border-white bg-white bg-opacity-20 p-6 hover:bg-opacity-30 transition'
                    data-aos='fade-up'
                    data-aos-duration='600'
                  >
                    <div className='flex flex-wrap items-center gap-2 mb-2'>
                      <span className='text-xs font-AlbertSans uppercase px-2 py-1 rounded-md bg-PrimaryColor-0 text-white'>
                        {statusLabel[q.status] || q.status}
                      </span>
                      {q.specialty?.name && (
                        <span className='text-xs font-DMSans text-TextColor2-0'>
                          {q.specialty.name}
                        </span>
                      )}
                      <span className='text-xs font-DMSans text-TextColor2-0 ml-auto'>
                        {q.createdAt
                          ? moment(q.createdAt).format('DD/MM/YYYY')
                          : ''}
                      </span>
                    </div>
                    <Link
                      to={`/community-qa/${q.id}`}
                      className='font-AlbertSans font-semibold text-HeadingColor-0 text-lg md:text-xl hover:text-PrimaryColor-0 block'
                    >
                      {q.title}
                    </Link>
                    <p className='font-DMSans text-TextColor2-0 mt-2 line-clamp-2'>
                      {q.body}
                    </p>
                    <div className='mt-3 flex flex-wrap gap-4 text-sm font-DMSans text-TextColor2-0'>
                      <span>
                        Số lượt xem: {q.viewCount ?? 0}
                      </span>
                      <span>
                        Số câu trả lời: {q.answersCount ?? 0}
                      </span>
                      {q.acceptedAnswersCount > 0 && (
                        <span className='text-green-700'>
                          {q.acceptedAnswersCount} câu trả lời được chấp nhận
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                pagesInCurrentGroup={pagesInCurrentGroup}
                handlePageChangeButtonClick={handlePageChangeButtonClick}
                handleNextButtonClick={handleNextButtonClick}
                handlePreviousButtonClick={handlePreviousButtonClick}
                handleNextPageGroupButtonClick={handleNextPageGroupButtonClick}
                handlePreviousPageGroupButtonClick={
                  handlePreviousPageGroupButtonClick
                }
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CommunityQAInner;
