import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { GoArrowRight } from 'react-icons/go';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { MdCall } from 'react-icons/md';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DOCTOR_KEYS, useDoctorsQuery, useDoctorSlotsQuery } from '@/api/hooks/doctor/useDoctorQueries';
import { useWorkLocationsQuery } from '@/api/hooks/location/useLocationQueries';
import { useSpecialtiesQuery } from '@/api/hooks/specialty/useSpecialtyQueries';
import { appointmentService } from '@/api/services/appointmentService';
import { patientService } from '@/api/services/patientService';
import Loading from '@/Shared/Loading/Loading';

import axiosClient from '@/api/core/axiosClient';

const MiniCalendar = ({ selectedDate, onDateSelect, availableDaysOfWeek }) => {
  const [currentMonth, setCurrentMonth] = useState(() => moment(selectedDate || new Date()));

  // Allow calendar to change when external selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const d = moment(selectedDate);
      setCurrentMonth((prev) => {
        return (d.isValid() && d.month() !== prev.month()) ? d : prev;
      });
    }
  }, [selectedDate]);

  const prevMonth = useCallback(() => setCurrentMonth(prev => moment(prev).subtract(1, 'month')), []);
  const nextMonth = useCallback(() => setCurrentMonth(prev => moment(prev).add(1, 'month')), []);

  const days = useMemo(() => {
    const startDate = moment(currentMonth).startOf('month').startOf('isoWeek');
    const endDate = moment(currentMonth).endOf('month').endOf('isoWeek');
    const arr = [];
    let day = startDate;
    while (day <= endDate) {
      arr.push(day);
      day = moment(day).add(1, 'day');
    }
    return arr;
  }, [currentMonth]);

  return (
    <div className='w-full h-full rounded-[1.2rem] border border-Secondarycolor-0 border-opacity-45 bg-white/50 p-5 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <button type='button' onClick={prevMonth} className='rounded-full p-2 hover:bg-white/80 transition-colors'>
          <FaChevronLeft size={14} className='text-HeadingColor-0' />
        </button>
        <span className='font-AlbertSans font-semibold text-HeadingColor-0'>
          {currentMonth.format('MMMM YYYY')}
        </span>
        <button type='button' onClick={nextMonth} className='rounded-full p-2 hover:bg-white/80 transition-colors'>
          <FaChevronRight size={14} className='text-HeadingColor-0' />
        </button>
      </div>
      <div className='mb-2 grid grid-cols-7 gap-1 text-center font-AlbertSans text-xs font-semibold text-TextColor2-0'>
        <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
      </div>
      <div className='grid grid-cols-7 gap-1'>
        {days.map(d => {
          const isCurrentMonth = d.month() === currentMonth.month();
          const dateStr = d.format('YYYY-MM-DD');
          const isSelected = selectedDate === dateStr;
          const isPast = d.isBefore(moment(), 'day');
          const hasOfficeHours = !availableDaysOfWeek?.size || availableDaysOfWeek.has(d.isoWeekday());
          const isDisabled = isPast || !hasOfficeHours;
          return (
            <button
              key={dateStr}
              type='button'
              disabled={isDisabled}
              onClick={() => onDateSelect(dateStr)}
              className={`relative flex aspect-square items-center justify-center rounded-md font-AlbertSans text-sm transition-all ${
                !isCurrentMonth ? 'text-gray-300 font-light' : isDisabled ? 'text-gray-400 font-medium' : 'text-HeadingColor-0 font-medium'
              } ${
                isSelected
                  ? 'bg-PrimaryColor-0 text-white font-bold hover:bg-PrimaryColor-0/90 shadow'
                  : isDisabled
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:bg-PrimaryColor-0/10 cursor-pointer'
              }`}
            >
              <span className='z-10'>{d.date()}</span>
              {!isDisabled && hasOfficeHours && (
                <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-PrimaryColor-0'}`}></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

MiniCalendar.propTypes = {
  selectedDate: PropTypes.string,
  onDateSelect: PropTypes.func.isRequired,
  availableDaysOfWeek: PropTypes.instanceOf(Set),
};

function pickInnerPayload(res) {
  if (res == null) return null;
  if (res.data !== undefined) return res.data;
  return res;
}

/** Unwrap list from API body (axios client already returns `response.data`) */
function extractEntityList(payload) {
  if (payload == null) return [];
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
}

function todayISODate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// function workLocationEntries(doctor) {
//   const locs = doctor?.workLocations ?? [];
//   return locs
//     .map((w) => {
//       if (w && typeof w === 'object' && w.id) {
//         return { id: w.id, label: w.name || w.address || w.id };
//       }
//       return null;
//     })
//     .filter(Boolean);
// }

// function doctorMatchesFilters(doctor, locationId, specialtyId) {
//   if (specialtyId) {
//     const specs = doctor?.specialties ?? [];
//     if (!specs.some((s) => s.id === specialtyId)) return false;
//   }
//   if (locationId) {
//     const ids = workLocationEntries(doctor).map((x) => x.id);
//     if (ids.length === 0) return true;
//     if (!ids.includes(locationId)) return false;
//   }
//   return true;
// }

const STEPS = [
  { id: 1, title: 'Doctor & Specialty', subtitle: 'Choose your preferred doctor and specialty' },
  { id: 2, title: 'Your Information', subtitle: 'Enter your information or retrieve old data' },
  { id: 3, title: 'Confirmation', subtitle: 'Review and confirm booking' },
];

const AppointmentBooking = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { data: doctorListData, isLoading: loadingDoctors } = useDoctorsQuery({
    limit: 100,
  });
  const doctors = useMemo(() => doctorListData?.items ?? [], [doctorListData?.items]);

  const { data: locationsRes, isError: locationsError } =
    useWorkLocationsQuery({ page: 1, limit: 100 });
  const { data: specialtiesRes, isLoading: loadingSpecialties, isError: specialtiesError } =
    useSpecialtiesQuery({ page: 1, limit: 100 });

  const locations = useMemo(() => extractEntityList(locationsRes), [locationsRes]);
  const specialties = useMemo(() => extractEntityList(specialtiesRes), [specialtiesRes]);

  const [step, setStep] = useState(1);
  const [bookingMode, setBookingMode] = useState('doctor-first');

  const [locationId, setLocationId] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');
  const [doctorId, setDoctorId] = useState('');

  const [serviceDate, setServiceDate] = useState(todayISODate);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventId, setEventId] = useState(null);

  const doctorIdFromUrl = searchParams.get('doctorId');
  useEffect(() => {
    if (!doctorIdFromUrl) return;
    setBookingMode('doctor-first');
    setDoctorId(doctorIdFromUrl);
  }, [doctorIdFromUrl]);

  const [patientType, setPatientType] = useState('new');
  const [searchIdentifier, setSearchIdentifier] = useState('');
  const [foundPatient, setFoundPatient] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const selectedDoctor = useMemo(
    () => doctors.find((d) => d.id === doctorId),
    [doctors, doctorId]
  );

  // const doctorLocationOptions = useMemo(
  //   () => (selectedDoctor ? workLocationEntries(selectedDoctor) : []),
  //   [selectedDoctor]
  // );

  const filteredDoctors = useMemo(() => {
    if (bookingMode === 'doctor-first') return doctors;
    if (!specialtyId) return doctors;
    return doctors.filter((d) => d.specialties?.some((s) => s.id === specialtyId));
  }, [doctors, specialtyId, bookingMode]);

  useEffect(() => {
    if (bookingMode !== 'doctor-first' || !selectedDoctor) return;
    const specs = selectedDoctor.specialties ?? [];
    if (specs[0]?.id && !specialtyId) setSpecialtyId(specs[0].id);
  }, [doctorId, selectedDoctor, specialtyId, bookingMode]);

  useEffect(() => {
    setSelectedSlot(null);
    setEventId(null);
    setFormError('');
    setFormSuccess('');
  }, [doctorId, serviceDate, locationId]);

  useEffect(() => {
    if (bookingMode === 'specialty-first' && doctorId && specialtyId) {
      const stillOk = filteredDoctors.some((d) => d.id === doctorId);
      if (!stillOk) setDoctorId('');
    }
  }, [filteredDoctors, doctorId, specialtyId, bookingMode]);

  useEffect(() => {
    if (locations.length > 0 && !locationId) {
      setLocationId(locations[0].id);
    }
  }, [locations, locationId]);

  const effectiveLocationId = locationId;

  const {
    data: slots = [],
    isLoading: loadingSlots,
    isError: slotsError,
    error: slotsErr,
  } = useDoctorSlotsQuery(doctorId, serviceDate, effectiveLocationId, {
    enabled: !!doctorId && !!serviceDate && !!effectiveLocationId,
  });

  const { data: publicOfficeHoursData } = useQuery({
    queryKey: ['public-office-hours', doctorId, effectiveLocationId],
    queryFn: async () => {
      if (!doctorId || !effectiveLocationId) return [];
      const res = await axiosClient.get('/office-hours/public', {
        params: { doctorId, workLocationId: effectiveLocationId },
      });
      return res.data;
    },
    enabled: !!doctorId && !!effectiveLocationId,
    staleTime: 5 * 60 * 1000,
  });

  const availableDaysOfWeek = useMemo(() => {
    if (!publicOfficeHoursData || !Array.isArray(publicOfficeHoursData)) return new Set();
    return new Set(publicOfficeHoursData.map((oh) => oh.dayOfWeek));
  }, [publicOfficeHoursData]);

  const holdMutation = useMutation({
    mutationFn: (body) => appointmentService.holdSlot(body),
  });

  const confirmMutation = useMutation({
    mutationFn: (body) => appointmentService.confirmBooking(body),
  });

  const handlePickSlot = useCallback(
    async (slot) => {
      if (!selectedDoctor || !effectiveLocationId) return;
      setFormError('');
      setFormSuccess('');
      setSelectedSlot(slot);
      setEventId(null);
      try {
        const raw = await holdMutation.mutateAsync({
          doctorId: selectedDoctor.id,
          locationId: effectiveLocationId,
          serviceDate,
          timeStart: slot.timeStart,
          timeEnd: slot.timeEnd,
        });
        const ev = pickInnerPayload(raw);
        const id = ev?.id;
        if (!id) throw new Error('Hold did not return event id');
        setEventId(id);
      } catch (e) {
        setFormError(
          e?.message ||
            'Could not reserve this time slot. It may have been taken. Pick another.'
        );
        setSelectedSlot(null);
        queryClient.invalidateQueries({ queryKey: DOCTOR_KEYS.slots(selectedDoctor.id, serviceDate, effectiveLocationId) });
      }
    },
    [selectedDoctor, effectiveLocationId, serviceDate, holdMutation, queryClient]
  );

  const handleClearStep1 = () => {
    setLocationId('');
    setSpecialtyId('');
    setDoctorId('');
    setSelectedSlot(null);
    setEventId(null);
    setFormError('');
  };

  const canContinueToPatient = Boolean(
    eventId && doctorId && effectiveLocationId && specialtyId
  );

  const canContinueToConfirm =
    patientType === 'returning'
      ? Boolean(foundPatient?.id && reason.trim())
      : Boolean(fullName.trim() && phone.trim() && reason.trim());

  const handleSearchPatient = async () => {
    if (!searchIdentifier.trim()) {
      setFormError('Please enter email or phone.');
      return;
    }
    setIsSearching(true);
    setFormError('');
    setFoundPatient(null);
    try {
      const isEmail = searchIdentifier.includes('@');
      const params = isEmail ? { email: searchIdentifier.trim() } : { phone: searchIdentifier.trim() };
      const searchRaw = await patientService.searchPatient(params);
      const found = pickInnerPayload(searchRaw);
      if (found?.id) {
        setFoundPatient(found);
        setFullName(found.fullName);
        setPhone(found.phone);
        setEmail(found.email || '');
      } else {
        setFormError('Patient record not found. Please try again or register as a New Patient.');
      }
    } catch (e) {
      setFormError('Error finding patient record. ' + (e?.response?.data?.message || e.message));
    } finally {
      setIsSearching(false);
    }
  };

  // const selectedLocationLabel = useMemo(() => {
  //   const loc = locations.find((l) => l.id === effectiveLocationId);
  //   return loc?.name || loc?.address || effectiveLocationId || '—';
  // }, [locations, effectiveLocationId]);

  const selectedSpecialtyLabel = useMemo(() => {
    const s = specialties.find((x) => x.id === specialtyId);
    return s?.name || '—';
  }, [specialties, specialtyId]);

  const handleBook = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!eventId) {
      setFormError('Please complete step 1 and hold a time slot.');
      return;
    }
    if (!specialtyId) {
      setFormError('Please select a specialty.');
      return;
    }
    if (patientType === 'new' && (!fullName.trim() || !phone.trim() || !reason.trim())) {
      setFormError('Full name, phone, and reason are required.');
      return;
    }
    if (patientType === 'returning' && (!foundPatient?.id || !reason.trim())) {
      setFormError('Please find your record and provide a reason.');
      return;
    }

    try {
      let patientId;
      if (patientType === 'returning') {
        patientId = foundPatient.id;
      } else {
        const searchRaw = await patientService.searchPatient({
          phone: phone.trim(),
        });
        const found = pickInnerPayload(searchRaw);

        if (found?.id) {
          patientId = found.id;
        } else {
          const createRaw = await patientService.createPatient({
            fullName: fullName.trim(),
            phone: phone.trim(),
            ...(email.trim() ? { email: email.trim() } : {}),
          });
          const created = pickInnerPayload(createRaw);
          if (!created?.id) throw new Error('Could not create patient profile');
          patientId = created.id;
        }
      }

      let aiTriageData = undefined;
      try {
        const raw = sessionStorage.getItem('mediic:doctor-ai-finder:v1');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.cquData) {
            aiTriageData = parsed.cquData;
          }
        }
      } catch (err) {
        console.error(err);
      }

      const confirmRaw = await confirmMutation.mutateAsync({
        eventId,
        patientId,
        specialtyId,
        reason: reason.trim(),
        aiTriageData,
      });
      const appt = pickInnerPayload(confirmRaw);
      setFormSuccess(
        `Booking confirmed${appt?.id ? ` (reference: ${appt.id})` : ''}.`
      );
      
      // Invalidate both doctors list and specific slots query to refresh real-time availability
      queryClient.invalidateQueries({ queryKey: DOCTOR_KEYS.slots(selectedDoctor?.id, serviceDate, effectiveLocationId) });
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      
      setEventId(null);
      // Keep selected slot so it shows in the review, but we clear reason for next time
      setReason('');
      try {
        sessionStorage.removeItem('mediic:doctor-ai-finder:v1'); // clear triage data on success
      } catch (err) {
        console.error(err);
      }
      // Do NOT setStep(1) here so the user can see the success message in step 3
    } catch (err) {
      setFormError(
        err?.message ||
          err?.data?.message ||
          'Booking failed. The hold may have expired — choose a slot again.'
      );
    }
  };

  if (loadingDoctors) {
    return (
      <div className='flex justify-center py-20'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='space-y-10'>
      <div className='flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-between'>
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={`flex-1 rounded-2xl border px-4 py-3 ${
              step === s.id
                ? 'border-PrimaryColor-0 bg-PrimaryColor-0/10'
                : 'border-Secondarycolor-0 border-opacity-45 bg-white/20'
            }`}
          >
            <p className='font-AlbertSans text-PrimaryColor-0 text-xs font-semibold'>
              Step {s.id}
            </p>
            <p className='font-AlbertSans text-HeadingColor-0 text-sm font-semibold'>{s.title}</p>
            <p className='font-DMSans text-TextColor2-0 text-xs'>{s.subtitle}</p>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className='space-y-8 rounded-2xl border border-Secondarycolor-0 border-opacity-45 bg-white/30 p-6 md:p-10'>


          {specialtiesError ? (
            <p className='font-DMSans text-sm text-red-600'>
              Failed to load specialties. Please refresh the page.
            </p>
          ) : null}
          {locationsError ? (
            <p className='font-DMSans text-sm text-red-600'>
              Failed to load locations. Please refresh the page.
            </p>
          ) : null}

          <div className='flex items-center justify-between mb-2'>
            <h3 className='font-AlbertSans text-HeadingColor-0 text-lg font-semibold'>
              Choose specialty & doctor
            </h3>
            <button
              type='button'
              onClick={handleClearStep1}
              className='text-xs font-DMSans font-semibold text-PrimaryColor-0 hover:text-PrimaryColor-0/80 transition-colors underline underline-offset-2'
            >
              Clear choices
            </button>
          </div>

          <div className='mb-6 flex flex-wrap gap-6'>
            <label className='flex items-center gap-2 font-DMSans text-sm text-HeadingColor-0 cursor-pointer'>
              <input
                type='radio'
                name='bookingMode'
                value='doctor-first'
                checked={bookingMode === 'doctor-first'}
                onChange={() => {
                  setBookingMode('doctor-first');
                  handleClearStep1();
                }}
                className='accent-PrimaryColor-0'
              />
              Select doctor first
            </label>
            <label className='flex items-center gap-2 font-DMSans text-sm text-HeadingColor-0 cursor-pointer'>
              <input
                type='radio'
                name='bookingMode'
                value='specialty-first'
                checked={bookingMode === 'specialty-first'}
                onChange={() => {
                  setBookingMode('specialty-first');
                  handleClearStep1();
                }}
                className='accent-PrimaryColor-0'
              />
              Select specialty first
            </label>
          </div>

          {bookingMode === 'doctor-first' ? (
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
              <div>
                <label
                  htmlFor='book-doctor'
                  className='mb-2 block font-AlbertSans text-sm font-medium text-HeadingColor-0'
                >
                  Select doctor
                </label>
                <select
                  id='book-doctor'
                  value={doctorId}
                  onChange={(ev) => setDoctorId(ev.target.value)}
                  className='font-AlbertSans text-HeadingColor-0 h-[52px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent px-4 focus:outline-PrimaryColor-0'
                >
                  <option value=''>Select a doctor</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor='book-specialty'
                  className='mb-2 block font-AlbertSans text-sm font-medium text-HeadingColor-0'
                >
                  Select specialty
                </label>
                <select
                  id='book-specialty'
                  value={specialtyId}
                  onChange={(ev) => setSpecialtyId(ev.target.value)}
                  disabled={!selectedDoctor || loadingSpecialties}
                  className='font-AlbertSans text-HeadingColor-0 h-[52px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent px-4 focus:outline-PrimaryColor-0'
                >
                  <option value=''>Select specialty</option>
                  {(selectedDoctor?.specialties ?? []).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
              <div>
                <label
                  htmlFor='book-specialty'
                  className='mb-2 block font-AlbertSans text-sm font-medium text-HeadingColor-0'
                >
                  Select specialty
                </label>
                <select
                  id='book-specialty'
                  value={specialtyId}
                  onChange={(ev) => {
                    setSpecialtyId(ev.target.value);
                    setDoctorId('');
                  }}
                  disabled={loadingSpecialties}
                  className='font-AlbertSans text-HeadingColor-0 h-[52px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent px-4 focus:outline-PrimaryColor-0'
                >
                  <option value=''>All specialties</option>
                  {specialties.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor='book-doctor'
                  className='mb-2 block font-AlbertSans text-sm font-medium text-HeadingColor-0'
                >
                  Select doctor
                </label>
                <select
                  id='book-doctor'
                  value={doctorId}
                  onChange={(ev) => setDoctorId(ev.target.value)}
                  disabled={!specialtyId}
                  className='font-AlbertSans text-HeadingColor-0 h-[52px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent px-4 focus:outline-PrimaryColor-0'
                >
                  <option value=''>Select a doctor</option>
                  {filteredDoctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.fullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {!effectiveLocationId && selectedDoctor && locations.length === 0 && (
            <p className='font-DMSans text-sm text-amber-700'>
              Loading location...
            </p>
          )}

          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
            <div className='w-full flex flex-col'>
              <h4 className='font-AlbertSans text-HeadingColor-0 mb-4 text-base font-semibold'>
                Select appointment date
              </h4>
              <div className='w-full flex-1'>
                <MiniCalendar selectedDate={serviceDate} onDateSelect={setServiceDate} availableDaysOfWeek={availableDaysOfWeek} />
              </div>
            </div>

            <div className='w-full flex flex-col'>
              <h4 className='font-AlbertSans text-HeadingColor-0 mb-4 text-base font-semibold'>
                Available time slots
              </h4>
              <div className='w-full flex-1 rounded-[1.2rem] border border-Secondarycolor-0 border-opacity-45 bg-white/50 p-5 shadow-sm'>
              {!doctorId || !serviceDate || !effectiveLocationId ? (
                <div className='rounded-xl border border-dashed border-Secondarycolor-0 border-opacity-45 p-6 text-center text-sm font-DMSans text-TextColor2-0'>
                  Please choose a doctor and location first.
                </div>
              ) : loadingSlots ? (
                <div className='flex justify-center py-8'>
                  <Loading />
                </div>
              ) : slotsError ? (
                <p className='font-DMSans text-sm text-red-600'>
                  {slotsErr?.message || 'Failed to load availability.'}
                </p>
              ) : slots.length === 0 ? (
                 <div className='rounded-xl border border-dashed border-Secondarycolor-0 border-opacity-45 p-6 text-center text-sm font-DMSans text-TextColor2-0'>
                  No open slots for this date. Try another day.
                </div>
              ) : (
                <>
                  {(() => {
                    const morningSlots = slots.filter(s => parseInt(s.timeStart.split(':')[0], 10) < 12);
                    const afternoonSlots = slots.filter(s => parseInt(s.timeStart.split(':')[0], 10) >= 12);

                    const renderSlot = (s, idx) => {
                      const active =
                        selectedSlot?.timeStart === s.timeStart &&
                        selectedSlot?.timeEnd === s.timeEnd;
                      return (
                        <button
                          key={`${s.timeStart}-${s.timeEnd}-${idx}`}
                          type='button'
                          disabled={holdMutation.isPending}
                          onClick={() => handlePickSlot(s)}
                          className={`flex flex-col items-center justify-center rounded-xl border p-2 font-AlbertSans transition-all ${
                            active
                              ? 'border-PrimaryColor-0 bg-PrimaryColor-0 text-white shadow-md'
                              : 'border-Secondarycolor-0 border-opacity-45 bg-white/50 text-HeadingColor-0 hover:border-PrimaryColor-0 hover:bg-PrimaryColor-0/10'
                          }`}
                        >
                          <span className='font-semibold text-sm'>{s.timeStart}</span>
                          <span className='text-[10px] opacity-80'>to {s.timeEnd}</span>
                        </button>
                      );
                    };

                    return (
                      <div className='overflow-y-auto max-h-[320px] p-1 pr-2 space-y-4'>
                        {morningSlots.length > 0 && (
                          <div>
                            <h5 className='text-xs font-semibold text-HeadingColor-0 mb-2 flex items-center gap-1'>
                              <span className='w-2 h-2 rounded-full bg-amber-400'></span>
                              Morning
                            </h5>
                            <div className='grid grid-cols-3 gap-2'>
                              {morningSlots.map(renderSlot)}
                            </div>
                          </div>
                        )}
                        {afternoonSlots.length > 0 && (
                          <div>
                            <h5 className='text-xs font-semibold text-HeadingColor-0 mb-2 mt-4 flex items-center gap-1'>
                              <span className='w-2 h-2 rounded-full bg-indigo-400'></span>
                              Afternoon & Evening
                            </h5>
                            <div className='grid grid-cols-3 gap-2'>
                              {afternoonSlots.map(renderSlot)}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                  <div className='mt-3 font-DMSans text-xs flex items-center justify-between'>
                    <span className='text-TextColor2-0'>{slots.length} available slots</span>
                    {selectedSlot && eventId && (
                      <span className='text-green-700 font-semibold'>Slot held! (expires in 10m)</span>
                    )}
                  </div>
                </>
              )}
              </div>
            </div>
          </div>

          {formError && step === 1 ? (
            <p className='font-DMSans text-sm text-red-600'>{formError}</p>
          ) : null}

          <div className='pt-2'>
            <button
              type='button'
              disabled={!canContinueToPatient}
              onClick={() => {
                setFormError('');
                setStep(2);
              }}
              className='primary-btn disabled:opacity-50'
            >
              Continue to Patient Information
              <GoArrowRight size={22} className='-rotate-45' />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className='rounded-2xl border border-Secondarycolor-0 border-opacity-45 bg-white/30 p-6 md:p-10'>
          <div className='mb-6 flex gap-6 border-b border-Secondarycolor-0/30'>
            <button
              onClick={() => { setPatientType('new'); setFormError(''); }}
              className={`font-AlbertSans pb-3 border-b-2 text-base transition-all ${patientType === 'new' ? 'border-PrimaryColor-0 text-PrimaryColor-0 font-bold' : 'border-transparent text-HeadingColor-0 hover:text-PrimaryColor-0 font-medium'}`}
            >
              New Patient
            </button>
            <button
              onClick={() => { setPatientType('returning'); setFormError(''); }}
              className={`font-AlbertSans pb-3 border-b-2 text-base transition-all ${patientType === 'returning' ? 'border-PrimaryColor-0 text-PrimaryColor-0 font-bold' : 'border-transparent text-HeadingColor-0 hover:text-PrimaryColor-0 font-medium'}`}
            >
              Returning Patient
            </button>
          </div>

          <h3 className='font-AlbertSans text-HeadingColor-0 mb-2 text-lg font-semibold'>
            {patientType === 'new' ? 'Your information' : 'Find your record'}
          </h3>
          <p className='font-DMSans text-TextColor2-0 mb-6 text-sm'>
            {patientType === 'new' 
              ? 'Please enter your information to register as a new patient.' 
              : 'Enter your email or phone number to retrieve your existing patient record.'}
          </p>
          <form
            className='flex flex-col gap-y-5'
            onSubmit={(e) => {
              e.preventDefault();
              if (!canContinueToConfirm) {
                setFormError('Please fill out all required fields.');
                return;
              }
              setFormError('');
              setStep(3);
            }}
          >
            {patientType === 'new' ? (
              <>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                  <div className='relative inline-block'>
                    <input
                      type='text'
                      placeholder='Full name*'
                      required
                      value={fullName}
                      onChange={(ev) => setFullName(ev.target.value)}
                      className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 h-[60px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent py-2 px-6 font-light focus:outline-PrimaryColor-0'
                    />
                    <FaUser
                      size={14}
                      className='absolute top-1/2 right-5 -translate-y-1/2 text-PrimaryColor-0'
                    />
                  </div>
                  <div className='relative inline-block'>
                    <input
                      type='email'
                      placeholder='Email (optional)'
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 h-[60px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent py-2 px-6 font-light focus:outline-PrimaryColor-0'
                    />
                    <HiOutlineMailOpen
                      size={16}
                      className='absolute top-1/2 right-5 -translate-y-1/2 text-PrimaryColor-0'
                    />
                  </div>
                </div>
                <div className='relative inline-block'>
                  <input
                    type='tel'
                    placeholder='Phone*'
                    required
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 h-[60px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent py-2 px-6 font-light focus:outline-PrimaryColor-0'
                  />
                  <MdCall
                    size={16}
                    className='absolute top-1/2 right-5 -translate-y-1/2 text-PrimaryColor-0'
                  />
                </div>
              </>
            ) : (
              <>
                <div className='flex gap-3'>
                  <div className='relative flex-1'>
                    <input
                      type='text'
                      placeholder='Email or Phone*'
                      value={searchIdentifier}
                      onChange={(ev) => setSearchIdentifier(ev.target.value)}
                      className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 h-[60px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent py-2 px-6 font-light focus:outline-PrimaryColor-0'
                    />
                  </div>
                  <button
                    type='button'
                    onClick={handleSearchPatient}
                    disabled={isSearching}
                    className='rounded-xl bg-PrimaryColor-0 px-6 font-AlbertSans font-medium text-white hover:bg-PrimaryColor-0/90 transition-colors disabled:opacity-50 h-[60px]'
                  >
                    {isSearching ? 'Searching...' : 'Find My Record'}
                  </button>
                </div>
                {foundPatient && (
                  <div className='rounded-xl bg-green-50/50 p-4 border border-green-200 mt-2'>
                    <h4 className='font-AlbertSans font-semibold text-green-800 mb-1'>Patient found</h4>
                    <p className='font-DMSans text-sm text-green-700'>
                      <strong>Name:</strong> {foundPatient.fullName} <br/>
                      <strong>Phone:</strong> {foundPatient.phone} <br/>
                      {foundPatient.email && <><strong>Email:</strong> {foundPatient.email}</>}
                    </p>
                  </div>
                )}
              </>
            )}

            {(patientType === 'new' || foundPatient) && (
              <textarea
                placeholder='Reason for visit*'
                required
                maxLength={255}
                value={reason}
                onChange={(ev) => setReason(ev.target.value)}
                className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 h-[120px] w-full resize-none rounded-2xl border border-Secondarycolor-0 border-opacity-45 bg-transparent py-2 px-6 font-light focus:outline-PrimaryColor-0'
              />
            )}

            {formError && <p className='font-DMSans text-sm text-red-600'>{formError}</p>}
            <div className='flex flex-wrap gap-3 mt-2'>
              <button
                type='button'
                onClick={() => setStep(1)}
                className='rounded-xl border border-Secondarycolor-0 border-opacity-45 px-5 py-2 font-AlbertSans text-sm hover:bg-black/5 transition-colors'
              >
                Back
              </button>
              <button 
                type='submit' 
                disabled={!canContinueToConfirm}
                className='primary-btn disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Continue to confirmation
                <GoArrowRight size={22} className='-rotate-45' />
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className='rounded-2xl border border-Secondarycolor-0 border-opacity-45 bg-white/30 p-6 md:p-10'>
          <h3 className='font-AlbertSans text-HeadingColor-0 mb-4 text-lg font-semibold'>
            Review your booking
          </h3>
          <ul className='font-DMSans text-TextColor2-0 space-y-2 text-sm'>
            <li>
              <strong className='text-HeadingColor-0'>Doctor:</strong> {selectedDoctor?.fullName}
            </li>
            {/* Removed location list item */}
            <li>
              <strong className='text-HeadingColor-0'>Specialty:</strong> {selectedSpecialtyLabel}
            </li>
            <li>
              <strong className='text-HeadingColor-0'>Date:</strong> {serviceDate}
            </li>
            <li>
              <strong className='text-HeadingColor-0'>Time:</strong>{' '}
              {selectedSlot ? `${selectedSlot.timeStart} – ${selectedSlot.timeEnd}` : '—'}
            </li>
            <li>
              <strong className='text-HeadingColor-0'>Patient:</strong> {fullName} · {phone}
            </li>
            <li>
              <strong className='text-HeadingColor-0'>Reason:</strong> {reason}
            </li>
          </ul>

          {formError && <p className='mt-4 font-DMSans text-sm text-red-600'>{formError}</p>}
          {formSuccess && (
            <p className='mt-4 font-DMSans text-sm text-green-700'>{formSuccess}</p>
          )}

          <div className='mt-8 flex flex-wrap gap-3'>
            {!formSuccess ? (
              <>
                <button
                  type='button'
                  onClick={() => setStep(2)}
                  className='rounded-xl border border-Secondarycolor-0 border-opacity-45 px-5 py-2 font-AlbertSans text-sm'
                >
                  Back
                </button>
                <button
                  type='button'
                  onClick={handleBook}
                  disabled={confirmMutation.isPending || !eventId}
                  className='primary-btn disabled:opacity-50'
                >
                  {confirmMutation.isPending ? 'Booking…' : 'Confirm appointment'}
                  <GoArrowRight size={22} className='-rotate-45' />
                </button>
              </>
            ) : (
              <button
                type='button'
                onClick={() => {
                  setStep(1);
                  setFormSuccess('');
                  setSelectedSlot(null);
                  setFullName('');
                  setPhone('');
                  setEmail('');
                  setFoundPatient(null);
                  setPatientType('new');
                }}
                className='primary-btn'
              >
                Book Another Appointment
                <GoArrowRight size={22} className='-rotate-45' />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
