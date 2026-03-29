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
          <div className='max-w-3xl mx-auto'>
            <div 
              className='bg-white bg-opacity-30 border-2 border-white rounded-[40px] p-8 sm:p-14 shadow-xl backdrop-blur-md'
              data-aos='fade-up'
              data-aos-duration='1000'
            >
              <div className='text-center mb-10'>
                <h2 className='font-AlbertSans font-bold text-3xl sm:text-4xl text-HeadingColor-0 mb-4'>
                  Search Your Records
                </h2>
                <p className='font-AlbertSans text-TextColor2-0 text-lg max-w-md mx-auto'>
                  Enter your contact details below to retrieve your medical profile and history.
                </p>
              </div>

              <form onSubmit={handleSearch} className="space-y-8">
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='flex flex-col'>
                      <label className='font-AlbertSans font-bold text-HeadingColor-0 mb-3 ml-1'>
                        Phone Number
                      </label>
                      <div className='relative group'>
                        <input
                          type='text'
                          name='phone'
                          id='phone'
                          placeholder='+1 (555) 000-0000'
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className='font-AlbertSans text-HeadingColor-0 placeholder:text-TextColor2-0 font-medium bg-white/40 border-2 border-white focus:border-PrimaryColor-0 rounded-2xl py-2 px-6 h-[65px] w-full focus:outline-none transition-all duration-300'
                        />
                        <div className='absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-PrimaryColor-0/10 text-PrimaryColor-0 group-focus-within:bg-PrimaryColor-0 group-focus-within:text-white transition-all'>
                          <FaPhone size={'16'} />
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <label className='font-AlbertSans font-bold text-HeadingColor-0 mb-3 ml-1'>
                        Email Address
                      </label>
                      <div className='relative group'>
                        <input
                          type='email'
                          name='email'
                          id='email'
                          placeholder='your.email@example.com'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className='font-AlbertSans text-HeadingColor-0 placeholder:text-TextColor2-0 font-medium bg-white/40 border-2 border-white focus:border-PrimaryColor-0 rounded-2xl py-2 px-6 h-[65px] w-full focus:outline-none transition-all duration-300'
                        />
                        <div className='absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-PrimaryColor-0/10 text-PrimaryColor-0 group-focus-within:bg-PrimaryColor-0 group-focus-within:text-white transition-all'>
                          <HiOutlineMailOpen size={'18'} />
                        </div>
                      </div>
                    </div>
                  </div>

                <div className='flex flex-col items-center gap-6 pt-4'>
                  <button 
                    type='submit' 
                    className='primary-btn h-[65px] px-16 w-full sm:w-auto min-w-[250px] shadow-lg shadow-PrimaryColor-0/20 active:scale-95 transition-transform'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Searching...' : 'Find Patient Record'}
                  </button>
                  <p className='text-xs text-TextColor2-0 text-center flex items-center gap-2'>
                    <span className='size-1 rounded-full bg-PrimaryColor-0' />
                    Privacy Note: Your information is encrypted and only visible to authorized medical staff.
                  </p>
                </div>
              </form>

              {isLoading && (
                <div className='flex flex-col items-center justify-center py-16 gap-4'>
                  <Loading />
                  <p className='font-AlbertSans text-PrimaryColor-0 animate-pulse'>Securely accessing database...</p>
                </div>
              )}

              {isError && (
                <div className='mt-8 bg-red-50/80 border-2 border-red-200 text-red-600 px-6 py-5 rounded-[20px] text-center font-AlbertSans animate-fadeIn'>
                  <p className='font-bold mb-1'>Access Error</p>
                  {error?.message || 'Failed to find patient information. Please try again.'}
                </div>
              )}

              {!isLoading && !isError && searchParams && !patient && (
                <div className='mt-8 bg-amber-50/80 border-2 border-amber-200 text-amber-700 px-6 py-5 rounded-[20px] text-center font-AlbertSans animate-fadeIn'>
                  <p className='font-bold mb-1'>No Records Found</p>
                  No patient was matched with the information provided.
                </div>
              )}

              {patient && (
                <div className='mt-12 animate-fadeIn'>
                  <div className='border-t-2 border-white/40 pt-12 text-center'>
                    <h3 className='font-AlbertSans font-bold text-2xl text-HeadingColor-0 mb-8 inline-block relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-PrimaryColor-0 after:rounded-full pb-3'>
                      Record Found: {patient.fullName}
                    </h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-left'>
                      <div className='flex items-center gap-5 p-5 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-white transition-all hover:border-PrimaryColor-0/50 hover:shadow-md group'>
                        <div className='size-14 rounded-xl bg-PrimaryColor-0/10 flex items-center justify-center text-PrimaryColor-0 group-hover:bg-PrimaryColor-0 group-hover:text-white transition-all'>
                          <FaUser size={20} />
                        </div>
                        <div>
                          <p className='text-[10px] uppercase tracking-widest text-TextColor2-0 font-bold mb-0.5'>Legal Name</p>
                          <p className='font-AlbertSans font-bold text-HeadingColor-0 text-lg'>{patient.fullName}</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-5 p-5 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-white transition-all hover:border-PrimaryColor-0/50 hover:shadow-md group'>
                        <div className='size-14 rounded-xl bg-PrimaryColor-0/10 flex items-center justify-center text-PrimaryColor-0 group-hover:bg-PrimaryColor-0 group-hover:text-white transition-all'>
                          <FaIdCard size={20} />
                        </div>
                        <div>
                          <p className='text-[10px] uppercase tracking-widest text-TextColor2-0 font-bold mb-0.5'>Biological Gender</p>
                          <p className='font-AlbertSans font-bold text-HeadingColor-0 text-lg'>
                            {patient.isMale ? 'Male' : 'Female'}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-5 p-5 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-white transition-all hover:border-PrimaryColor-0/50 hover:shadow-md group'>
                        <div className='size-14 rounded-xl bg-PrimaryColor-0/10 flex items-center justify-center text-PrimaryColor-0 group-hover:bg-PrimaryColor-0 group-hover:text-white transition-all'>
                          <FaCalendarDays size={20} />
                        </div>
                        <div>
                          <p className='text-[10px] uppercase tracking-widest text-TextColor2-0 font-bold mb-0.5'>Date of Birth</p>
                          <p className='font-AlbertSans font-bold text-HeadingColor-0 text-lg'>
                            {new Date(patient.birthday).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-5 p-5 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-white transition-all hover:border-PrimaryColor-0/50 hover:shadow-md group'>
                        <div className='size-14 rounded-xl bg-PrimaryColor-0/10 flex items-center justify-center text-PrimaryColor-0 group-hover:bg-PrimaryColor-0 group-hover:text-white transition-all'>
                          <FaPhone size={20} />
                        </div>
                        <div>
                          <p className='text-[10px] uppercase tracking-widest text-TextColor2-0 font-bold mb-0.5'>Contact Number</p>
                          <p className='font-AlbertSans font-bold text-HeadingColor-0 text-lg'>{patient.phone}</p>
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
