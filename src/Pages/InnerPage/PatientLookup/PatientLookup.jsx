import { useState, useMemo } from 'react';
import { FaArrowRightLong, FaPhone, FaUser, FaCalendarDays, FaIdCard, FaBuilding, FaUserDoctor, FaClock, FaLocationDot, FaMoneyBill1 } from 'react-icons/fa6';
import { HiOutlineMailOpen } from 'react-icons/hi';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { usePatientSearchQuery } from '../../../api/hooks/patient/usePatientQueries';
import { usePatientAppointmentsQuery } from '../../../api/hooks/appointment/useAppointmentQueries';
import Loading from '../../../Shared/Loading/Loading';

const STATUS_FILTERS = [
  { value: 'ALL', label: 'All History' },
  { value: 'BOOKED', label: 'Booked' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'RESCHEDULED', label: 'Rescheduled' },
  { value: 'CANCELLED', label: 'Cancelled' }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'CONFIRMED':
    case 'COMPLETED':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'BOOKED':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'RESCHEDULED':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'CANCELLED_BY_PATIENT':
    case 'CANCELLED_BY_STAFF':
    case 'NO_SHOW':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const formatStatusText = (status) => {
  if (status === 'CANCELLED_BY_PATIENT' || status === 'CANCELLED_BY_STAFF') return 'CANCELLED';
  if (status === 'NO_SHOW') return 'MISSED';
  return status;
}

const PatientLookup = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [searchParams, setSearchParams] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const { data: response, isLoading, isError, error } = usePatientSearchQuery(searchParams, {
    enabled: !!searchParams,
  });

  const patient = response?.data;

  // We query all appointments without status filter if 'ALL' or 'CANCELLED' is selected, 
  // since 'CANCELLED' requires grouping multiple API statuses.
  const queryParams = { page: 1, limit: 50 };
  if (activeFilter !== 'ALL' && activeFilter !== 'CANCELLED') {
    queryParams.status = activeFilter;
  }

  const { data: appointmentsResp, isLoading: isLoadingAppointments } = usePatientAppointmentsQuery(
    patient?.id,
    queryParams,
    { enabled: !!patient?.id }
  );

  const appointments = useMemo(() => {
    let list = appointmentsResp?.data || [];
    if (activeFilter === 'CANCELLED') {
      list = list.filter(a => a.status.includes('CANCELLED') || a.status === 'NO_SHOW');
    }
    return list;
  }, [appointmentsResp?.data, activeFilter]);


  const handleSearch = (e) => {
    e.preventDefault();
    if (phone.trim() || email.trim()) {
      setSearchParams({
        phone: phone.trim() || undefined,
        email: email.trim() || undefined
      });
      setActiveFilter('ALL'); // Reset filter on new search
    }
  };

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Patient Lookup'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Patient Lookup'}
      />
      <section className='py-24 bg-BodyBg-0'>
        <div className='Container'>
          <div className='max-w-4xl mx-auto'>
            <div
              className={`bg-white/40 border-2 border-white rounded-[30px] p-8 sm:p-10 shadow-xl backdrop-blur-md transition-all duration-700 ${patient ? 'mb-12' : ''}`}
              data-aos='fade-up'
              data-aos-duration='1000'
            >
              {!patient && (
                <div className='text-center mb-8'>
                  <h2 className='font-AlbertSans font-bold text-3xl sm:text-4xl text-HeadingColor-0 mb-3'>
                    Find Your Medical Records
                  </h2>
                  <p className='font-AlbertSans text-TextColor2-0 text-lg max-w-md mx-auto'>
                    Enter your contact details to retrieve your patient profile and appointment history.
                  </p>
                </div>
              )}

              <form onSubmit={handleSearch} className="space-y-6">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='flex flex-col'>
                    <label className='font-AlbertSans text-sm font-bold text-HeadingColor-0 mb-2 ml-1 opacity-80 uppercase tracking-wide'>
                      Phone Number
                    </label>
                    <div className='relative group'>
                      <input
                        type='text'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='+1 (555) 000-0000'
                        className='font-AlbertSans text-HeadingColor-0 placeholder:text-gray-400 font-medium bg-white/60 border-2 border-white focus:border-PrimaryColor-0 rounded-xl py-2 px-5 h-[55px] w-full focus:outline-none transition-all duration-300'
                      />
                      <div className='absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-PrimaryColor-0/10 text-PrimaryColor-0 group-focus-within:bg-PrimaryColor-0 group-focus-within:text-white transition-all'>
                        <FaPhone size={'14'} />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <label className='font-AlbertSans text-sm font-bold text-HeadingColor-0 mb-2 ml-1 opacity-80 uppercase tracking-wide'>
                      Email Address
                    </label>
                    <div className='relative group'>
                      <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='your.email@example.com'
                        className='font-AlbertSans text-HeadingColor-0 placeholder:text-gray-400 font-medium bg-white/60 border-2 border-white focus:border-PrimaryColor-0 rounded-xl py-2 px-5 h-[55px] w-full focus:outline-none transition-all duration-300'
                      />
                      <div className='absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-PrimaryColor-0/10 text-PrimaryColor-0 group-focus-within:bg-PrimaryColor-0 group-focus-within:text-white transition-all'>
                        <HiOutlineMailOpen size={'16'} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col items-center gap-4 pt-2'>
                  <button
                    type='submit'
                    className='primary-btn h-[55px] px-12 w-full md:w-max min-w-[200px] shadow-lg shadow-PrimaryColor-0/20 active:scale-95 transition-transform'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Searching...' : 'Find Records'}
                  </button>
                </div>
              </form>

              {isLoading && (
                <div className='mt-10 flex flex-col items-center justify-center py-8 gap-4'>
                  <Loading />
                  <p className='font-AlbertSans text-PrimaryColor-0 animate-pulse text-sm'>Accessing structured databases...</p>
                </div>
              )}

              {isError && (
                <div className='mt-8 bg-red-50/80 border border-red-200 text-red-600 px-6 py-4 rounded-xl text-center font-AlbertSans animate-fadeIn'>
                  <p className='font-bold mb-1'>Lookup Failed</p>
                  <p className='text-sm'>{error?.message || 'Unable to find a patient matching these details.'}</p>
                </div>
              )}
            </div>

            {/* DASHBOARD RENDER OVERRIDE */}
            {patient && !isLoading && !isError && (
              <div className='animate-fadeInTop'>
                
                {/* 1. VITAL CARD */}
                <div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 mb-10 border border-gray-100 flex flex-col md:flex-row items-center gap-8'>
                   <div className='size-24 rounded-full bg-blue-50 border-4 border-blue-100 flex items-center justify-center shrink-0'>
                      <FaUser className='text-blue-400 text-4xl' />
                   </div>
                   <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full text-center md:text-left'>
                      <div>
                        <p className='text-xs uppercase tracking-wider text-gray-400 font-bold mb-1'>Legal Name</p>
                        <p className='font-AlbertSans font-extrabold text-HeadingColor-0 text-lg truncate'>
                          {patient.fullName}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs uppercase tracking-wider text-gray-400 font-bold mb-1'>Gender</p>
                        <p className='font-AlbertSans font-bold text-HeadingColor-0 text-lg flex items-center justify-center md:justify-start gap-2'>
                          <FaIdCard className='text-PrimaryColor-0 opacity-50' size={14}/>
                          {patient.isMale ? 'Male' : 'Female'}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs uppercase tracking-wider text-gray-400 font-bold mb-1'>Date of Birth</p>
                        <p className='font-AlbertSans font-bold text-HeadingColor-0 text-lg flex items-center justify-center md:justify-start gap-2'>
                          <FaCalendarDays className='text-PrimaryColor-0 opacity-50' size={14}/>
                          {patient.birthday ? new Date(patient.birthday).toLocaleDateString('en-GB') : '--/--/----'}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs uppercase tracking-wider text-gray-400 font-bold mb-1'>Phone</p>
                        <p className='font-AlbertSans font-bold text-HeadingColor-0 text-lg flex items-center justify-center md:justify-start gap-2'>
                          <FaPhone className='text-PrimaryColor-0 opacity-50' size={14} />
                          {patient.phone}
                        </p>
                      </div>
                   </div>
                </div>

                {/* 2. HISTORY FILTERS */}
                <div className='flex flex-col sm:flex-row items-center justify-between mb-6'>
                  <h3 className='font-AlbertSans font-extrabold text-2xl text-HeadingColor-0 flex items-center gap-3'>
                    <FaClock className='text-PrimaryColor-0' />
                    Appointment History
                  </h3>
                  <div className='mt-4 sm:mt-0 bg-white shadow-sm border border-gray-100 rounded-lg p-1 flex overflow-x-auto w-full sm:w-max hide-scroll'>
                    {STATUS_FILTERS.map(filter => (
                      <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`font-AlbertSans text-sm font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                          activeFilter === filter.value 
                          ? 'bg-PrimaryColor-0 text-white shadow-md' 
                          : 'text-gray-500 hover:text-PrimaryColor-0 hover:bg-blue-50'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. HISTORY LIST / TABLE */}
                <div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-gray-100 overflow-hidden min-h-[300px] relative p-6 sm:p-8'>
                  
                  {isLoadingAppointments ? (
                     <div className='absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center'>
                        <Loading />
                        <span className='mt-4 font-AlbertSans text-sm text-gray-500 font-medium'>Syncing history...</span>
                     </div>
                  ) : appointments.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-full text-center py-16 opacity-70'>
                      <div className='size-20 rounded-full bg-blue-50 flex items-center justify-center mb-4'>
                        <FaCalendarDays className='text-blue-200 text-3xl' />
                      </div>
                      <p className='font-AlbertSans font-bold text-lg text-HeadingColor-0'>No Appointments Found</p>
                      <p className='font-DMSans text-TextColor-0 max-w-sm mt-1'>
                        {activeFilter === 'ALL' 
                          ? "You haven't booked any appointments yet." 
                          : `You don't have any appointments marked as ${activeFilter.toLowerCase()}.`}
                      </p>
                    </div>
                  ) : (
                    <div className='grid grid-cols-1 gap-5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar'>
                      {appointments.map((appt) => (
                         <div key={appt.id} className='bg-gray-50/50 border border-gray-100 rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center hover:shadow-md hover:border-blue-100 transition-all group'>
                            
                            {/* DATE BLOCK */}
                            <div className='flex shrink-0 w-full lg:w-40 border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0'>
                              <div className='flex flex-col text-left'>
                                <span className='text-xs uppercase tracking-widest text-gray-400 font-bold mb-1'>Date & Time</span>
                                <span className='font-AlbertSans font-bold text-HeadingColor-0 text-lg'>
                                  {appt.event?.serviceDate ? new Date(appt.event.serviceDate).toLocaleDateString('en-GB') : '--'}
                                </span>
                                <span className='font-DMSans text-sm text-PrimaryColor-0 font-semibold flex items-center gap-1.5 mt-0.5'>
                                  <FaClock size={12}/>
                                  {appt.event?.timeStart ? new Date(appt.event.timeStart).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) : '--'}
                                </span>
                              </div>
                            </div>

                            {/* CORE DETAILS */}
                            <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
                               <div className='flex items-start gap-3'>
                                  <div className='mt-1 size-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden shrink-0'>
                                     {appt.doctor?.avatarUrl ? (
                                        <img src={appt.doctor.avatarUrl} alt="Dr" className="w-full h-full object-cover" />
                                     ) : (
                                        <FaUserDoctor className='text-gray-300 text-lg' />
                                     )}
                                  </div>
                                  <div className='flex flex-col'>
                                     <span className='font-AlbertSans font-bold text-HeadingColor-0'>{appt.doctor?.fullName || 'Assigned Specialist'}</span>
                                     <span className='font-DMSans text-sm text-gray-500'>{appt.specialty?.name || 'General Checkup'}</span>
                                  </div>
                               </div>

                               <div className='flex items-start gap-3'>
                                  <div className='mt-1 size-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0'>
                                     <FaBuilding className='text-blue-400 text-lg' />
                                  </div>
                                  <div className='flex flex-col'>
                                     <span className='font-AlbertSans font-bold text-HeadingColor-0 truncate max-w-[200px]'>
                                       {appt.location?.name || 'Main Medical Center'}
                                     </span>
                                     <span className='font-DMSans text-sm text-gray-500 flex items-center gap-1 mt-0.5'>
                                       <FaLocationDot size={12} className='opacity-60'/>
                                       {appt.location?.address?.substring(0,25) || '123 Health Blvd'}...
                                     </span>
                                  </div>
                               </div>
                            </div>

                            {/* STATUS & ACTIONS */}
                            <div className='w-full lg:w-36 flex flex-row lg:flex-col justify-between items-center lg:items-end gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100'>
                               <span className={`px-3 py-1.5 rounded-md border text-xs font-bold font-AlbertSans tracking-wide ${getStatusBadge(appt.status)}`}>
                                 {formatStatusText(appt.status)}
                               </span>
                               {appt.priceAmount && (
                                  <span className='text-sm font-semibold text-gray-600 flex items-center gap-1.5'>
                                    <FaMoneyBill1 className='text-gray-400' />
                                    {appt.priceAmount.toLocaleString()} {appt.currency}
                                  </span>
                               )}
                            </div>

                         </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
};

export default PatientLookup;
