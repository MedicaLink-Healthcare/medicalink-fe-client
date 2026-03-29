import { FaCircle } from 'react-icons/fa6';
import blogThumb from '/images/blog.jpg';
import BlogCard from './BlogCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';
import { useBlogsQuery } from '@/api/hooks/blog/useBlogQueries';
import Loading from '../../Shared/Loading/Loading';

const Blog = () => {
  const { data: response, isLoading } = useBlogsQuery({ limit: 6 });
  const blogs = response?.data || [];

  const settings = {
    loop: blogs.length > 3,
    spaceBetween: 30,
    speed: 1000,
    initialSlide: 0,
    autoplay: blogs.length > 3,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
    },
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <section className='py-28 bg-white'>
        <div className='Container text-center'>
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className='py-28 bg-white'>
      <div className='Container'>
        <div className='grid grid-cols-1 gap-8 lg:items-center lg:grid-cols-2 border-b border-BorderColor3-0 pb-7'>
          <div
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <h1 className='font-AlbertSans font-bold uppercase text-HeadingColor-0 text-xl leading-[30px] sm:text-3xl sm:leading-[40px] md:text-[40px] md:leading-[50px] lg:text-[50px] lg:leading-[60px] xl:text-[52px] xl:leading-[62px] 2xl:text-[60px] 2xl:leading-[70px]'>
              Read Our <br />
              Latest Blog
            </h1>
          </div>
          <div
            className='flex lg:justify-end'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <Link to={'/blog_grid'}>
              <button className='primary-btn mt-3'>
                View all Blog
                <GoArrowRight
                  size={'22'}
                  className='-rotate-45'
                />
              </button>
            </Link>
          </div>
        </div>
        <div className='mt-[56px]'>
          <Swiper {...settings}>
            {blogs.map((blog) => {
              return (
                <SwiperSlide key={blog.id}>
                  <div
                    data-aos='fade-up'
                    data-aos-duration='1000'
                  >
                    <BlogCard
                      blogThumb={blog.thumbnailUrl || blogThumb}
                      blogDateIcon={<FaCircle />}
                      blogDate={formatDate(blog.createdAt)}
                      blogPostBy={"Admin"}
                      blogPostByIcon={<FaCircle />}
                      blogUrl={`/blog_details/${blog.slug}`}
                      blogTitle={blog.title}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Blog;
