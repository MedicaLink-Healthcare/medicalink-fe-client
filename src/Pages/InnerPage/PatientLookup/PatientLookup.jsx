import { useState } from 'react';
import { FaArrowRightLong, FaPhone, FaUser, FaCalendarDays, FaIdCard } from 'react-icons/fa6';
import { HiOutlineMailOpen } from 'react-icons/hi';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import Subscribe from '../../../Component1/Subscribe/Subscribe';
import { usePatientSearchQuery } from '../../../api/hooks/patient/usePatientQueries';
import Loading from '../../../Shared/Loading/Loading';

const PatientLookup = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [searchParams, setSearchParams] = useState(null);

  const { data: response, isLoading, isError, error } = usePatientSearchQuery(searchParams, {
    enabled: !!searchParams,
  });

  const patient = response?.data;

  const handleSearch = (e) => {
    e.preventDefault();
    if (phone.trim() || email.trim()) {
      setSearchParams({ 
        phone: phone.trim() || undefined, 
        email: email.trim() || undefined 
      });
    }
  };

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Patient Lookup'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Patient Lookup'}
      />
      <section className='py-28 bg-BodyBg-0'>
        <div className='Container'>
          <div className='max-w-2xl mx-auto'>
            <div 
              className='bg-white bg-opacity-20 border-2 border-white rounded-3xl p-8 sm:p-12'
              data-aos='fade-up'
              data-aos-duration='1000'
            >
              <h2 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0 mb-6 text-center'>
                Lookup Patient Information
              </h2>
              <form onSubmit={handleSearch}>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
                    <div className='relative inline-block'>
                      <label className='block font-AlbertSans font-semibold text-HeadingColor-0 mb-2'>
                        Phone Number
                      </label>
                      <div className='relative'>
                        <input
                          type='text'
                          name='phone'
                          id='phone'
                          placeholder='+1 (555) 000-0000'
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className='font-AlbertSans text-HeadingColor-0 placeholder:text-TextColor2-0 font-light bg-white bg-opacity-30 border-2 border-white border-opacity-80 rounded-xl py-2 px-6 h-[60px] w-full focus:outline-PrimaryColor-0'
                        />
                        <FaPhone
                          size={'16'}
                          className='absolute text-PrimaryColor-0 top-1/2 -translate-y-1/2 right-5'
                        />
                      </div>
                    </div>
                    <div className='relative inline-block'>
                      <label className='block font-AlbertSans font-semibold text-HeadingColor-0 mb-2'>
                        Email Address
                      </label>
                      <div className='relative'>
                        <input
                          type='email'
                          name='email'
                          id='email'
                          placeholder='your.email@example.com'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className='font-AlbertSans text-HeadingColor-0 placeholder:text-TextColor2-0 font-light bg-white bg-opacity-30 border-2 border-white border-opacity-80 rounded-xl py-2 px-6 h-[60px] w-full focus:outline-PrimaryColor-0'
                        />
                        <HiOutlineMailOpen
                          size={'18'}
                          className='absolute text-PrimaryColor-0 top-1/2 -translate-y-1/2 right-5'
                        />
                      </div>
                    </div>
                  </div>
                  <p className='font-AlbertSans text-TextColor2-0 text-sm mb-8 text-center'>
                    Please provide at least one of the above to search for your records.
                  </p>
                <div className='flex justify-center'>
                  <button 
                    type='submit' 
                    className='primary-btn h-[60px] px-16 w-full sm:w-auto min-w-[200px]'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </form>

              {isLoading && (
                <div className='flex justify-center py-10'>
                  <Loading />
                </div>
              )}

              {isError && (
                <div className='bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl text-center font-AlbertSans'>
                  {error?.message || 'Failed to find patient information. Please try again.'}
                </div>
              )}

              {!isLoading && !isError && searchParams && !patient && (
                <div className='bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-xl text-center font-AlbertSans'>
                  No patient found with this phone number.
                </div>
              )}

              {patient && (
                <div className='mt-10 animate-fadeIn'>
                  <div className='border-t-2 border-white border-opacity-50 pt-10'>
                    <h3 className='font-AlbertSans font-bold text-2xl text-HeadingColor-0 mb-6'>
                      Patient Information
                    </h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      <div className='flex items-start gap-4 p-4 bg-white bg-opacity-30 rounded-2xl border border-white border-opacity-50'>
                        <div className='size-12 rounded-full bg-PrimaryColor-0 bg-opacity-10 flex items-center justify-center text-PrimaryColor-0'>
                          <FaUser />
                        </div>
                        <div>
                          <p className='text-xs uppercase text-TextColor2-0 font-bold mb-1'>Full Name</p>
                          <p className='font-AlbertSans font-semibold text-HeadingColor-0 text-lg'>{patient.fullName}</p>
                        </div>
                      </div>
                      <div className='flex items-start gap-4 p-4 bg-white bg-opacity-30 rounded-2xl border border-white border-opacity-50'>
                        <div className='size-12 rounded-full bg-PrimaryColor-0 bg-opacity-10 flex items-center justify-center text-PrimaryColor-0'>
                          <FaIdCard />
                        </div>
                        <div>
                          <p className='text-xs uppercase text-TextColor2-0 font-bold mb-1'>Gender</p>
                          <p className='font-AlbertSans font-semibold text-HeadingColor-0 text-lg'>
                            {patient.isMale ? 'Male' : 'Female'}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-4 p-4 bg-white bg-opacity-30 rounded-2xl border border-white border-opacity-50'>
                        <div className='size-12 rounded-full bg-PrimaryColor-0 bg-opacity-10 flex items-center justify-center text-PrimaryColor-0'>
                          <FaCalendarDays />
                        </div>
                        <div>
                          <p className='text-xs uppercase text-TextColor2-0 font-bold mb-1'>Birthday</p>
                          <p className='font-AlbertSans font-semibold text-HeadingColor-0 text-lg'>
                            {new Date(patient.birthday).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start gap-4 p-4 bg-white bg-opacity-30 rounded-2xl border border-white border-opacity-50'>
                        <div className='size-12 rounded-full bg-PrimaryColor-0 bg-opacity-10 flex items-center justify-center text-PrimaryColor-0'>
                          <FaPhone />
                        </div>
                        <div>
                          <p className='text-xs uppercase text-TextColor2-0 font-bold mb-1'>Phone</p>
                          <p className='font-AlbertSans font-semibold text-HeadingColor-0 text-lg'>{patient.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Subscribe />
    </>
  );
};

export default PatientLookup;
