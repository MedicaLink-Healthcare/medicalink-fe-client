import { Link } from 'react-router-dom';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import {
  FaArrowRight,
  FaArrowRightLong,
  FaRegFolderOpen,
} from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import callIcon from '/images/call3..png';
import { IoSearch } from 'react-icons/io5';
import Subscribe from '../../../Component1/Subscribe/Subscribe';
import { GoArrowRight } from 'react-icons/go';
import BlogSidebarCard from './BlogSidebarCard';
import { useBlogsQuery, useBlogCategoriesQuery } from '../../../api/hooks/blog/useBlogQueries';
import Loading from '../../../Shared/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';



const BlogRightSidebar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);

  const { data: blogResponse, isLoading: isBlogsLoading } = useBlogsQuery({
    limit: 6
  });
  const { data: popularResponse } = useBlogsQuery({
    limit: 3,
    sort: 'publishedAt:desc'
  });
  const { data: categoriesResponse } = useBlogCategoriesQuery();

  const blogs = blogResponse?.data || [];
  const popularPosts = popularResponse?.data || [];
  const allCategories = categoriesResponse?.data || [];
  const categories = showAllCategories ? allCategories : allCategories.slice(0, 10);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/blog_grid?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

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
        breadCrumbTitle={'Blog Right Sidebar'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Blog Right Sidebar'}
      />
      <section className='py-[120px] bg-BodyBg-0'>
        <div className='Container'>
          <div className='grid grid-cols-3 gap-[50px]'>
            <div className='col-span-3 lg:col-span-2'>
              {isBlogsLoading ? (
                <div className='flex justify-center py-20'>
                  <Loading />
                </div>
              ) : blogs.length === 0 ? (
                <p className='font-AlbertSans text-TextColor2-0 text-center text-xl'>
                  No blogs found.
                </p>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center gap-7'>
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      data-aos='fade-up'
                      data-aos-duration='1000'
                    >
                      <BlogSidebarCard
                        blogThumb={blog.thumbnailUrl}
                        blogDate={formatDate(blog.publishedAt)}
                        blogPostBy={blog.authorName || 'Admin'}
                        blogUrl={`/blog_details/${blog.slug}`}
                        blogTitle={blog.title}
                        blogGridContent='Read More'
                        blogGridIcon={<GoArrowRight />}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='col-span-3 lg:col-span-1'>
              <div
                className='rounded-2xl px-4 sm:px-7 lg:px-4 xl:px-7 pt-7 pb-9 overflow-hidden bg-white bg-opacity-20 border-2 border-white border-opacity-80 mb-7'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <h4 className='font-AlbertSans font-semibold text-2xl text-HeadingColor-0 pb-2 mb-8 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-PrimaryColor-0'>
                  Search
                </h4>
                <form onSubmit={handleSearch} className='relative inline-block w-full'>
                  <input
                    type='text'
                    name='search'
                    id='search'
                    placeholder='Search here...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full h-[60px] p-6 bg-white bg-opacity-30 border-2 border-white border-opacity-80 rounded-full font-AlbertSans focus:outline-PrimaryColor-0'
                  />
                  <button
                    type='submit'
                    className='text-xl text-white rounded-full size-11 bg-PrimaryColor-0 transition-all duration-500 flex items-center justify-center hover:hue-rotate-[360deg] absolute right-2 top-1/2 -translate-y-1/2'
                  >
                    <IoSearch />
                  </button>
                </form>
              </div>
              <div
                className='rounded-2xl px-4 sm:px-7 lg:px-4 xl:px-7 pt-7 pb-6 overflow-hidden bg-white bg-opacity-30 border-2 border-white border-opacity-80 mb-7'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <h4 className='font-AlbertSans font-semibold text-2xl text-HeadingColor-0 pb-2 mb-8 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-PrimaryColor-0'>
                  Categories
                </h4>
                <ul className='mt-8'>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link to={`/blog_grid?category=${cat.id}`}>
                        <button className='w-full font-AlbertSans text-left text-HeadingColor-0 transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-md bg-white bg-opacity-30 border-2 border-white border-opacity-80 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:border-PrimaryColor-0 hover:text-white'>
                          <span className='flex items-center gap-3 lg:gap-1 xl:gap-3'>
                            <FaRegFolderOpen className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white' />
                            {cat.name}
                          </span>
                          <FaArrowRightLong className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white' />
                        </button>
                      </Link>
                    </li>
                  ))}
                  {allCategories.length > 10 && (
                    <div className='mt-4 flex justify-center'>
                      <button
                        onClick={() => setShowAllCategories(!showAllCategories)}
                        className='flex items-center gap-2 font-AlbertSans font-semibold text-PrimaryColor-0 hover:text-Secondarycolor-0 transition-colors duration-300 px-5 py-2 border border-PrimaryColor-0 rounded-full bg-white bg-opacity-20'
                      >
                        {showAllCategories ? (
                          <>
                            Show Less <GoArrowUp size={18} />
                          </>
                        ) : (
                          <>
                            Show More ({allCategories.length - 10} more) <GoArrowDown size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                  {allCategories.length === 0 && (
                    <p className='text-TextColor2-0 italic text-sm text-center'>No categories found</p>
                  )}
                </ul>
              </div>
              <div
                className='rounded-2xl px-4 sm:px-7 lg:px-4 xl:px-7 pt-7 pb-6 overflow-hidden bg-white bg-opacity-20 border-2 border-white border-opacity-80 mb-7'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <h4 className='font-AlbertSans font-semibold text-2xl text-HeadingColor-0 pb-2 mb-8 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-PrimaryColor-0'>
                  Popular Post
                </h4>
                {popularPosts.map((post) => (
                  <Link key={post.id} to={`/blog_details/${post.slug}`}>
                    <button className='group flex gap-4 my-6 w-full text-left'>
                      <div className='size-[82px] rounded-xl overflow-hidden flex-shrink-0'>
                        {post.thumbnailUrl ? (
                          <img
                            draggable='false'
                            src={post.thumbnailUrl}
                            alt={post.title}
                            className='size-full object-cover'
                          />
                        ) : (
                          <div className='size-full bg-PrimaryColor-0 bg-opacity-10 flex items-center justify-center text-2xl'>📰</div>
                        )}
                      </div>
                      <div className='flex-1'>
                        <h6 className='font-AlbertSans font-semibold md:text-lg lg:text-sm xl:text-lg leading-6 text-HeadingColor-0 transition-all duration-500 group-hover:text-PrimaryColor-0 line-clamp-2'>
                          {post.title}
                        </h6>
                        <p className='font-AlbertSans text-TextColor2-0 text-sm mt-1 uppercase'>
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                    </button>
                  </Link>
                ))}
                {popularPosts.length === 0 && (
                  <p className='text-TextColor2-0 italic text-sm text-center'>No popular posts found</p>
                )}
              </div>
              <div
                className='rounded-2xl px-4 sm:px-7 lg:px-4 xl:px-7 pt-7 pb-6 overflow-hidden bg-white bg-opacity-20 border-2 border-white border-opacity-80 mb-7'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <h4 className='font-AlbertSans font-semibold text-2xl text-HeadingColor-0 pb-2 mb-8 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-PrimaryColor-0'>
                  Tags
                </h4>
                <ul className='inline-block'>
                  <li className='inline-block mr-[10px] mb-[10px]'>
                    <Link to={'/'}>
                      <button className='bg-white bg-opacity-20 border-2 border-white border-opacity-80 rounded flex items-center justify-center text-HeadingColor-0 transition-all duration-500 font-medium px-5 py-2 font-AlbertSans text-sm relative z-[1] before:absolute before:top-0 before:left-0 before:rounded before:w-full before:h-full before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 before:-z-[1] hover:before:scale-100 hover:text-white'>
                        Medical Care
                      </button>
                    </Link>
                  </li>
                  <li className='inline-block mr-[10px] mb-[10px]'>
                    <Link to={'/'}>
                      <button className='bg-white bg-opacity-20 border-2 border-white border-opacity-80 rounded flex items-center justify-center text-HeadingColor-0 transition-all duration-500 font-medium px-5 py-2 font-AlbertSans text-sm relative z-[1] before:absolute before:top-0 before:left-0 before:rounded before:w-full before:h-full before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 before:-z-[1] hover:before:scale-100 hover:text-white'>
                        Dentist
                      </button>
                    </Link>
                  </li>
                  <li className='inline-block mr-[10px] mb-[10px]'>
                    <Link to={'/'}>
                      <button className='bg-white bg-opacity-20 border-2 border-white border-opacity-80 rounded flex items-center justify-center text-HeadingColor-0 transition-all duration-500 font-medium px-5 py-2 font-AlbertSans text-sm relative z-[1] before:absolute before:top-0 before:left-0 before:rounded before:w-full before:h-full before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 before:-z-[1] hover:before:scale-100 hover:text-white'>
                        Psychologist
                      </button>
                    </Link>
                  </li>
                  <li className='inline-block mr-[10px] mb-[10px]'>
                    <Link to={'/'}>
                      <button className='bg-white bg-opacity-20 border-2 border-white border-opacity-80 rounded flex items-center justify-center text-HeadingColor-0 transition-all duration-500 font-medium px-5 py-2 font-AlbertSans text-sm relative z-[1] before:absolute before:top-0 before:left-0 before:rounded before:w-full before:h-full before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 before:-z-[1] hover:before:scale-100 hover:text-white'>
                        Health Care
                      </button>
                    </Link>
                  </li>
                  <li className='inline-block mr-[10px] mb-[10px]'>
                    <Link to={'/'}>
                      <button className='bg-white bg-opacity-20 border-2 border-white border-opacity-80 rounded flex items-center justify-center text-HeadingColor-0 transition-all duration-500 font-medium px-5 py-2 font-AlbertSans text-sm relative z-[1] before:absolute before:top-0 before:left-0 before:rounded before:w-full before:h-full before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 before:-z-[1] hover:before:scale-100 hover:text-white'>
                        Medicine
                      </button>
                    </Link>
                  </li>
                  <li className='inline-block mr-[10px] mb-[10px]'>
                    <Link to={'/'}>
                      <button className='bg-white bg-opacity-20 border-2 border-white border-opacity-80 rounded flex items-center justify-center text-HeadingColor-0 transition-all duration-500 font-medium px-5 py-2 font-AlbertSans text-sm relative z-[1] before:absolute before:top-0 before:left-0 before:rounded before:w-full before:h-full before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 before:-z-[1] hover:before:scale-100 hover:text-white'>
                        Therapist
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="rounded-2xl px-4 sm:px-9 lg:px-4 xl:px-9 overflow-hidden bg-[url('/images/company-bg.png')] bg-cover bg-no-repeat bg-center py-[50px]"
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <div className='relative before:absolute before:size-[90px] before:-top-[10px] before:-left-[10px] before:animate-rotational before:rounded-full before:border-[3px] before:border-dashed before:border-PrimaryColor-0 '>
                  <img
                    src={callIcon}
                    draggable='false'
                  />
                </div>
                <h6 className='font-AlbertSans font-medium text-lg text-white mt-9 mb-2'>
                  Call Us Anytime
                </h6>
                <Link to={'/'}>
                  <button className='font-AlbertSans font-semibold text-2xl text-white'>
                    +123 (4567) 890
                  </button>
                </Link>
                <Link to={'/'}>
                  <button className='font-AlbertSans text-white flex gap-2 items-center mt-4 mb-[52px]'>
                    <MdEmail className='text-xl text-PrimaryColor-0' />
                    example@gmail.com
                  </button>
                </Link>
                <Link to={'/contact'}>
                  <button className='font-AlbertSans text-white flex gap-2 items-center bg-PrimaryColor-0 w-full h-[58px] rounded-md justify-center z-10 relative before:absolute before:top-0 before:right-0 before:scale-0 before:-z-10 before:w-full before:h-full before:bg-SecondaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:scale-100 hover:text-white'>
                    Contact Us
                    <FaArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Subscribe />
    </>
  );
};

export default BlogRightSidebar;
