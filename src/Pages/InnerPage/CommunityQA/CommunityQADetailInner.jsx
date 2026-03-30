import { useParams, Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import moment from 'moment';
import BreadCrumb from '@/Shared/BreadCrumb/BreadCrumb';
import Loading from '@/Shared/Loading/Loading';
import {
  useQuestionDetailQuery,
  useAcceptedAnswersQuery,
} from '@/api/hooks/qa/useQAQueries';

const statusLabel = {
  PENDING: 'Pending',
  ANSWERED: 'Answered',
  CLOSED: 'Closed',
};

const extractCompositeData = (payload) => payload?.data ?? null;

const extractAnswersList = (payload) => {
  if (!payload) return [];
  return Array.isArray(payload.data) ? payload.data : [];
};

const CommunityQADetailInner = () => {
  const { id } = useParams();

  const {
    data: questionPayload,
    isLoading: loadingQ,
    isError: errQ,
    error: errDetail,
  } = useQuestionDetailQuery(id, { increaseView: true });

  const {
    data: answersPayload,
    isLoading: loadingA,
    isError: errA,
  } = useAcceptedAnswersQuery(id);

  const question = extractCompositeData(questionPayload);
  const answers = extractAnswersList(answersPayload);

  const loading = loadingQ || loadingA;
  const hasError = errQ || errA;

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Question Detail'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Question Detail'}
      />
      <section className='bg-BodyBg-0 py-28 min-h-[50vh]'>
        <div className='Container max-w-4xl'>
          <Link
            to='/community-qa'
            className='inline-flex items-center gap-2 font-DMSans text-PrimaryColor-0 mb-8 hover:underline'
          >
            ← Back to list
          </Link>

          {loading && <Loading />}

          {!loading && hasError && (
            <p className='text-red-600 font-DMSans'>
              {errDetail?.message ||
                'Failed to load content. The question may have been deleted.'}
            </p>
          )}

          {!loading && !hasError && question && (
            <>
              <article
                className='rounded-3xl border-2 border-white bg-white bg-opacity-25 p-6 md:p-10 mb-10'
                data-aos='fade-up'
              >
                <div className='flex flex-wrap gap-2 items-center mb-4'>
                  <span className='text-xs font-AlbertSans uppercase px-2 py-1 rounded-md bg-PrimaryColor-0 text-white'>
                    {statusLabel[question.status] || question.status}
                  </span>
                  {question.specialty?.name && (
                    <span className='font-DMSans text-TextColor2-0'>
                      {question.specialty.name}
                    </span>
                  )}
                  <span className='font-DMSans text-TextColor2-0 text-sm ml-auto'>
                    {question.createdAt
                      ? moment(question.createdAt).format('DD/MM/YYYY HH:mm')
                      : ''}
                  </span>
                </div>
                <h1 className='font-AlbertSans font-bold text-HeadingColor-0 text-2xl md:text-4xl mb-6'>
                  {question.title}
                </h1>
                <p className='font-DMSans text-TextColor2-0 whitespace-pre-wrap leading-relaxed'>
                  {question.body}
                </p>
                <div className='mt-6 flex flex-wrap gap-6 text-sm font-DMSans text-TextColor2-0 border-t border-white border-opacity-40 pt-6'>
                  <span>Views: {question.viewCount ?? 0}</span>
                  <span>Total answers: {question.answersCount ?? 0}</span>
                  {question.authorName && (
                    <span>Questioner: {question.authorName}</span>
                  )}
                </div>
              </article>

              <div data-aos='fade-up' data-aos-delay='100'>
                <h2 className='font-AlbertSans font-bold text-HeadingColor-0 text-2xl mb-6'>
                  Accepted answers
                </h2>
                {answers.length === 0 ? (
                  <p className='font-DMSans text-TextColor2-0'>
                    No accepted answers yet. Please try again later.
                  </p>
                ) : (
                  <ul className='space-y-5'>
                    {answers.map((a) => (
                      <li
                        key={a.id}
                        className='rounded-2xl border-2 border-white bg-white bg-opacity-15 p-6'
                      >
                        <p className='font-DMSans text-HeadingColor-0 whitespace-pre-wrap'>
                          {a.body}
                        </p>
                        <div className='mt-4 flex flex-wrap justify-between gap-2 text-sm font-DMSans text-TextColor2-0'>
                          <span>
                            {a.authorFullName
                              ? `Doctor / Expert: ${a.authorFullName}`
                              : 'Expert'}
                          </span>
                          <span>
                            {a.createdAt
                              ? moment(a.createdAt).format('DD/MM/YYYY')
                              : ''}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CommunityQADetailInner;
