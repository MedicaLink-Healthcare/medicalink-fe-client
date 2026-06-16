import featureImg from '/images/srvc-tm.png';
import featureImg2 from '/images/call.png';
import featureImg3 from '/images/location.png';
import { Link } from 'react-router-dom';
import { MdArrowOutward } from 'react-icons/md';
import circleShape from '/images/crcle-bg.png';

const Feature = () => {
  return (
    <section className='pt-[120px] bg-BodyBg-0 bg-cover bg-no-repeat bg-left lg:bg-bottom relative z-10 overflow-hidden'>
      <div className='absolute -z-10 top-16 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <img
          src={circleShape}
          draggable='false'
          className='max-w-[inherit] w-[inherit]'
        />
      </div>
      <div className='Container relative'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
          <div
            className='group px-4 sm:px-10 lg:px-5 xl:px-8 2xl:px-10 pt-10 pb-11 bg-white bg-opacity-30 text-center rounded-3xl border-2 border-white relative z-10 overflow-hidden transition-all duration-500 hover:border-PrimaryColor-0'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <span className='absolute bg-PrimaryColor-0 left-[12.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-0'></span>
            <span className='absolute bg-PrimaryColor-0 left-[37.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-[25%]'></span>
            <span className='absolute bg-PrimaryColor-0 left-[62.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-1/2'></span>
            <span className='absolute bg-PrimaryColor-0 left-[87.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-[75%]'></span>
            <div className='flex justify-between items-center border-b-2 border-white pb-[30px] mb-10'>
              <h5 className='font-AlbertSans font-semibold text-[22px] 2xl:text-[25px] text-HeadingColor-0 transition-all duration-500 group-hover:text-white'>
                Đội Ngũ Chuyên Gia
              </h5>
              <Link to={'/'}>
                <button className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white'>
                  <MdArrowOutward size={'26'} />
                </button>
              </Link>
            </div>
            <div>
              <img
                src={featureImg}
                draggable='false'
                className='m-auto'
              />
            </div>
            <h4 className='font-AlbertSans font-semibold text-[30px] text-HeadingColor-0 mt-7 flex items-center gap-2 justify-center transition-all duration-500 group-hover:text-white'>
              100+{' '}
              <span className='font-AlbertSans font-semibold text-lg text-PrimaryColor-0 transition-all duration-500 group-hover:text-white'>
                Bác Sĩ
              </span>
            </h4>
            <p className='font-DMSans text-TextColor-0 transition-all duration-500 group-hover:text-white mt-2'>
              Cam kết mang lại sức khỏe và hạnh phúc dài lâu
            </p>
          </div>
          <div
            className='group px-4 sm:px-10 lg:px-5 xl:px-8 2xl:px-10 pt-10 pb-11 bg-white bg-opacity-30 text-center rounded-3xl border-2 border-white relative z-10 overflow-hidden transition-all duration-500 hover:border-PrimaryColor-0'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <span className='absolute bg-PrimaryColor-0 left-[12.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-0'></span>
            <span className='absolute bg-PrimaryColor-0 left-[37.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-[25%]'></span>
            <span className='absolute bg-PrimaryColor-0 left-[62.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-1/2'></span>
            <span className='absolute bg-PrimaryColor-0 left-[87.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-[75%]'></span>
            <div className='flex justify-between items-center border-b-2 border-white pb-[27px] mb-10'>
              <h5 className='font-AlbertSans font-semibold text-[22px] 2xl:text-[25px] text-HeadingColor-0 transition-all duration-500 group-hover:text-white'>
                Lịch Khám
              </h5>
              <Link to={'/'}>
                <button className='text-white text-sm transition-all duration-500 px-5 xl:px-[30px] py-2 rounded-3xl bg-PrimaryColor-0 font-AlbertSans uppercase group-hover:text-PrimaryColor-0 group-hover:bg-white'>
                  Đặt Lịch
                </button>
              </Link>
            </div>
            <div>
              <img
                src={featureImg2}
                draggable='false'
                className='mx-auto mb-9'
              />
            </div>
            <Link to={'/'}>
              <button className='font-AlbertSans font-semibold text-[22px] text-HeadingColor-0 mx-auto gap-2 transition-all duration-500 group-hover:text-white'>
                +123 (4567) 890
              </button>
            </Link>
            <p className='font-DMSans text-TextColor-0 transition-all duration-500 group-hover:text-white mt-[14px]'>
              Cam kết mang lại sức khỏe và hạnh phúc dài lâu
            </p>
          </div>
          <div
            className='group px-4 sm:px-10 lg:px-5 xl:px-8 2xl:px-10 pt-10 pb-11 bg-white bg-opacity-30 text-center rounded-3xl border-2 border-white relative z-10 overflow-hidden transition-all duration-500 hover:border-PrimaryColor-0'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <span className='absolute bg-PrimaryColor-0 left-[12.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-0'></span>
            <span className='absolute bg-PrimaryColor-0 left-[37.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-[25%]'></span>
            <span className='absolute bg-PrimaryColor-0 left-[62.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-1/2'></span>
            <span className='absolute bg-PrimaryColor-0 left-[87.5%] top-0 h-full w-0 transition-all duration-500 -z-10 group-hover:w-[25%] group-hover:left-[75%]'></span>
            <div className='flex justify-between items-center border-b-2 border-white pb-[30px] mb-10'>
              <h5 className='font-AlbertSans font-semibold text-[22px] 2xl:text-[25px] text-HeadingColor-0 transition-all duration-500 group-hover:text-white'>
                Địa Điểm
              </h5>
              <Link to={'/'}>
                <button className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white'>
                  <MdArrowOutward size={'26'} />
                </button>
              </Link>
            </div>
            <div>
              <img
                src={featureImg3}
                draggable='false'
                className='mx-auto mb-6 transition-all duration-500 group-hover:brightness-0 group-hover:invert-[1]'
              />
            </div>
            <p className='font-DMSans text-TextColor-0 transition-all duration-500 group-hover:text-white mt-2 mb-5'>
              Cam kết mang lại sức khỏe và hạnh phúc dài lâu
            </p>
            <Link to={'/'}>
              <button className='text-white text-sm transition-all duration-500 px-[30px] py-2 rounded-3xl bg-PrimaryColor-0 font-AlbertSans uppercase group-hover:text-PrimaryColor-0 group-hover:bg-white'>
                Đặt Lịch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
