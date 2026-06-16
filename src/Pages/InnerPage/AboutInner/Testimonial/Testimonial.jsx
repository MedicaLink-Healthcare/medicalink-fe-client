import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import TestimonialCard from './TestimonialCard';
import testThumb from '/images/testi2.jpg';
import testiProfileFallback from '/images/testi-thumb3.jpg';
import testiQuote from '/images/quote2.png';
import { useMemo } from 'react';
import { usePublicTestimonialsQuery } from '@/api/hooks/content/useLandingContentQueries';
import Loading from '@/Shared/Loading/Loading';

const staticSlides = [
  {
    id: 's1',
    testiQuote,
    rating: 5,
    testiDesc: `Tôi rất hài lòng với chất lượng dịch vụ tại Bệnh viện Đa khoa Quốc tế Vinmec. Từ khâu đăng ký khám, quá trình xét nghiệm đến tư vấn điều trị đều diễn ra nhanh chóng, chuyên nghiệp và chu đáo. Đội ngũ y bác sĩ tận tâm, giàu kinh nghiệm cùng hệ thống trang thiết bị hiện đại giúp tôi hoàn toàn yên tâm khi chăm sóc sức khỏe tại đây.`,
    testiName: 'Bệnh viện Đa khoa Quốc tế Vinmec',
    testiDesignation: 'Hệ thống y tế',
    testiProfile: testiProfileFallback,
  },
  {
    id: 's2',
    testiQuote,
    rating: 5,
    testiDesc: `Tôi rất hài lòng với chất lượng dịch vụ tại Bệnh viện Đa khoa Quốc tế Vinmec. Từ khâu đăng ký khám, quá trình xét nghiệm đến tư vấn điều trị đều diễn ra nhanh chóng, chuyên nghiệp và chu đáo. Đội ngũ y bác sĩ tận tâm, giàu kinh nghiệm cùng hệ thống trang thiết bị hiện đại giúp tôi hoàn toàn yên tâm khi chăm sóc sức khỏe tại đây.`,
    testiName: 'Bệnh viện Đa khoa Quốc tế Vinmec',
    testiDesignation: 'Hệ thống y tế',
    testiProfile: testiProfileFallback,
  },
  {
    id: 's3',
    testiQuote,
    rating: 5,
    testiDesc: `Tôi rất hài lòng với chất lượng dịch vụ tại Bệnh viện Đa khoa Quốc tế Vinmec. Từ khâu đăng ký khám, quá trình xét nghiệm đến tư vấn điều trị đều diễn ra nhanh chóng, chuyên nghiệp và chu đáo. Đội ngũ y bác sĩ tận tâm, giàu kinh nghiệm cùng hệ thống trang thiết bị hiện đại giúp tôi hoàn toàn yên tâm khi chăm sóc sức khỏe tại đây.`,
    testiName: 'Bệnh viện Đa khoa Quốc tế Vinmec',
    testiDesignation: 'Hệ thống y tế',
    testiProfile: testiProfileFallback,
  },
];

const Testimonial = () => {
  const { data: apiList, isLoading, isError } = usePublicTestimonialsQuery();

  const slides = useMemo(() => {
    const raw = Array.isArray(apiList) ? apiList : [];
    if (raw.length > 0) {
      return raw.map((t) => ({
        id: t.id,
        testiQuote,
        rating: t.rating ?? 5,
        testiDesc: t.content,
        testiName: t.authorName,
        testiDesignation: t.authorTitle || 'Patient',
        testiProfile: t.authorAvatar || testiProfileFallback,
      }));
    }
    return staticSlides;
  }, [apiList]);

  const settings = {
    loop: slides.length > 1,
    spaceBetween: 30,
    initialSlide: 0,
    autoplay: slides.length > 1,
    speed: 1000,
    effect: 'ease',
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

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + ' pagination-bullet"></span>';
    },
  };

  return (
    <section className='bg-BodyBg-0 py-28 relative z-10 overflow-hidden'>
      <div className='px-2 xl:px-5 2xl:px-20'>
        <div className='Container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 lg:items-center'>
            <div
              data-aos='fade-up'
              data-aos-duration='1000'
            >
              <div>
                <h5 className='font-AlbertSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase mb-4'>
                  Đánh giá của bệnh nhân
                </h5>
                <h1 className='font-AlbertSans font-bold capitalize text-HeadingColor-0 text-xl leading-[30px] sm:text-3xl sm:leading-[40px] md:text-[40px] md:leading-[50px] lg:text-[42px] lg:leading-[52px] xl:text-[52px] xl:leading-[62px] 2xl:text-[60px] 2xl:leading-[70px]'>
                  Bệnh nhân hài lòng
                </h1>
                <p className='font-DMSans text-TextColor2-0 mt-4 mb-9'>
                  Cam kết mang đến trải nghiệm chăm sóc sức khỏe toàn diện, chuyên nghiệp với đội ngũ y bác sĩ tận tâm và công nghệ tiên tiến.
                </p>
              </div>
              <div>
                {isLoading && (
                  <div className='pb-[50px]'>
                    <Loading />
                  </div>
                )}
                {isError && !isLoading && (
                  <p className='text-TextColor2-0 font-DMSans pb-4'>
                    Không tải được đánh giá. Hiển thị nội dung dự phòng.
                  </p>
                )}
                {!isLoading && (
                  <Swiper
                    {...settings}
                    modules={[Pagination]}
                    pagination={pagination}
                  >
                    <div>
                      {slides.map(
                        ({
                          id,
                          testiQuote: quote,
                          rating,
                          testiName,
                          testiProfile,
                          testiDesignation,
                          testiDesc,
                        }) => (
                          <SwiperSlide
                            key={id}
                            className='pb-[50px]'
                          >
                            <TestimonialCard
                              testiQuote={quote}
                              rating={rating}
                              testiName={testiName}
                              testiDesignation={testiDesignation}
                              testiProfile={testiProfile}
                              testiDesc={testiDesc}
                            />
                          </SwiperSlide>
                        )
                      )}
                    </div>
                  </Swiper>
                )}
              </div>
            </div>
            <div
              className='ml-8 relative rounded-[30px] overflow-hidden pt-10 lg:pt-0'
              data-aos='fade-up'
              data-aos-duration='1000'
            >
              <div className='relative z-10'>
                <img
                  src={testThumb}
                  draggable='false'
                  className='w-full'
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
