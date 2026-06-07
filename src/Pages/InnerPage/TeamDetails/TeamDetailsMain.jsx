import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaPhoneAlt, FaCommentDots, FaGraduationCap, FaFlask, FaUser } from 'react-icons/fa';
import { FaBriefcase, FaRegCircleCheck } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
import { TfiLocationPin } from 'react-icons/tfi';
import sanitizeHtml from 'sanitize-html';
import ExpandableContent from '@/Shared/ExpandableContent/ExpandableContent';
import DoctorReviews from './DoctorReviews';

const TeamDetailsMain = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState('intro');
  const specialtyName = doctor?.specialties?.[0]?.name || 'Specialist';
  const positions = Array.isArray(doctor?.position) ? doctor.position : [];

  const tabs = [
    { id: 'intro', label: 'Biography', icon: <FaUser />, show: !!doctor?.introduction },
    { id: 'expertise', label: 'Expertise & Clinical', icon: <FaFlask />, show: doctor?.expertise?.length > 0 || doctor?.procedures?.length > 0 || doctor?.conditions?.length > 0 },
    { id: 'education', label: 'Education & Experience', icon: <FaGraduationCap />, show: doctor?.education?.length > 0 || doctor?.experience?.length > 0 },
    { id: 'reviews', label: 'Feedback', icon: <FaCommentDots />, show: true },
  ].filter(t => t.show);

  const currentTab = tabs.find(t => t.id === activeTab) ? activeTab : tabs[0]?.id;

  return (
    <section className='bg-BodyBg-0 py-10 lg:py-20'>
      <div className='Container'>
        <div className='max-w-5xl mx-auto'>
          {/* Doctor Header Info */}
          <div className='bg-white/40 border-2 rounded-[40px] border-white overflow-hidden mb-12 shadow-sm'>
            <div className='grid grid-cols-1 md:grid-cols-12 items-center'>
              <div className='md:col-span-4' data-aos='fade-right'>
                {doctor?.avatarUrl ? (
                  <img
                    src={doctor.avatarUrl}
                    alt={doctor.fullName}
                    draggable='false'
                    className='w-full h-full object-cover aspect-square'
                  />
                ) : (
                  <div className='w-full aspect-square flex items-center justify-center bg-PrimaryColor-0/10'>
                    <FaUser size={80} className='text-PrimaryColor-0 opacity-40' />
                  </div>
                )}
              </div>

              <div className='md:col-span-8 p-6 lg:p-12' data-aos='fade-left'>
                <div className='flex flex-col gap-2 mb-6'>
                  <h2 className='font-AlbertSans font-bold text-3xl sm:text-4xl lg:text-5xl text-HeadingColor-0 leading-tight'>
                    {doctor?.fullName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                     <div className="flex items-center gap-2 px-4 py-1.5 bg-PrimaryColor-0 text-white rounded-full text-xs font-semibold tracking-wide shadow-sm">
                      <FaUser size={12} className="opacity-80" />
                      <span className="uppercase">{doctor?.degree || 'Specialist'}</span>
                     </div>
                     {doctor?.workLocations?.length > 0 && (
                       <div className="flex items-center gap-2 px-4 py-1.5 bg-Secondarycolor-0 text-white rounded-full text-xs font-medium shadow-sm">
                          <TfiLocationPin size={14} className="opacity-80" />
                          <span>{doctor.workLocations.map(loc => loc.name).join(' | ')}</span>
                       </div>
                     )}
                     <div className="hidden sm:block text-TextColor2-0 font-light text-xl">|</div>
                     <div className="flex items-center gap-2 text-PrimaryColor-0 font-bold text-lg px-2">
                        <FaBriefcase size={16} className="opacity-60" />
                        {specialtyName}
                     </div>
                  </div>
                </div>

                {positions.length > 0 && (
                  <div className='space-y-2 mb-8'>
                    {positions.map((pos, idx) => (
                      <p key={idx} className='font-AlbertSans text-TextColor2-0 flex items-start gap-2 leading-relaxed'>
                        <span className="size-1.5 rounded-full bg-PrimaryColor-0 mt-2 flex-shrink-0" />
                        {pos}
                      </p>
                    ))}
                  </div>
                )}

                <div className='mb-6'>
                  <Link
                    to={doctor?.id ? `/appointment?doctorId=${encodeURIComponent(doctor.id)}` : '/appointment'}
                    className='inline-flex items-center justify-center rounded-2xl bg-Secondarycolor-0 px-6 py-3 font-AlbertSans text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90'
                  >
                    Get appointment
                  </Link>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/60'>
                  <div className='flex items-center gap-4 group'>
                    <div className='size-12 rounded-2xl bg-white border border-PrimaryColor-0/10 flex justify-center items-center text-PrimaryColor-0 transition-all duration-300 group-hover:bg-PrimaryColor-0 group-hover:text-white group-hover:scale-110 shadow-sm'>
                      <FaPhoneAlt size={18} />
                    </div>
                    <div>
                      <h6 className='font-AlbertSans font-medium text-xs text-TextColor2-0 uppercase tracking-widest mb-0.5'>Contact</h6>
                      <p className='font-AlbertSans text-HeadingColor-0 font-bold'>{doctor?.phone || '+84 (024) 3872 3872'}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4 group'>
                    <div className='size-12 rounded-2xl bg-white border border-PrimaryColor-0/10 flex justify-center items-center text-PrimaryColor-0 transition-all duration-300 group-hover:bg-PrimaryColor-0 group-hover:text-white group-hover:scale-110 shadow-sm'>
                      <MdOutlineMail size={20} />
                    </div>
                    <div>
                      <h6 className='font-AlbertSans font-medium text-xs text-TextColor2-0 uppercase tracking-widest mb-0.5'>Email</h6>
                      <p className='font-AlbertSans text-HeadingColor-0 font-bold'>{doctor?.email || 'info@medicalink.vn'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full'>
            {/* Tab Navigation */}
            <div className='sticky top-4 z-40 mb-8 bg-white/80 backdrop-blur-md rounded-2xl p-1.5 border border-white flex flex-wrap shadow-md overflow-x-auto no-scrollbar'>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-AlbertSans font-bold transition-all duration-500 whitespace-nowrap flex-grow sm:flex-grow-0 ${
                    currentTab === tab.id
                      ? 'bg-PrimaryColor-0 text-white shadow-lg shadow-PrimaryColor-0/20 translate-y-[-2px]'
                      : 'text-TextColor2-0 hover:bg-PrimaryColor-0/5 hover:text-PrimaryColor-0'
                  }`}
                >
                  <span className={currentTab === tab.id ? 'animate-bounce-slow' : ''}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            <div className='transition-all duration-500 animate-fadeIn'>
              {/* Biography Tab */}
              {currentTab === 'intro' && (
                <div className="flex flex-col gap-8">
                  <div className='bg-white/40 border-2 rounded-[30px] border-white p-6 sm:p-10 relative overflow-hidden'>
                    <h2 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0 mb-8 flex items-center gap-3'>
                      <span className="p-2 bg-PrimaryColor-0 text-white rounded-lg"><FaUser size={20} /></span>
                      Biography
                    </h2>
                    <ExpandableContent
                      htmlContent={sanitizeHtml(doctor.introduction?.replace(/xem thêm\s*$/i, '').trim(), {
                        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
                        allowedAttributes: {
                          ...sanitizeHtml.defaults.allowedAttributes,
                          img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ]
                        }
                      })}
                      maxHeight={400}
                      className='font-AlbertSans text-TextColor2-0 text-justify biography-content leading-relaxed text-[17px]'
                    />
                  </div>
                </div>
              )}

              {/* Expertise Tab */}
              {currentTab === 'expertise' && (
                <div className="flex flex-col gap-8">
                  {/* Expertise & Procedures */}
                  <div className='bg-white/40 border-2 rounded-[30px] border-white p-6 sm:p-10'>
                    <h2 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0 mb-8 flex items-center gap-3'>
                      <span className="p-2 bg-PrimaryColor-0 text-white rounded-lg"><FaBriefcase size={20} /></span>
                      Areas of Expertise
                    </h2>
                    <div className='flex flex-wrap gap-3 mb-8'>
                      {doctor?.expertise?.map((item, idx) => (
                        <span key={`exp-${idx}`} className="px-5 py-3 bg-white/60 text-PrimaryColor-0 border-2 border-white rounded-2xl font-AlbertSans font-bold shadow-sm hover:scale-105 transition-transform cursor-default">
                          {item}
                        </span>
                      ))}
                    </div>

                    {doctor?.procedures?.length > 0 && (
                      <>
                        <h3 className='font-AlbertSans font-bold text-xl text-HeadingColor-0 mb-4 mt-6'>Clinical Procedures</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                          {doctor.procedures.map((proc, idx) => (
                            <div key={`proc-${idx}`} className='flex items-start gap-3 text-TextColor2-0 bg-white/50 p-4 rounded-2xl border border-white hover:border-PrimaryColor-0/30 transition-all shadow-sm'>
                               <FaRegCircleCheck className='mt-1 text-PrimaryColor-0 flex-shrink-0' />
                               {proc}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {currentTab === 'education' && (
                <div className="flex flex-col gap-8">
                  {/* Experience */}
                  <div className='bg-white/40 border-2 rounded-[30px] border-white p-6 sm:p-10'>
                    <div className='flex justify-between items-center mb-8'>
                      <h2 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0 flex items-center gap-3'>
                        <span className="p-2 bg-PrimaryColor-0 text-white rounded-lg"><FaBriefcase size={20} /></span>
                        Professional Experience
                      </h2>
                      {doctor?.experienceYears > 0 && (
                        <span className='px-4 py-2 bg-PrimaryColor-0/10 text-PrimaryColor-0 rounded-full font-bold text-sm'>
                          {doctor.experienceYears} Years
                        </span>
                      )}
                    </div>
                    <ExpandableContent maxHeight={400}>
                      <div className='space-y-6'>
                        {doctor?.experience?.length > 0 ? doctor.experience.map((exp, idx) => (
                          <div key={idx} className='flex gap-5 group'>
                            <div className='flex flex-col items-center flex-shrink-0'>
                              <div className='size-10 rounded-full bg-white border-2 border-PrimaryColor-0 flex items-center justify-center text-PrimaryColor-0 font-bold text-sm shadow-sm group-hover:bg-PrimaryColor-0 group-hover:text-white transition-all'>
                                {idx + 1}
                              </div>
                              {idx !== doctor.experience.length - 1 && <div className='w-0.5 h-full bg-PrimaryColor-0/10 my-2' />}
                            </div>
                            <div className="bg-white/30 p-5 rounded-2xl border border-white flex-grow group-hover:bg-white/50 transition-all">
                              <p className='font-AlbertSans text-TextColor2-0 text-[17px] leading-relaxed group-hover:text-HeadingColor-0 transition-colors'>
                                {exp}
                              </p>
                            </div>
                          </div>
                        )) : (
                          <p className='font-AlbertSans text-TextColor2-0 italic'>No experience data available.</p>
                        )}
                      </div>
                    </ExpandableContent>
                  </div>

                  {/* Education */}
                  <div className='bg-white/40 border-2 rounded-[30px] border-white p-6 sm:p-10'>
                    <h2 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0 mb-8 flex items-center gap-3'>
                      <span className="p-2 bg-PrimaryColor-0 text-white rounded-lg"><FaGraduationCap size={20} /></span>
                      Education & Training
                    </h2>
                    <div className='grid grid-cols-1 gap-4'>
                      {doctor?.education?.length > 0 ? doctor.education.map((train, idx) => (
                        <div key={idx} className='flex gap-4 items-center bg-white/50 p-4 rounded-2xl border border-white shadow-sm'>
                          <span className="size-3 rounded-full bg-PrimaryColor-0/40 ring-4 ring-PrimaryColor-0/5" />
                          <p className='font-AlbertSans text-TextColor2-0 text-[16px] font-medium'>{train}</p>
                        </div>
                      )) : (
                        <p className='font-AlbertSans text-TextColor2-0 italic'>No education info available.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {currentTab === 'reviews' && (
                <div className="bg-white/40 border-2 border-white rounded-[40px] p-6 sm:p-10 shadow-sm animate-fadeIn">
                   <DoctorReviews doctorId={doctor.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

TeamDetailsMain.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.string,
    fullName: PropTypes.string,
    avatarUrl: PropTypes.string,
    degree: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    position: PropTypes.arrayOf(PropTypes.string),
    introduction: PropTypes.string,
    experience: PropTypes.arrayOf(PropTypes.string),
    education: PropTypes.arrayOf(PropTypes.string),
    expertise: PropTypes.arrayOf(PropTypes.string),
    conditions: PropTypes.arrayOf(PropTypes.string),
    procedures: PropTypes.arrayOf(PropTypes.string),
    symptoms: PropTypes.arrayOf(PropTypes.string),
    patientGroups: PropTypes.arrayOf(PropTypes.string),
    experienceYears: PropTypes.number,
    specialties: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
    })),
    workLocations: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default TeamDetailsMain;
