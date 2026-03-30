import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { EffectFlip } from 'swiper/modules';
import TestimonialCard from './TestimonialCard';
import testThumb from '/images/testi.jpg';
import testiProfileFallback from '/images/people.png';
import testiShape from '/images/circle2.png';
import testiQuote from '/images/quote.png';
import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';
import { useMemo } from 'react';
import { usePublicTestimonialsQuery } from '@/api/hooks/content/useLandingContentQueries';
import Loading from '@/Shared/Loading/Loading';

const Testimonial = () => {
  const { data: apiList, isLoading, isError } = usePublicTestimonialsQuery();

  const slides = useMemo(() => {
    const raw = Array.isArray(apiList) ? apiList : [];
    if (raw.length > 0) {
      return raw.map((t) => ({
        id: t.id,
        testiQuote,
        testiDesc: t.content,
        testiName: t.authorName,
        testiDesignation: t.authorTitle || 'Patient',
        testiProfile: t.authorAvatar || testiProfileFallback,
        rating: t.rating ?? 5,
      }));
    }
    return [
      {
        id: 'fallback-1',
        testiQuote,
        testiDesc: `Quickly fashion backend strategic theme areas with
                virtual growth strategies. Authoritatively
                formulate competitive experiences rather than
                granular manufactured products granular intelle
                capital without equity invested`,
        testiName: 'Jisan Khan',
        testiDesignation: 'Satisfied Patient',
        testiProfile: testiProfileFallback,
        rating: 5,
      },
    ];
  }, [apiList]);

  const settings = {
    loop: slides.length > 1,
    spaceBetween: 30,
    initialSlide: 0,
    autoplay: slides.length > 1,
    effect: 'flip',
    grabCursor: true,
    flipEffect: {
      slideShadows: false,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      992: { slidesPerView: 1 },
      1400: { slidesPerView: 1 },
    },
  };

  return (
    <section className='bg-Secondarycolor-0 py-28 relative z-10 overflow-hidden'>
      <div className='absolute top-0 right-0 -z-10'>
        <img
          src={testiShape}
          draggable='false'
          alt=''
        />
      </div>
      <div
        className='text-center pb-11'
        data-aos='fade-up'
        data-aos-duration='1000'
      >
        <h1 className='font-AlbertSans font-bold uppercase text-white text-xl leading-[30px] sm:text-3xl sm:leading-[40px] md:text-[40px] md:leading-[50px] lg:text-[50px] lg:leading-[60px] xl:text-[52px] xl:leading-[62px] 2xl:text-[60px] 2xl:leading-[70px]'>
          Testimonials
        </h1>
      </div>
      <div className='px-2 xl:px-5 2xl:px-20'>
        <div className='grid gap-[30px] grid-cols-6 lg:grid-cols-12 lg:items-center'>
          <div
            className='col-span-6 lg:col-span-8 relative rounded-[30px] overflow-hidden'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <div className='relative z-10'>
              <img
                src={testThumb}
                draggable='false'
                className='lg:max-w-[inherit] lg:w-[inherit] 2xl:max-w-full'
                alt=''
              />
              <div className='hidden sm:block absolute top-7 left-7 px-8 pb-10 pt-7 border-2 border-white bg-white bg-opacity-15 backdrop-filter backdrop-blur-md rounded-2xl'>
                <h4 className='font-AlbertSans font-semibold text-2xl text-HeadingColor-0 pb-5'>
                  Get Free Consultation
                </h4>
                <div className='inline-block'>
                  <Link to={'/appointment'}>
                    <button className='primary-btn'>
                      Appointment
                      <GoArrowRight
                        size={'22'}
                        className='-rotate-45'
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className='col-span-6 lg:col-span-4'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            {isLoading && (
              <div className='py-20'>
                <Loading />
              </div>
            )}
            {!isLoading && isError && (
              <p className='text-white font-DMSans text-center px-2'>
                Failed to load testimonials. Displaying fallback content.
              </p>
            )}
            {!isLoading && (
              <Swiper
                {...settings}
                modules={[EffectFlip]}
              >
                <div>
                  {slides.map(
                    ({
                      id,
                      testiQuote: quote,
                      testiName,
                      testiProfile,
                      testiDesignation,
                      testiDesc,
                      rating,
                    }) => (
                      <SwiperSlide key={id}>
                        <TestimonialCard
                          testiQuote={quote}
                          testiName={testiName}
                          testiDesignation={testiDesignation}
                          testiProfile={testiProfile}
                          testiDesc={testiDesc}
                          rating={rating}
                        />
                      </SwiperSlide>
                    )
                  )}
                </div>
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
