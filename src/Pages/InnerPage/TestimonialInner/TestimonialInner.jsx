import testiQuote from '/images/quote3.png';
import { FaArrowRightLong } from 'react-icons/fa6';
import TestimonialInnerCard from './TestimonialInnerCard';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import Subscribe from '../../../Component1/Subscribe/Subscribe';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Blog from './Blog/Blog';
import { useMemo } from 'react';
import { usePublicTestimonialsQuery } from '@/api/hooks/content/useLandingContentQueries';
import Loading from '@/Shared/Loading/Loading';
import StarRating from '@/Shared/StarRating/StarRating';

const TestimonialInner = () => {
  const { data: apiList, isLoading, isError, error } =
    usePublicTestimonialsQuery();

  const list = useMemo(
    () => (Array.isArray(apiList) ? apiList : []),
    [apiList]
  );

  const tabItems = useMemo(() => list.slice(0, 3), [list]);

  const settings = {
    loop: list.length > 1,
    spaceBetween: 30,
    speed: 1000,
    initialSlide: 0,
    autoplay: list.length > 1,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      992: { slidesPerView: 2 },
      1400: { slidesPerView: 2 },
    },
  };

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Testimonial'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Testimonial'}
      />
      <section
        className='py-28 bg-BodyBg-0 relative z-10 overflow-hidden'
        data-aos='fade-up'
        data-aos-duration='1000'
      >
        <div className='Container'>
          {isLoading && (
            <div className='flex justify-center py-20'>
              <Loading />
            </div>
          )}
          {isError && (
            <p className='text-center text-red-600 font-DMSans'>
              {error?.message ||
                'Failed to load testimonials. Please try again later.'}
            </p>
          )}
          {!isLoading && !isError && list.length === 0 && (
            <p className='text-center font-AlbertSans text-TextColor2-0 text-lg'>
              No testimonials yet.
            </p>
          )}
          {!isLoading && !isError && list.length > 0 && (
            <Tabs>
              <TabList className='flex flex-col md:flex-row md:items-center justify-center gap-6 mb-10'>
                {tabItems.map((t) => (
                  <Tab
                    key={t.id}
                    className='bg-white bg-opacity-30 border-2 border-white rounded-2xl cursor-pointer outline-none px-10 md:px-4 xl:px-10 py-8'
                  >
                    <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row gap-5 lg:gap-3 xl:gap-5'>
                      <div>
                        <img
                          src={t.authorAvatar || '/images/people2.png'}
                          alt=''
                          onError={(e) => {
                            e.target.src = '/images/people2.png';
                          }}
                        />
                      </div>
                      <div className='flex-1'>
                        <h5 className='font-AlbertSans font-semibold text-HeadingColor-0 text-2xl mt-2 mb-[6px]'>
                          {t.authorName}
                        </h5>
                        <p className='font-AlbertSans text-TextColor2-0'>
                          {t.authorTitle || 'Patient'}
                        </p>
                      </div>
                    </div>
                  </Tab>
                ))}
              </TabList>
              {tabItems.map((t) => (
                <TabPanel key={t.id}>
                  <div className='px-5 sm:px-10 lg:px-4 xl:px-[50px] pt-10 pb-10 bg-white bg-opacity-30 border-2 border-white rounded-3xl relative z-10 overflow-hidden'>
                    <div>
                      <img
                        src={testiQuote}
                        draggable='false'
                        alt=''
                      />
                    </div>
                    <StarRating
                      rating={t.rating ?? 5}
                      className='pt-9'
                    />
                    <p className='font-AlbertSans text-base sm:text-xl text-TextColor2-0 pt-6'>
                      {t.content}
                    </p>
                  </div>
                </TabPanel>
              ))}
            </Tabs>
          )}
        </div>
      </section>
      {!isLoading && !isError && list.length > 0 && (
        <section
          className='bg-BodyBg-0 relative z-10 overflow-hidden'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          <div className='Container'>
            <Swiper {...settings}>
              {list.map((t) => (
                <SwiperSlide key={t.id}>
                  <TestimonialInnerCard
                    testiImg={t.authorAvatar || '/images/people2.png'}
                    testiName={t.authorName}
                    testiDesignation={t.authorTitle || 'Patient'}
                    testiDesc={t.content}
                    testiQuote={testiQuote}
                    rating={t.rating ?? 5}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
      <Blog />
      <Subscribe />
    </>
  );
};

export default TestimonialInner;
