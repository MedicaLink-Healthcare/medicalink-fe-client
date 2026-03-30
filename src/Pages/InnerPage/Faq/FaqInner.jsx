import { useMemo } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import FaqAccordion from './FaqAccordion';
import { usePublicFaqsQuery } from '@/api/hooks/content/useLandingContentQueries';
import Loading from '@/Shared/Loading/Loading';

const FaqInner = () => {
  const { data: faqs = [], isLoading, isError, error } = usePublicFaqsQuery();

  const { leftCol, rightCol } = useMemo(() => {
    const list = Array.isArray(faqs) ? faqs : [];
    if (list.length === 0) return { leftCol: [], rightCol: [] };
    const mid = Math.ceil(list.length / 2);
    return {
      leftCol: list.slice(0, mid),
      rightCol: list.slice(mid),
    };
  }, [faqs]);

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={"F.A.Q's"}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'F.a.q'}
      />
      <section className='bg-BodyBg-0 py-28'>
        <div className='Container'>
          {isLoading && (
            <div className='flex justify-center'>
              <Loading />
            </div>
          )}
          {isError && (
            <p className='font-AlbertSans text-red-600 text-center text-lg'>
              {error?.message ||
                'Failed to load list. Please try again later.'}
            </p>
          )}
          {!isLoading && !isError && faqs.length === 0 && (
            <p className='font-AlbertSans text-TextColor2-0 text-center text-lg'>
              No frequently asked questions yet.
            </p>
          )}
          {!isLoading && !isError && faqs.length > 0 && (
            <>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div
                  data-aos='fade-up'
                  data-aos-duration='1000'
                >
                  <div>
                    <h3 className='font-AlbertSans text-HeadingColor-0 font-bold text-[28px]'>
                      Frequently asked questions
                    </h3>
                    <p className='font-DMSans font-medium text-TextColor2-0 pt-5 pb-12'>
                      Common questions from patients and customers — updated from
                      the system.
                    </p>
                  </div>
                  {leftCol.map((faq, index) => (
                    <FaqAccordion
                      key={faq.id}
                      title={faq.question}
                      id={`faq-l-${faq.id}`}
                      active={index === 0}
                    >
                      {faq.answer}
                    </FaqAccordion>
                  ))}
                </div>
                <div
                  data-aos='fade-up'
                  data-aos-duration='1000'
                >
                  <div>
                    <h3 className='font-AlbertSans text-HeadingColor-0 font-bold text-[28px]'>
                      Additional information
                    </h3>
                    <p className='font-DMSans font-medium text-TextColor2-0 pt-5 pb-12'>
                      Additional questions and detailed guidance.
                    </p>
                  </div>
                  {rightCol.map((faq, index) => (
                    <FaqAccordion
                      key={faq.id}
                      title={faq.question}
                      id={`faq-r-${faq.id}`}
                      active={rightCol.length > 0 && index === 0 && leftCol.length === 0}
                    >
                      {faq.answer}
                    </FaqAccordion>
                  ))}
                </div>
              </div>
              <div
                className='pt-28'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <div className='rounded-3xl border-2 border-white bg-white bg-opacity-20 px-6 py-10 md:px-12 text-center'>
                  <h3 className='font-AlbertSans text-HeadingColor-0 font-bold text-[28px]'>
                    Need to ask more?
                  </h3>
                  <p className='font-DMSans font-medium text-TextColor2-0 pt-5 max-w-2xl mx-auto'>
                    Send question to community — doctors and experts can answer
                    when appropriate.
                  </p>
                  <Link
                    to='/community-qa'
                    className='inline-flex mt-8 primary-btn'
                  >
                    Go to Community Q&A
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default FaqInner;
