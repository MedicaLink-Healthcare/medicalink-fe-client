import { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '@/Shared/BreadCrumb/BreadCrumb';
import ServiceCard from './ServiceCard';
import Appointment from './Appointment/Appointment';
import Subscribe from '@/Component1/Subscribe/Subscribe';
import { useSpecialtiesQuery } from '@/api/hooks/specialty/useSpecialtyQueries';
import Loading from '@/Shared/Loading/Loading';
import usePagination from '@/hooks/usePagination';
import Pagination from '@/Shared/Pagination/Pagination';
import sanitizeHtml from 'sanitize-html';

const ServiceInner = () => {
  const itemsPerPage = 9;
  const [totalItems, setTotalItems] = useState(0);

  const pagination = usePagination({
    totalItems: totalItems,
    limit: itemsPerPage,
  });

  const { currentPage, handlePageChangeButtonClick, handleNextButtonClick, handlePreviousButtonClick, handleNextPageGroupButtonClick, handlePreviousPageGroupButtonClick } = pagination;

  const { data: response, isLoading } = useSpecialtiesQuery({
    page: currentPage,
    limit: itemsPerPage
  });

  const specialties = response?.data?.data || response?.data || [];
  
  useEffect(() => {
    if (response?.meta?.total) {
      setTotalItems(response.meta.total);
    } else if (response?.data?.meta?.total) {
      setTotalItems(response.data.meta.total);
    }
  }, [response]);

  const totalPage = response?.meta?.totalPages || response?.data?.meta?.totalPages || Math.ceil(totalItems / itemsPerPage) || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Our Services'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Our Services'}
      />
      <section className='pt-[120px] relative z-10 bg-BodyBg-0'>
        <div className='Container'>
          {isLoading ? (
            <div className='flex justify-center py-20'>
              <Loading />
            </div>
          ) : specialties.length === 0 ? (
            <p className='font-AlbertSans text-TextColor2-0 text-center text-xl pb-10'>
              No services available.
            </p>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {specialties.map((specialty) => (
                  <div
                    key={specialty.id}
                    data-aos='fade-up'
                    data-aos-duration='1000'
                  >
                    <ServiceCard
                      serviceIcon={specialty.iconUrl || '/images/srvce-icn.png'}
                      serviceIcon2={specialty.iconUrl || '/images/srvce-icn-1.png'}
                      serviceUrl={`/service_details/${specialty.slug}`}
                      serviceButton='Read More'
                      serviceTitle={specialty.name}
                      serviceDesc={
                        specialty.description
                          ? sanitizeHtml(specialty.description, { allowedTags: [] }).slice(0, 120).trim() + '...'
                          : 'Professional medical services, high quality.'
                      }
                    />
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
      <Appointment />
      <Subscribe />
    </>
  );
};

export default ServiceInner;
