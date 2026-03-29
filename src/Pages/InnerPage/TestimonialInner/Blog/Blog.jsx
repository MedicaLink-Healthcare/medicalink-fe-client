import { GoArrowRight } from 'react-icons/go';
import { useBlogsQuery } from '@/api/hooks/blog/useBlogQueries';
import Loading from '@/Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogCard from './BlogCard';


const Blog = () => {
  const { data: response, isLoading } = useBlogsQuery({ limit: 4 });
  const blogs = response?.data || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const settings = {
    loop: true,
    spaceBetween: 30,
    speed: 1000,
    initialSlide: 1,
    autoplay: true,
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
  return (
    <section className='py-28 bg-BodyBg-0'>
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
        <div
          className='mt-[56px]'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          {isLoading ? (
            <div className='flex justify-center py-10'>
              <Loading />
            </div>
          ) : blogs.length === 0 ? (
            <p className='text-center text-TextColor2-0'>No blogs found.</p>
          ) : (
            <Swiper {...settings}>
              {blogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <div>
                    <BlogCard
                      blogThumb={blog.thumbnailUrl}
                      blogDate={formatDate(blog.publishedAt)}
                      blogPostBy={blog.authorName || 'Admin'}
                      blogUrl={`/blog_details/${blog.slug}`}
                      blogTitle={blog.title}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
