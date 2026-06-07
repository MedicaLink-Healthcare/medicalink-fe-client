import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaPhoneAlt, FaCommentDots, FaGraduationCap, FaFlask, FaUser, FaCalendarCheck } from 'react-icons/fa';
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
        <div className='max-w-6xl mx-auto'>
          {/* Doctor Header Info */}
          <div className='bg-white/60 backdrop-blur-md border border-white rounded-[40px] p-6 sm:p-8 lg:p-10 mb-12 shadow-sm'>
            <div className='flex flex-col md:flex-row gap-8 lg:gap-14 items-center md:items-stretch'>
              {/* Reduced Image Dominance */}
              <div className='w-full md:w-56 lg:w-72 shrink-0' data-aos='fade-right'>
                <div className='w-full aspect-square md:aspect-[4/5] rounded-[32px] overflow-hidden bg-PrimaryColor-0/5 border-4 border-white shadow-sm relative group'>
                  {doctor?.avatarUrl ? (
                    <img
                      src={doctor.avatarUrl}
                      alt={doctor.fullName}
                      draggable='false'
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                      <FaUser size={80} className='text-PrimaryColor-0 opacity-30' />
                    </div>
                  )}
                </div>
              </div>

              <div className='w-full md:w-2/3 lg:w-full flex flex-col justify-center py-2' data-aos='fade-left'>
                {/* Meta badges - Increased vertical spacing */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                   <div className="flex items-center gap-1.5 px-4 py-2 bg-PrimaryColor-0/10 text-PrimaryColor-0 rounded-full text-xs font-bold uppercase tracking-wide">
                    <FaUser size={12} />
                    {positions[0] || 'Bác sĩ'}
                   </div>
                   <div className="flex items-center gap-1.5 px-4 py-2 bg-white text-PrimaryColor-0 border border-PrimaryColor-0/10 rounded-full text-xs font-semibold shadow-sm">
                      <FaBriefcase size={12} className="opacity-70" />
                      {specialtyName}
                   </div>
                </div>

                <h2 className='font-AlbertSans font-bold text-4xl sm:text-5xl lg:text-6xl text-HeadingColor-0 leading-tight mb-6'>
                  {doctor?.fullName}
                </h2>

                {doctor?.workLocations?.length > 0 && (
                  <div className="flex items-center gap-2 text-TextColor2-0 font-medium mb-10">
                    <TfiLocationPin size={20} className="text-Secondarycolor-0" />
                    <span className="text-lg">{doctor.workLocations.map(loc => loc.name).join(' | ')}</span>
                  </div>
                )}

                <div className='flex flex-wrap items-center gap-4 mb-10'>
                  <Link
                    to={doctor?.id ? `/appointment?doctorId=${encodeURIComponent(doctor.id)}` : '/appointment'}
                    className='inline-flex items-center justify-center gap-2 rounded-full bg-PrimaryColor-0 px-10 py-4 font-AlbertSans text-base font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-PrimaryColor-0/90 w-full sm:w-auto'
                  >
                    <FaCalendarCheck size={18} />
                    Get appointment
                  </Link>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-black/5'>
                  <div className='flex items-center gap-4 group'>
                    <div className='size-12 rounded-full bg-white flex justify-center items-center text-PrimaryColor-0 shadow-sm transition-transform group-hover:scale-110'>
                      <FaPhoneAlt size={16} />
                    </div>
                    <div>
                      <h6 className='font-AlbertSans font-bold text-[11px] text-TextColor2-0 uppercase tracking-widest mb-0.5'>Contact</h6>
                      <p className='font-AlbertSans text-HeadingColor-0 font-bold'>{doctor?.phone || '+84 (024) 3872 3872'}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4 group'>
                    <div className='size-12 rounded-full bg-white flex justify-center items-center text-PrimaryColor-0 shadow-sm transition-transform group-hover:scale-110'>
                      <MdOutlineMail size={18} />
                    </div>
                    <div>
                      <h6 className='font-AlbertSans font-bold text-[11px] text-TextColor2-0 uppercase tracking-widest mb-0.5'>Email</h6>
                      <p className='font-AlbertSans text-HeadingColor-0 font-bold break-all'>{doctor?.email || 'info@medicalink.vn'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full'>
            {/* Tab Navigation - Underline Style */}
            <div className='sticky top-4 z-40 mb-10 bg-BodyBg-0/95 backdrop-blur-md border-b-2 border-black/5 flex overflow-x-auto no-scrollbar'>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-center gap-2 px-6 py-4 font-AlbertSans font-bold transition-colors duration-300 whitespace-nowrap flex-grow sm:flex-grow-0 ${
                    currentTab === tab.id
                      ? 'text-PrimaryColor-0'
                      : 'text-TextColor2-0 hover:text-PrimaryColor-0'
                  }`}
                >
                  <span className={currentTab === tab.id ? 'animate-bounce-slow' : ''}>{tab.icon}</span>
                  {tab.label}
                  {/* Underline Indicator */}
                  {currentTab === tab.id && (
                    <span className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-PrimaryColor-0 rounded-t-full"></span>
                  )}
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

              {/* Expertise Tab - Structured Hierarchy */}
              {currentTab === 'expertise' && (
                <div className="flex flex-col gap-8 animate-fadeIn">
                  <div className='bg-white/40 border-2 rounded-[30px] border-white p-6 sm:p-10'>

                    {/* 1. Main Expertise */}
                    <h2 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0 mb-6 flex items-center gap-3'>
                      <span className="p-2 bg-PrimaryColor-0 text-white rounded-lg"><FaBriefcase size={20} /></span>
                      Main Expertise
                    </h2>
                    <div className='flex flex-wrap gap-3 mb-12'>
                      {doctor?.expertise?.length > 0 ? doctor.expertise.map((item, idx) => (
                        <span key={`exp-${idx}`} className="px-6 py-3.5 bg-white text-HeadingColor-0 border border-PrimaryColor-0/20 rounded-2xl font-AlbertSans font-bold text-lg shadow-sm hover:border-PrimaryColor-0 transition-colors cursor-default">
                          {item}
                        </span>
                      )) : (
                        <p className='font-AlbertSans text-TextColor2-0 italic'>No expertise data available.</p>
                      )}
                    </div>

                    {/* 2. Clinical Procedures */}
                    {doctor?.procedures?.length > 0 && (
                      <div className="mb-12">
                        <h3 className='font-AlbertSans font-bold text-2xl text-HeadingColor-0 mb-6 flex items-center gap-2'>
                          <FaRegCircleCheck className="text-PrimaryColor-0" /> Clinical Procedures
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          {doctor.procedures.map((proc, idx) => (
                            <div key={`proc-${idx}`} className='flex items-start gap-3 text-TextColor2-0 bg-white/50 p-4 rounded-xl border border-white shadow-sm'>
                               <FaRegCircleCheck className='mt-1 text-PrimaryColor-0 flex-shrink-0' />
                               <span className="font-medium text-[16px]">{proc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. Conditions Treated */}
                    {doctor?.conditions?.length > 0 && (
                      <div className="mb-10">
                        <h3 className='font-AlbertSans font-bold text-xl text-HeadingColor-0 mb-4'>Conditions Treated</h3>
                        <div className='flex flex-wrap gap-2'>
                          {doctor.conditions.map((cond, idx) => (
                            <span key={`cond-${idx}`} className="px-4 py-2 bg-PrimaryColor-0/5 text-PrimaryColor-0 rounded-full font-medium text-sm border border-PrimaryColor-0/10">
                              {cond}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. Symptoms Managed */}
                    {doctor?.symptoms?.length > 0 && (
                      <div className="mb-10">
                        <h3 className='font-AlbertSans font-bold text-xl text-HeadingColor-0 mb-4'>Symptoms Managed</h3>
                        <div className='flex flex-wrap gap-2'>
                          {doctor.symptoms.map((symp, idx) => (
                            <span key={`symp-${idx}`} className="px-4 py-2 bg-white text-TextColor2-0 rounded-full font-medium text-sm border border-black/10">
                              {symp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 5. Patient Groups */}
                    {doctor?.patientGroups?.length > 0 && (
                      <div>
                        <h3 className='font-AlbertSans font-bold text-xl text-HeadingColor-0 mb-4'>Patient Groups</h3>
                        <div className='flex flex-wrap gap-2'>
                          {doctor.patientGroups.map((group, idx) => (
                            <span key={`group-${idx}`} className="px-4 py-2 bg-Secondarycolor-0/10 text-Secondarycolor-0 rounded-full font-medium text-sm border border-Secondarycolor-0/20">
                              {group}
                            </span>
                          ))}
                        </div>
                      </div>
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
