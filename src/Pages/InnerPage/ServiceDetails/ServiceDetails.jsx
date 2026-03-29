import { Link, useParams } from 'react-router-dom';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import {
  FaArrowRight,
  FaArrowRightLong,
  FaRegFolderOpen,
  FaUserDoctor,
} from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import callIcon from '/images/call3..png';
import Faq from './Accordion/Faq';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import Subscribe from '../../../Component1/Subscribe/Subscribe';
import sanitizeHtml from 'sanitize-html';
import ExpandableContent from '@/Shared/ExpandableContent/ExpandableContent';
import { useSpecialtyDetailQuery } from '../../../api/hooks/specialty/useSpecialtyQueries';
import { useSpecialtiesQuery } from '../../../api/hooks/specialty/useSpecialtyQueries';
import Loading from '../../../Shared/Loading/Loading';

const ServiceDetails = () => {
  const { id } = useParams();
  const { data: specialtyResponse, isLoading, isError } = useSpecialtyDetailQuery(id);
  const { data: specialtiesResponse } = useSpecialtiesQuery();

  const specialty = specialtyResponse?.data;
  const specialties = specialtiesResponse?.data || [];

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-BodyBg-0'>
        <Loading />
      </div>
    );
  }

  if (isError || !specialty) {
    return (
      <>
        <BreadCrumb
          breadCrumbTitle={'Service Details'}
          breadCrumbIcon={<FaArrowRightLong />}
          breadCrumbLink={'Service Details'}
        />
        <section className='py-[120px] bg-BodyBg-0'>
          <div className='Container'>
            <p className='font-AlbertSans text-TextColor2-0 text-center text-xl'>
              Specialty not found or failed to load.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Service Details'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={specialty.name}
      />
      <section className='py-[120px] bg-BodyBg-0'>
        <div className='Container'>
          <div className='grid grid-cols-3 gap-[50px] lg:gap-8 xl:gap-[50px]'>
            <div className='col-span-3 lg:col-span-2'>
              {specialty.iconUrl && (
                <div
                  className='rounded-[30px] overflow-hidden flex items-center justify-center bg-white bg-opacity-20 border-2 border-white p-10'
                  data-aos='fade-up'
                  data-aos-duration='1000'
                >
                  <img
                    src={specialty.iconUrl}
                    alt={specialty.name}
                    draggable='false'
                    className='max-h-[200px] object-contain'
                  />
                </div>
              )}
              <h2
                className='font-AlbertSans font-bold text-[28px] text-HeadingColor-0 capitalize mt-8'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                {specialty.name}
              </h2>
              <ExpandableContent
                htmlContent={sanitizeHtml(specialty.description, {
                  allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
                  allowedAttributes: {
                    ...sanitizeHtml.defaults.allowedAttributes,
                    img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ]
                  }
                })}
                maxHeight={300}
                className='font-AlbertSans text-TextColor2-0 mt-5 text-justify specialty-description'
                data-aos='fade-up'
                data-aos-duration='1000'
              />
              <div
                className='flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-[64px] bg-PrimaryColor-0 rounded-2xl px-4 sm:px-10 py-7 mt-11'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <div className='text-white relative before:absolute before:top-0 before:hidden sm:before:block before:-right-8 before:w-[2px] before:h-[48px] before:bg-white before:bg-opacity-25'>
                  <FaUserDoctor size={'50'} />
                </div>
                <h4 className='font-DMSans font-medium text-xl sm:text-[22px] text-white italic'>
                  We provide professional medical services with a team of experienced doctors.
                </h4>
              </div>
              <h2
                className='font-AlbertSans font-bold text-[28px] text-HeadingColor-0 capitalize mt-24'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                Frequently Asked Questions
              </h2>
              <p
                className='font-AlbertSans text-TextColor2-0 mt-6 mb-11'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                Below are frequently asked questions related to {specialty.name}.
              </p>
              <Faq />
            </div>
            <div className='col-span-3 lg:col-span-1'>
              <div
                className='rounded-2xl px-7 pt-7 pb-6 overflow-hidden bg-white bg-opacity-30 border-2 border-white border-opacity-80 mb-7'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <h4 className='font-AlbertSans font-semibold text-2xl text-HeadingColor-0 pb-2 mb-8 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-PrimaryColor-0'>
                  Specialties
                </h4>
                <ul className='mt-8'>
                  {specialties.slice(0, 6).map((s) => (
                    <li key={s.id}>
                      <Link to={`/service_details/${s.slug}`}>
                        <button
                          className={`w-full font-AlbertSans text-left transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-md border-2 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:border-PrimaryColor-0 hover:text-white ${
                            s.id === id
                              ? 'text-white bg-PrimaryColor-0 bg-opacity-100 border-PrimaryColor-0 border-opacity-100'
                              : 'text-HeadingColor-0 bg-white bg-opacity-30 border-white border-opacity-80'
                          }`}
                        >
                          <span className='flex items-center gap-3 lg:gap-1 xl:gap-3'>
                            <FaRegFolderOpen
                              className={`transition-all duration-500 group-hover:text-white ${
                                s.id === id ? 'text-white' : 'text-PrimaryColor-0'
                              }`}
                            />
                            {s.name}
                          </span>
                          <FaArrowRightLong
                            className={`transition-all duration-500 group-hover:text-white ${
                              s.id === id ? 'text-white' : 'text-PrimaryColor-0'
                            }`}
                          />
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className='rounded-2xl px-7 pt-7 pb-6 overflow-hidden bg-white bg-opacity-20 border-2 border-white border-opacity-80 mb-7'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <h4 className='font-AlbertSans font-semibold text-2xl text-HeadingColor-0 pb-2 mb-8 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-PrimaryColor-0'>
                  Downloads
                </h4>
                <ul className='mt-8'>
                  <li>
                    <Link to={'/'}>
                      <button className='w-full font-AlbertSans bg-HeadingColor-0 text-left text-white transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-lg bg-HoverColor-0 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:text-white'>
                        <span className='flex items-center gap-3'>
                          <BsFileEarmarkPdf
                            size={'20'}
                            className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white'
                          />
                          Service Report
                        </span>
                        <HiDownload size={'24'} className='text-white' />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <button className='w-full font-AlbertSans bg-HeadingColor-0 text-left text-white transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-lg bg-HoverColor-0 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:text-white'>
                        <span className='flex items-center gap-3'>
                          <BsFileEarmarkPdf
                            size={'20'}
                            className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white'
                          />
                          Service Lists
                        </span>
                        <HiDownload size={'24'} className='text-white' />
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="rounded-2xl px-9 overflow-hidden bg-[url('/images/company-bg.png')] bg-cover bg-no-repeat bg-center py-[50px]"
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <div className='relative before:absolute before:size-[90px] before:-top-[10px] before:-left-[10px] before:animate-rotational before:rounded-full before:border-[3px] before:border-dashed before:border-PrimaryColor-0 '>
                  <img src={callIcon} draggable='false' />
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

export default ServiceDetails;
