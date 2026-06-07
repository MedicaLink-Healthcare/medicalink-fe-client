import { useEffect, useState } from 'react';
import { FaArrowRightLong, FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import BreadCrumb from '@/Shared/BreadCrumb/BreadCrumb';
// import Subscribe from '@/Component1/Subscribe/Subscribe';
import { useDoctorsQuery } from '@/api/hooks/doctor/useDoctorQueries';
import { useSpecialtiesQuery } from '@/api/hooks/specialty/useSpecialtyQueries';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Loading from '@/Shared/Loading/Loading';
import usePagination from '@/hooks/usePagination';
import Pagination from '@/Shared/Pagination/Pagination';

const TeamInner = () => {
  const itemsPerPage = 12;
  const [totalItems, setTotalItems] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const pagination = usePagination({
    totalItems: totalItems,
    limit: itemsPerPage,
  });

  const { currentPage, handlePageChangeButtonClick, handleNextButtonClick, handlePreviousButtonClick, handleNextPageGroupButtonClick, handlePreviousPageGroupButtonClick } = pagination;

  const { data: specRes } = useSpecialtiesQuery({
    page: 1,
    limit: 100,
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const specialties = specRes?.data?.data ?? specRes?.data ?? [];

  const { data: doctorPage, isLoading, isFetching } = useDoctorsQuery({
    page: currentPage,
    limit: itemsPerPage,
    ...(searchName ? { fullName: searchName, name: searchName } : {}),
    ...(selectedSpecialty ? { specialtyIds: selectedSpecialty } : {}),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchName(searchTerm);
    handlePageChangeButtonClick(1);
  };

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
    handlePageChangeButtonClick(1);
  };

  const doctors = doctorPage?.items ?? [];

  useEffect(() => {
    if (doctorPage?.meta?.total != null) {
      setTotalItems(doctorPage.meta.total);
    }
  }, [doctorPage]);

  const totalPage =
    doctorPage?.meta?.totalPages || Math.ceil(totalItems / itemsPerPage) || 1;

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
      <section className='bg-BodyBg-0 bg-no-repeat bg-cover bg-center py-20 relative'>
        <div className='Container'>
          {/* Filters Section */}
          <div className='bg-white p-6 rounded-3xl shadow-sm border border-BodyBg2-0 mb-10'>
            <form onSubmit={handleSearch} className='grid grid-cols-1 md:grid-cols-12 gap-4'>
              <div className='md:col-span-6 relative'>
                <input
                  type='text'
                  placeholder='Search Doctor...'
                  className='w-full pl-5 pr-12 py-3.5 bg-BodyBg-0 rounded-2xl border border-transparent focus:border-PrimaryColor-0 focus:outline-none font-AlbertSans text-HeadingColor-0 transition-all'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type='submit' className='absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-PrimaryColor-0 text-white rounded-xl hover:bg-Secondarycolor-0 transition-all'>
                  <FaSearch size={14} />
                </button>
              </div>
              <div className='md:col-span-6 relative'>
                <select
                  className='w-full px-5 py-3.5 bg-BodyBg-0 rounded-2xl border border-transparent focus:border-PrimaryColor-0 focus:outline-none font-AlbertSans text-HeadingColor-0 appearance-none transition-all cursor-pointer'
                  value={selectedSpecialty}
                  onChange={handleSpecialtyChange}
                >
                  <option value=''>All Specialties</option>
                  {specialties.map(spec => (
                    <option key={spec.id} value={spec.id}>{spec.name}</option>
                  ))}
                </select>
                <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none'>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </form>
          </div>

          {isLoading || isFetching ? (
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
                        {doctor.specialties?.[0]?.name || doctor.position?.[0] || 'Doctor'}
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
      {/* <Subscribe /> */}
    </>
  );
};

export default TeamInner;
