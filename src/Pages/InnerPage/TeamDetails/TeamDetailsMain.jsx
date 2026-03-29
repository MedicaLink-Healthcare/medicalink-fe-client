/* eslint-disable react/prop-types */
import { FaPhoneAlt } from 'react-icons/fa';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaUser,
  FaXTwitter,
} from 'react-icons/fa6';
import { MdCall, MdOutlineMail } from 'react-icons/md';
import { TfiLocationPin } from 'react-icons/tfi';
// import ProgressBar from 'react-animated-progress-bar';
import { GoArrowRight } from 'react-icons/go';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { FaBriefcase, FaGraduationCap, FaAward, FaFlask, FaRegCircleCheck } from 'react-icons/fa6';
import sanitizeHtml from 'sanitize-html';
import ExpandableContent from '@/Shared/ExpandableContent/ExpandableContent';

const TeamDetailsMain = ({ doctor }) => {
  const specialtyName = doctor?.specialties?.[0]?.name || 'Doctor';
  const positions = Array.isArray(doctor?.position) ? doctor.position : [];

  return (
    <section className='bg-BodyBg-0 py-28'>
      <div className='Container'>
        <div className='bg-white bg-opacity-20 border-2 rounded-3xl border-white grid grid-cols-1 lg:grid-cols-2 items-center gap-10 xl:gap-12 2xl:gap-20 overflow-hidden'>
          <div
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            {doctor?.avatarUrl ? (
              <img
                src={doctor.avatarUrl}
                alt={doctor.fullName}
                draggable='false'
                className='w-full object-cover'
              />
            ) : (
              <div className='w-full h-[360px] flex items-center justify-center bg-PrimaryColor-0 bg-opacity-10'>
                <FaUser size={80} className='text-PrimaryColor-0 opacity-40' />
              </div>
            )}
          </div>
          <div
            className='px-4 lg:px-0 pb-10 lg:py-6 xl:py-0 inline-block'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <h2 className='font-AlbertSans font-bold text-3xl sm:text-4xl text-HeadingColor-0 mb-1'>
              {doctor?.fullName || 'Doctor'}
            </h2>
            <p className='font-AlbertSans text-TextColor2-0'>
              {doctor?.degree ? `${doctor.degree} - ` : ''}{specialtyName}
            </p>
            {positions.length > 0 && (
              <p className='font-AlbertSans text-TextColor2-0 text-sm mt-2'>
                {positions[0]}
              </p>
            )}
            <div className='flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-10 sm:items-center lg:items-start xl:items-center mt-9 mb-10'>
              <div className='flex items-center gap-5'>
                <div className='size-[60px] rounded-full border-2 border-PrimaryColor-0 flex justify-center items-center text-PrimaryColor-0 transition-all duration-500 group-hover:text-white group-hover:border-white'>
                  <FaPhoneAlt size={'26'} />
                </div>
                <div className='flex-1'>
                  <h5 className='font-AlbertSans font-semibold text-xl text-HeadingColor-0 transition-all duration-500 group-hover:text-white mb-2'>
                    Call Us Anytime
                  </h5>
                  <p className='font-AlbertSans text-PrimaryColor-0 font-semibold md:text-2xl lg:text-xl 2xl:text-2xl transition-all duration-500 group-hover:text-white'>
                    +123 (4547) 563
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <div className='size-[60px] rounded-full border-2 border-PrimaryColor-0 flex justify-center items-center text-PrimaryColor-0  transition-all duration-500 group-hover:text-white group-hover:border-white'>
                  <MdOutlineMail size={'26'} />
                </div>
                <div className='flex-1'>
                  <h5 className='font-AlbertSans font-semibold text-xl text-HeadingColor-0 transition-all duration-500 group-hover:text-white mb-2'>
                    Send E-Mail
                  </h5>
                  <p className='font-AlbertSans text-PrimaryColor-0 font-semibold md:text-2xl lg:text-xl 2xl:text-2x transition-all duration-500 group-hover:text-white'>
                    info@medicalink.vn
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center gap-6 my-10'>
              <h5 className='font-AlbertSans font-semibold text-xl sm:text-2xl text-HeadingColor-0'>
                Social Media :
              </h5>
              <ul className='flex gap-3'>
                <li>
                  <button className='size-10 rounded-full text-sm border-2 border-white bg-white bg-opacity-20 hover:border-PrimaryColor-0 flex items-center justify-center text-HeadingColor-0 hover:text-white overflow-hidden transition-all duration-500 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100'>
                    <FaFacebookF />
                  </button>
                </li>
                <li>
                  <button className='size-10 rounded-full text-sm border-2 border-white bg-white bg-opacity-20 hover:border-PrimaryColor-0 flex items-center justify-center text-HeadingColor-0 hover:text-white overflow-hidden transition-all duration-500 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100'>
                    <FaXTwitter />
                  </button>
                </li>
                <li>
                  <button className='size-10 rounded-full text-sm border-2 border-white bg-white bg-opacity-20 hover:border-PrimaryColor-0 flex items-center justify-center text-HeadingColor-0 hover:text-white overflow-hidden transition-all duration-500 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100'>
                    <FaLinkedinIn />
                  </button>
                </li>
                <li>
                  <button className='size-10 rounded-full text-sm border-2 border-white bg-white bg-opacity-20 hover:border-PrimaryColor-0 flex items-center justify-center text-HeadingColor-0 hover:text-white overflow-hidden transition-all duration-500 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100'>
                    <FaPinterestP />
                  </button>
                </li>
              </ul>
            </div>
            <div className='flex items-center gap-5'>
              <div className='size-[56px] rounded-full border-2 border-PrimaryColor-0 flex justify-center items-center text-PrimaryColor-0 text-3xl transition-all duration-500 group-hover:text-white group-hover:border-white'>
                <TfiLocationPin />
              </div>
              <div className='flex-1'>
                <h5 className='font-AlbertSans font-semibold text-lg text-HeadingColor-0 transition-all duration-500 group-hover:text-white mb-1'>
                  Location
                </h5>
                <p className='font-AlbertSans text-PrimaryColor-0 text-lg transition-all duration-500 group-hover:text-white'>
                  {doctor?.workLocations?.[0] || '123 Medical Street, Da Nang, Vietnam'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {doctor?.introduction && (
          <div
            className='bg-white bg-opacity-20 border-2 rounded-3xl border-white p-4 sm:p-10 my-10'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <h2 className='font-AlbertSans font-bold text-3xl sm:text-4xl text-HeadingColor-0 mb-7 flex items-center gap-3 underline decoration-PrimaryColor-0 decoration-4 underline-offset-8'>
              <FaBriefcase className='text-PrimaryColor-0' />
              Professional Biography
            </h2>
            <ExpandableContent
              htmlContent={sanitizeHtml(doctor.introduction.replace(/xem thêm\s*$/i, '').trim(), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
                allowedAttributes: {
                  ...sanitizeHtml.defaults.allowedAttributes,
                  img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ]
                }
              })}
              maxHeight={350}
              className='font-AlbertSans text-TextColor2-0 text-justify biography-content leading-relaxed text-lg'
            />
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-10'>
          {/* Experience Section */}
          <div
            className='p-4 sm:p-10 bg-white bg-opacity-20 border-2 rounded-3xl border-white h-full'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <h2 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0 mb-8 flex items-center gap-3'>
              <FaBriefcase className='text-PrimaryColor-0' />
              Experience
            </h2>
            <ul className='space-y-6'>
              {doctor?.experience?.length > 0 ? (
                doctor.experience.map((exp, idx) => (
                  <li key={idx} className='flex gap-4 group'>
                    <div className='flex flex-col items-center'>
                      <div className='size-3 rounded-full bg-PrimaryColor-0 mt-2 ring-4 ring-PrimaryColor-0/10' />
                      {idx !== doctor.experience.length - 1 && <div className='w-[1px] h-full bg-gray-200 mt-2' />}
                    </div>
                    <div>
                      <p className='font-AlbertSans text-TextColor2-0 leading-relaxed group-hover:text-HeadingColor-0 transition-colors'>
                        {exp}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p className='font-AlbertSans text-TextColor2-0 italic'>No experience data available.</p>
              )}
            </ul>
          </div>

          <div className='flex flex-col gap-10'>
            {/* Training Section */}
            <div
              className='p-4 sm:p-10 bg-white bg-opacity-20 border-2 rounded-3xl border-white'
              data-aos='fade-up'
              data-aos-duration='1000'
            >
              <h2 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0 mb-8 flex items-center gap-3'>
                <FaGraduationCap className='text-PrimaryColor-0' />
                Education & Training
              </h2>
              <ul className='space-y-4'>
                {doctor?.trainingProcess?.length > 0 ? (
                  doctor.trainingProcess.map((train, idx) => (
                    <li key={idx} className='flex gap-3 items-start'>
                      <FaRegCircleCheck className='mt-1 text-PrimaryColor-0 flex-shrink-0' />
                      <p className='font-AlbertSans text-TextColor2-0'>{train}</p>
                    </li>
                  ))
                ) : (
                  <p className='font-AlbertSans text-TextColor2-0 italic'>Information currently being updated.</p>
                )}
              </ul>
            </div>

             {/* Memberships, Awards & Research Grid */}
             <div className='grid grid-cols-1 gap-6'>
                {doctor?.memberships?.length > 0 && (
                  <div
                    className='p-4 sm:p-8 bg-white bg-opacity-20 border-2 rounded-3xl border-white'
                    data-aos='fade-up'
                    data-aos-duration='1000'
                  >
                    <h2 className='font-AlbertSans font-bold text-2xl text-HeadingColor-0 mb-6 flex items-center gap-3 underline decoration-PrimaryColor-0 decoration-2 underline-offset-4'>
                      <FaAward className='text-PrimaryColor-0' />
                      Memberships
                    </h2>
                    <ul className='grid grid-cols-1 gap-2'>
                      {doctor.memberships.map((member, idx) => (
                        <li key={idx} className='flex items-start gap-3 font-AlbertSans text-TextColor2-0 bg-white/40 p-3 rounded-xl border border-white/60 hover:border-PrimaryColor-0 transition-all'>
                           <FaRegCircleCheck className='mt-1 text-PrimaryColor-0 flex-shrink-0' />
                           {member}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {doctor?.awards?.length > 0 && (
                  <div
                    className='p-4 sm:p-8 bg-white bg-opacity-20 border-2 rounded-3xl border-white'
                    data-aos='fade-up'
                    data-aos-duration='1000'
                  >
                    <h2 className='font-AlbertSans font-bold text-2xl text-HeadingColor-0 mb-6 flex items-center gap-3 underline decoration-PrimaryColor-0 decoration-2 underline-offset-4'>
                      <FaAward className='text-PrimaryColor-0' />
                      Honors & Awards
                    </h2>
                    <ul className='grid grid-cols-1 gap-2'>
                      {doctor.awards.map((award, idx) => (
                        <li key={idx} className='flex items-start gap-3 font-AlbertSans text-TextColor2-0 bg-white/40 p-3 rounded-xl border border-white/60'>
                           <FaAward className='mt-1 text-Secondarycolor-0 flex-shrink-0' />
                           {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {doctor?.research && (() => {
                  try {
                    const res = typeof doctor.research === 'string' ? JSON.parse(doctor.research) : doctor.research;
                    const hasResearch = res.international?.length > 0 || res.domestic?.length > 0;
                    if (!hasResearch) return null;

                    return (
                      <div
                        className='p-4 sm:p-8 bg-white bg-opacity-20 border-2 rounded-3xl border-white'
                        data-aos='fade-up'
                        data-aos-duration='1000'
                      >
                        <h2 className='font-AlbertSans font-bold text-2xl text-HeadingColor-0 mb-6 flex items-center gap-3 underline decoration-PrimaryColor-0 decoration-2 underline-offset-4'>
                          <FaFlask className='text-PrimaryColor-0' />
                          Scientific Research
                        </h2>
                        {res.international?.length > 0 && (
                          <div className='mb-4'>
                            <h4 className='font-AlbertSans font-bold text-HeadingColor-0 mb-2'>International Publications</h4>
                            <ul className='list-disc list-inside text-TextColor2-0 space-y-1 ml-2'>
                              {res.international.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                          </div>
                        )}
                        {res.domestic?.length > 0 && (
                          <div>
                            <h4 className='font-AlbertSans font-bold text-HeadingColor-0 mb-2'>Domestic Publications</h4>
                            <ul className='list-disc list-inside text-TextColor2-0 space-y-1 ml-2'>
                              {res.domestic.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  } catch { return null; }
                })()}
             </div>
          </div>
        </div>
        {/* Specialties and Consultation Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
          <div
            className='p-4 sm:p-10 bg-white bg-opacity-20 border-2 rounded-3xl border-white'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <h2 className='font-AlbertSans font-bold text-3xl sm:text-4xl text-HeadingColor-0 mb-7'>
              Specialties
            </h2>
            {doctor?.specialties?.length > 0 ? (
              doctor.specialties.map((spec, idx) => (
                <div key={spec.id || idx} className='mb-[22px]'>
                  <h6 className='font-AlbertSans font-medium text-lg text-HeadingColor-0 pb-3'>
                    {spec.name}
                  </h6>
                  {/* <ProgressBar
                    rect
                    width='100%'
                    height='5px'
                    fontColor='#002570'
                    fontSize='18px'
                    leading='10px'
                    margin='0px'
                    rectBorderRadius='10px'
                    fontWeight='500'
                    percentage={String(95 - idx * 5)}
                    defColor={{
                      excellent: '#002570',
                      good: '#002570',
                      fair: 'green',
                      poor: 'red',
                    }}
                    trackPathColor='#b8c8e2'
                    trackBorderColor='transparent'
                    trackPathBorderRadius='10px'
                  /> */}
                </div>
              ))
            ) : (
              <p className='font-AlbertSans text-TextColor2-0'>No specialty information available.</p>
            )}
          </div>

          <div
            className='p-4 sm:p-10 bg-white bg-opacity-20 border-2 rounded-3xl border-white'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <h2 className='font-AlbertSans font-bold text-2xl sm:text-3xl md:text-4xl text-HeadingColor-0 mb-7'>
              Book a Consultation
            </h2>
            <form
              action='#'
              method='post'
              className='flex flex-col gap-y-5 mt-9'
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <div className='relative inline-block'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Full Name*'
                    required
                    className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 font-light bg-transparent border border-Secondarycolor-0 border-opacity-45 rounded-xl py-2 px-6 h-[60px] w-full focus:outline-PrimaryColor-0'
                  />
                  <FaUser
                    size={'14'}
                    className='absolute text-PrimaryColor-0 top-1/2 -translate-y-1/2 right-5'
                  />
                </div>
                <div className='relative inline-block'>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email*'
                    required
                    className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 font-light bg-transparent border border-Secondarycolor-0 border-opacity-45 rounded-xl py-2 px-6 h-[60px] w-full focus:outline-PrimaryColor-0'
                  />
                  <HiOutlineMailOpen
                    size={'16'}
                    className='absolute text-PrimaryColor-0 top-1/2 -translate-y-1/2 right-5'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <select
                  name='select'
                  id='select'
                  className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 font-light bg-transparent border border-Secondarycolor-0 border-opacity-45 rounded-xl py-2 px-6 h-[60px] w-full focus:outline-PrimaryColor-0'
                >
                  <option value='subject' className='text-HeadingColor-0'>
                    Subject
                  </option>
                  {doctor?.specialties?.map((spec) => (
                    <option key={spec.id} value={spec.slug} className='text-HeadingColor-0'>
                      {spec.name}
                    </option>
                  ))}
                </select>
                <div className='relative inline-block'>
                  <input
                    type='text'
                    name='number'
                    id='number'
                    placeholder='Phone Number*'
                    required
                    className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 font-light bg-transparent border border-Secondarycolor-0 border-opacity-45 rounded-xl py-2 px-6 h-[60px] w-full focus:outline-PrimaryColor-0'
                  />
                  <MdCall
                    size={'16'}
                    className='absolute text-PrimaryColor-0 top-1/2 -translate-y-1/2 right-5'
                  />
                </div>
              </div>
              <textarea
                name='message'
                id='message'
                placeholder='Message...'
                className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 font-light bg-transparent border border-Secondarycolor-0 border-opacity-45 rounded-2xl py-2 px-6 h-[150px] w-full focus:outline-PrimaryColor-0 resize-none'
              ></textarea>
              <div className='inline-block mt-2'>
                <button
                  type='submit'
                  className='primary-btn'
                >
                  Send Now
                  <GoArrowRight
                    size={'22'}
                    className='-rotate-45'
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamDetailsMain;
