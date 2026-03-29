import { useParams, Link } from 'react-router-dom';
import { FaArrowRightLong, FaCircle } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import Subscribe from '../../../Component1/Subscribe/Subscribe';
import { useBlogDetailQuery } from '../../../api/hooks/blog/useBlogQueries';
import Loading from '../../../Shared/Loading/Loading';
import sanitizeHtml from 'sanitize-html';
import ExpandableContent from '@/Shared/ExpandableContent/ExpandableContent';

const BlogDetails = () => {
  const { slug } = useParams();
  const { data: response, isLoading, isError } = useBlogDetailQuery(slug);

  const blog = response?.data?.data || response?.data;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-BodyBg-0'>
        <Loading />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <>
        <BreadCrumb
          breadCrumbTitle={'Blog Details'}
          breadCrumbIcon={<FaArrowRightLong />}
          breadCrumbLink={'Blog Details'}
        />
        <section className='py-28 bg-BodyBg-0'>
          <div className='Container'>
            <p className='font-AlbertSans text-TextColor2-0 text-center text-xl'>
              Blog post not found or failed to load.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Blog Details'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Blog Details'}
      />
      <section className='py-28 bg-BodyBg-0'>
        <div className='Container'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-[50px]'>
            <div className='lg:col-span-2'>
              {blog.thumbnailUrl && (
                <div
                  className='rounded-3xl overflow-hidden mb-8'
                  data-aos='fade-up'
                  data-aos-duration='1000'
                >
                  <img
                    src={blog.thumbnailUrl}
                    alt={blog.title}
                    draggable='false'
                    className='w-full object-cover'
                  />
                </div>
              )}

              <div
                className='flex flex-wrap gap-6 mb-5'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
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
                {blog.category?.name && (
                  <p className='font-DMSans text-HeadingColor-0 flex gap-2 items-center uppercase text-sm'>
                    <span className='text-PrimaryColor-0 text-[10px]'>
                      <FaCircle />
                    </span>
                    {blog.category.name}
                  </p>
                )}
              </div>

              <h1
                className='font-AlbertSans font-bold text-2xl sm:text-3xl text-HeadingColor-0 mb-7'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                {blog.title}
              </h1>

              {blog.content ? (
                <ExpandableContent
                  htmlContent={sanitizeHtml(blog.content, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
                    allowedAttributes: {
                      ...sanitizeHtml.defaults.allowedAttributes,
                      img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ]
                    }
                  })}
                  maxHeight={400}
                  className="font-AlbertSans text-TextColor2-0 leading-relaxed blog-content"
                  data-aos='fade-up'
                  data-aos-duration='1000'
                />
              ) : null}

              <div className='mt-10'>
                <Link to='/blog_grid'>
                  <button className='primary-btn'>
                    ← Back to blog list
                  </button>
                </Link>
              </div>
            </div>

            <div className='lg:col-span-1'>
              <div className='lg:sticky lg:top-28'>
                <div
                  className='rounded-2xl px-7 pt-7 pb-6 bg-white bg-opacity-30 border-2 border-white border-opacity-80 mb-7'
                  data-aos='fade-up'
                  data-aos-duration='1000'
                >
                <h4 className='font-AlbertSans font-semibold text-2xl text-HeadingColor-0 pb-2 mb-4 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-PrimaryColor-0'>
                  Article Information
                </h4>
                <ul className='mt-6 space-y-3'>
                  {blog.authorName && (
                    <li className='font-AlbertSans text-TextColor2-0'>
                      <span className='font-semibold text-HeadingColor-0'>Author:</span>{' '}
                      {blog.authorName}
                    </li>
                  )}
                  {blog.publishedAt && (
                    <li className='font-AlbertSans text-TextColor2-0'>
                      <span className='font-semibold text-HeadingColor-0'>Published Date:</span>{' '}
                      {formatDate(blog.publishedAt)}
                    </li>
                  )}
                  {blog.category?.name && (
                    <li className='font-AlbertSans text-TextColor2-0'>
                      <span className='font-semibold text-HeadingColor-0'>Category:</span>{' '}
                      {blog.category.name}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
      <Subscribe />
    </>
  );
};

export default BlogDetails;
