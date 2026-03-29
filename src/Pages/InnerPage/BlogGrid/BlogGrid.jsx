import { useEffect, useState } from 'react';
import { FaArrowRightLong, FaCircle } from 'react-icons/fa6';
import BreadCrumb from '@/Shared/BreadCrumb/BreadCrumb';
import { GoArrowRight } from 'react-icons/go';
import Subscribe from '@/Component1/Subscribe/Subscribe';
import { useBlogsQuery } from '@/api/hooks/blog/useBlogQueries';
import { Link } from 'react-router-dom';
import Loading from '@/Shared/Loading/Loading';
import usePagination from '@/hooks/usePagination';
import Pagination from '@/Shared/Pagination/Pagination';

const BlogGrid = () => {
  const itemsPerPage = 6;
  const [totalItems, setTotalItems] = useState(0);

  const pagination = usePagination({
    totalItems: totalItems,
    limit: itemsPerPage,
  });

  const { currentPage, handlePageChangeButtonClick, handleNextButtonClick, handlePreviousButtonClick, handleNextPageGroupButtonClick, handlePreviousPageGroupButtonClick } = pagination;

  const { data: response, isLoading } = useBlogsQuery({
    page: currentPage,
    limit: itemsPerPage
  });

  const blogs = response?.data || [];

  useEffect(() => {
    if (response?.meta?.total) {
      setTotalItems(response.meta.total);
    }
  }, [response]);

  const totalPage = response?.meta?.totalPages || Math.ceil(totalItems / itemsPerPage) || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Blog Grid'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Blog Grid'}
      />
      <section className='py-28 bg-BodyBg-0'>
        <div className='Container'>
          {isLoading ? (
            <div className='flex justify-center py-20'>
              <Loading />
            </div>
          ) : blogs.length === 0 ? (
            <p className='font-AlbertSans text-TextColor2-0 text-center text-xl'>
              Blog not found or failed to load.
            </p>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-7'>
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    data-aos='fade-up'
                    data-aos-duration='1000'
                    className='group transition-all duration-500 p-5 rounded-3xl bg-white bg-opacity-20 border-2 border-white border-opacity-80'
                  >
                    <div className='relative rounded-[20px] overflow-hidden'>
                      <span className='absolute bg-PrimaryColor-0 left-[12.5%] top-0 h-full w-0 transition-all duration-500 z-10 group-hover:w-[25%] group-hover:left-0 group-hover:opacity-0'></span>
                      <span className='absolute bg-PrimaryColor-0 left-[37.5%] top-0 h-full w-0 transition-all duration-500 z-10 group-hover:w-[25%] group-hover:left-[25%] group-hover:opacity-0'></span>
                      <span className='absolute bg-PrimaryColor-0 left-[62.5%] top-0 h-full w-0 transition-all duration-500 z-10 group-hover:w-[25%] group-hover:left-1/2 group-hover:opacity-0'></span>
                      <span className='absolute bg-PrimaryColor-0 left-[87.5%] top-0 h-full w-0 transition-all duration-500 z-10 group-hover:w-[25%] group-hover:left-[75%] group-hover:opacity-0'></span>
                      {blog.thumbnailUrl ? (
                        <img
                          src={blog.thumbnailUrl}
                          alt={blog.title}
                          className='transition-all duration-500 scale-100 group-hover:scale-110 w-full h-56 object-cover'
                        />
                      ) : (
                        <div className='w-full h-56 bg-PrimaryColor-0 bg-opacity-10 flex items-center justify-center'>
                          <span className='text-PrimaryColor-0 opacity-40 text-5xl'>📰</span>
                        </div>
                      )}
                    </div>

                    <div className='rounded-b-lg relative z-20 transition-all duration-500 pt-9 md:px-5 lg:px-0 xl:px-5'>
                      <div>
                        <div className='flex flex-wrap gap-4 mb-3'>
                          {blog.publishedAt && (
                            <p className='font-DMSans text-HeadingColor-0 flex gap-2 items-center uppercase text-sm'>
                              <span className='text-PrimaryColor-0 text-[10px]'>
                                <FaCircle />
                              </span>
                              {formatDate(blog.publishedAt)}
                            </p>
                          )}
                          {blog.authorName && (
                            <p className='font-DMSans text-HeadingColor-0 flex gap-2 items-center uppercase text-sm'>
                              <span className='text-PrimaryColor-0 text-[10px]'>
                                <FaCircle />
                              </span>
                              {blog.authorName}
                            </p>
                          )}
                        </div>
                        <Link to={`/blog_details/${blog.slug}`}>
                          <button className='font-AlbertSans text-left font-semibold text-xl xl:text-[22px] text-HeadingColor-0 transition-all duration-500 hover:text-PrimaryColor-0 mt-2 line-clamp-2 min-h-[66px]'>
                            {blog.title}
                          </button>
                        </Link>
                        <div className='inline-block mt-8 mb-5'>
                          <Link to={`/blog_details/${blog.slug}`}>
                            <button className='primary-btn !py-[11px] !px-8'>
                              Read More
                              <span className='text-[22px] -rotate-45'>
                                <GoArrowRight />
                              </span>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                pagesInCurrentGroup={pagination.pagesInCurrentGroup}
                handlePageChangeButtonClick={handlePageChangeButtonClick}
                handleNextButtonClick={handleNextButtonClick}
                handlePreviousButtonClick={handlePreviousButtonClick}
                handleNextPageGroupButtonClick={handleNextPageGroupButtonClick}
                handlePreviousPageGroupButtonClick={handlePreviousPageGroupButtonClick}
              />
            </>
          )}
        </div>
      </section>
      <Subscribe />
    </>
  );
};

export default BlogGrid;
