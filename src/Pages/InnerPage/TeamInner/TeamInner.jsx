import { useEffect, useState } from 'react';
import { FaArrowRightLong, FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import BreadCrumb from '@/Shared/BreadCrumb/BreadCrumb';
import Subscribe from '@/Component1/Subscribe/Subscribe';
import { useDoctorsQuery } from '@/api/hooks/doctor/useDoctorQueries';
import { Link } from 'react-router-dom';
import Loading from '@/Shared/Loading/Loading';
import usePagination from '@/hooks/usePagination';
import Pagination from '@/Shared/Pagination/Pagination';

const TeamInner = () => {
  const itemsPerPage = 12;
  const [totalItems, setTotalItems] = useState(0);

  const pagination = usePagination({
    totalItems: totalItems,
    limit: itemsPerPage,
  });

  const { currentPage, handlePageChangeButtonClick, handleNextButtonClick, handlePreviousButtonClick, handleNextPageGroupButtonClick, handlePreviousPageGroupButtonClick } = pagination;

  const { data: response, isLoading } = useDoctorsQuery({
    page: currentPage,
    limit: itemsPerPage
  });

  const doctors = response?.data?.data || response?.data || [];

  useEffect(() => {
    if (response?.meta?.total) {
      setTotalItems(response.meta.total);
    }
  }, [response]);

  const totalPage = response?.meta?.totalPages || Math.ceil(totalItems / itemsPerPage) || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Team Member'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Team Member'}
      />
      <section className='bg-BodyBg-0 bg-no-repeat bg-cover bg-center py-28 relative'>
        <div className='Container'>
          {isLoading ? (
            <div className='flex justify-center py-20'>
              <Loading />
            </div>
          ) : doctors.length === 0 ? (
            <p className='font-AlbertSans text-TextColor2-0 text-center text-xl'>
              No doctor information available.
            </p>
          ) : (
            <>
              <div
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'
              >
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className='group relative bg-white bg-opacity-30 rounded-3xl z-10 overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-0 before:bg-Secondarycolor-0 before:-z-10 before:transition-all before:duration-500 hover:before:h-full'
                    data-aos='fade-up'
                    data-aos-duration='1000'
                  >
                    <div className='relative rounded-t-3xl overflow-hidden border-t-2 border-white border-opacity-80 transition-all duration-500 group-hover:border-Secondarycolor-0 text-center pt-[22px] pb-7 z-10'>
                      <h5 className='font-AlbertSans font-bold text-[24px] xl:text-[26px] text-HeadingColor-0 transition-all duration-500 group-hover:text-white pb-[2px] truncate px-4'>
                        {doctor.fullName}
                      </h5>
                      <p className='font-AlbertSans text-TextColor2-0 text-[15px] transition-all duration-500 group-hover:text-white'>
                        {doctor.specialties?.[0]?.name || doctor.degree || 'Doctor'}
                      </p>
                    </div>
                    <div className='relative overflow-hidden rounded-3xl before:absolute before:top-0 before:left-0 before:bg-gradient-to-br before:from-PrimaryColor-0 before:from-10% before:via-blue-500/0 before:to-blue-500/0 before:w-0 before:h-0 before:transition-all before:duration-500 before:z-10 group-hover:before:h-full group-hover:before:w-full'>
                      {doctor.avatarUrl ? (
                        <img
                          src={doctor.avatarUrl}
                          alt={doctor.fullName}
                          className='w-full object-cover h-64 mx-auto'
                        />
                      ) : (
                        <div className='w-full h-64 flex items-center justify-center bg-PrimaryColor-0 bg-opacity-10'>
                          <span className='text-PrimaryColor-0 opacity-40 text-5xl'></span>
                        </div>
                      )}
                      <ul>
                        <li className='absolute z-20 -left-10 transition-all duration-300 group-hover:left-7 top-7'>
                          <Link to={`/team_details/${doctor.id}`}>
                            <button className='size-9 border-2 border-white hover:border-Secondarycolor-0 flex justify-center items-center rounded-full overflow-hidden relative bg-white bg-opacity-20 transition-all duration-500 hover:text-white text-HeadingColor-0 z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-Secondarycolor-0 before:-z-10 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100'>
                              <FaFacebookF />
                            </button>
                          </Link>
                        </li>
                        <li className='absolute z-20 -left-10 transition-all duration-500 group-hover:left-7 top-[70px]'>
                          <Link to={`/team_details/${doctor.id}`}>
                            <button className='size-9 border-2 border-white hover:border-Secondarycolor-0 flex justify-center items-center rounded-full overflow-hidden relative bg-white bg-opacity-20 transition-all duration-500 hover:text-white text-HeadingColor-0 z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-Secondarycolor-0 before:-z-10 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100'>
                              <FaXTwitter />
                            </button>
                          </Link>
                        </li>
                        <li className='absolute z-20 -left-10 transition-all duration-700 group-hover:left-7 top-28'>
                          <Link to={`/team_details/${doctor.id}`}>
                            <button className='size-9 border-2 border-white hover:border-Secondarycolor-0 flex justify-center items-center rounded-full overflow-hidden relative bg-white bg-opacity-20 transition-all duration-500 hover:text-white text-HeadingColor-0 z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-Secondarycolor-0 before:-z-10 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100'>
                              <FaLinkedinIn />
                            </button>
                          </Link>
                        </li>
                      </ul>
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

export default TeamInner;
