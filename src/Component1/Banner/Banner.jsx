import bannerThumb from '/images/hero-img.png';
import bannerHeart from '/images/banner-heart.png';
import bannerCheck from '/images/tick.png';
import bannerPlus from '/images/plus.png';
import bannerShape from '/images/banner-arrow.png';
import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';
import {
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaSquareFacebook,
} from 'react-icons/fa6';

const Banner = () => {
  return (
    <div className='bg-BodyBg-0 px-2 lg:px-[30px]'>
      <section className="bg-[url('/images/hero-bg.png')] bg-cover bg-center bg-no-repeat h-[600px] sm:h-[700px] md:h-[700px] lg:h-[700px] xl:h-[790px] 2xl:h-[790px] flex items-center relative z-10 overflow-hidden rounded-t-2xl md:rounded-t-[30px]">
        <div className='absolute top-1/2 -translate-y-1/2 -left-14 xl:-left-10 hidden md:block'>
          <Link to={'/'}>
            <button className='font-AlbertSans font-medium inline-block text-lg text-white rotate-90 relative before:absolute before:-left-[72px] before:-bottom-[35px] before:rotate-90 before:w-[2px] before:h-[100px] before:bg-[linear-gradient(_180deg,_rgba(255,_255,_255,_0.9999999999999999)_0%,_rgba(27,_31,_73,_0)_100%_)]'>
              1900 1234
            </button>
          </Link>
        </div>
        <div className='flex justify-center items-center m-auto'>
          <div className='Container'>
            <div className='relative z-10'>
              <div className='absolute top-0 -left-10  -z-10'>
                <img
                  src={bannerPlus}
                  draggable='false'
                  className='animate-rotational'
                />
              </div>
              <div className='flex items-center justify-center gap-3 sm:gap-6'>
                <h1 className='font-AlbertSans font-extrabold text-4xl sm:text-5xl md:text-[80px] xl:text-[120px] text-white uppercase tracking-wide drop-shadow-sm'>
                  Chăm sóc
                </h1>
                <img
                  src={bannerHeart}
                  draggable='false'
                  className='animate-rotateX w-10 sm:w-16 md:w-auto object-contain'
                />
              </div>
              <div className='absolute z-10 left-1/2 -translate-x-1/2 -top-28 hidden lg:block'>
                <img
                  src={bannerThumb}
                  draggable='false'
                  className='max-w-[inherit]'
                />
              </div>
              <div className='flex items-center justify-center gap-4 sm:gap-8 w-full relative z-20 mt-4 lg:mt-8 2xl:mt-5'>
                <h1 className='font-AlbertSans font-extrabold text-4xl sm:text-5xl md:text-[80px] xl:text-[120px] text-white uppercase tracking-wide drop-shadow-sm'>
                  Sức khỏe
                </h1>
              </div>
            </div>
            <div className='relative z-30 flex flex-col md:flex-row md:justify-between lg:justify-evenly xl:justify-between md:items-center gap-8 mt-12 md:mt-[130px] 2xl:mt-[140px]'>
              <div className='flex gap-5'>
                <div className='mt-[6px]'>
                  <img
                    src={bannerCheck}
                    draggable='false'
                  />
                </div>
                <div className='flex-1'>
                  <h5 className='font-AlbertSans font-semibold text-2xl text-white tracking-wide'>
                    Dịch Vụ Y Tế
                  </h5>
                  <p className='font-AlbertSans text-TextColor-0 lg:text-white xl:text-TextColor-0 mt-[6px] text-sm md:text-base leading-relaxed'>
                    Nền tảng đặt lịch khám và <br className='hidden sm:block' /> tư vấn trực tuyến hàng đầu
                  </p>
                </div>
              </div>
              <div>
                <Link to={'/appointment'}>
                  <button className='primary-btn'>
                    Đặt Lịch Ngay
                    <GoArrowRight
                      size={'22'}
                      className='-rotate-45'
                    />
                  </button>
                </Link>
              </div>
              <div className='absolute -bottom-14 -right-16 -z-10'>
                <img
                  src={bannerPlus}
                  draggable='false'
                  className='animate-rotational'
                />
              </div>
              <div className='absolute bottom-28 right-0 -z-10 hidden 2xl:block'>
                <img
                  src={bannerShape}
                  draggable='false'
                  className='animate-swing'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='absolute top-1/2 -translate-y-1/2 right-5 xl:right-10 hidden md:block'>
          <ul className='flex flex-col items-center gap-[26px]'>
            <li className='group relative'>
              <Link to={'/'}>
                <button className='text-white'>
                  <FaSquareFacebook size={'20'} />
                </button>
              </Link>
              <span className='absolute -left-16 -top-6 opacity-0 inline-block transition-all duration-500 group-hover:opacity-100 group-hover:-top-[35px] group-hover:-left-[85px]'>
                <span className='px-2 py-1 rounded bg-PrimaryColor-0 w-full text-white text-sm font-AlbertSans  relative z-10 before:absolute before:-bottom-[8px] before:-right-[5px] before:w-2 before:h-3 before:bg-PrimaryColor-0 before:[clip-path:polygon(0%_0%,_0%_0%,_100%_0%,_50%_100%)] before:-rotate-45'>
                  Facebook
                </span>
              </span>
            </li>
            <li className='group relative'>
              <Link to={'/'}>
                <button className='text-white'>
                  <FaLinkedinIn size={'20'} />
                </button>
              </Link>
              <span className='absolute -left-16 -top-6 opacity-0 inline-block transition-all duration-500 group-hover:opacity-100 group-hover:-top-[35px] group-hover:-left-[85px]'>
                <span className='px-2 py-1 rounded bg-PrimaryColor-0 w-full text-white text-sm font-AlbertSans  relative z-10 before:absolute before:-bottom-[8px] before:-right-[5px] before:w-2 before:h-3 before:bg-PrimaryColor-0 before:[clip-path:polygon(0%_0%,_0%_0%,_100%_0%,_50%_100%)] before:-rotate-45'>
                  LinkedIn
                </span>
              </span>
            </li>
            <li className='group relative'>
              <Link to={'/'}>
                <button className='text-white'>
                  <FaPinterestP size={'20'} />
                </button>
              </Link>
              <span className='absolute -left-16 -top-6 opacity-0 inline-block transition-all duration-500 group-hover:opacity-100 group-hover:-top-[35px] group-hover:-left-[85px]'>
                <span className='px-2 py-1 rounded bg-PrimaryColor-0 w-full text-white text-sm font-AlbertSans  relative z-10 before:absolute before:-bottom-[8px] before:-right-[5px] before:w-2 before:h-3 before:bg-PrimaryColor-0 before:[clip-path:polygon(0%_0%,_0%_0%,_100%_0%,_50%_100%)] before:-rotate-45'>
                  Pinterest
                </span>
              </span>
            </li>
            <li className='group relative'>
              <Link to={'/'}>
                <button className='text-white'>
                  <FaInstagram size={'20'} />
                </button>
              </Link>
              <span className='absolute -left-16 -top-6 opacity-0 inline-block transition-all duration-500 group-hover:opacity-100 group-hover:-top-[35px] group-hover:-left-[85px]'>
                <span className='px-2 py-1 rounded bg-PrimaryColor-0 w-full text-white text-sm font-AlbertSans  relative z-10 before:absolute before:-bottom-[8px] before:-right-[5px] before:w-2 before:h-3 before:bg-PrimaryColor-0 before:[clip-path:polygon(0%_0%,_0%_0%,_100%_0%,_50%_100%)] before:-rotate-45'>
                  Instagram
                </span>
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Banner;
