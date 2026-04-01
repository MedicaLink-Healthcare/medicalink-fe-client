import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaUser } from 'react-icons/fa6';
import { GoArrowRight } from 'react-icons/go';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { MdCall } from 'react-icons/md';
import { useDoctorsQuery, useDoctorSlotsQuery } from '@/api/hooks/doctor/useDoctorQueries';
import { useWorkLocationsQuery } from '@/api/hooks/location/useLocationQueries';
import { useSpecialtiesQuery } from '@/api/hooks/specialty/useSpecialtyQueries';
import { appointmentService } from '@/api/services/appointmentService';
import { patientService } from '@/api/services/patientService';
import Loading from '@/Shared/Loading/Loading';

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

function workLocationEntries(doctor) {
  const locs = doctor?.workLocations ?? [];
  return locs
    .map((w) => {
      if (w && typeof w === 'object' && w.id) {
        return { id: w.id, label: w.name || w.address || w.id };
      }
      return null;
    })
    .filter(Boolean);
}

function doctorMatchesFilters(doctor, locationId, specialtyId) {
  if (specialtyId) {
    const specs = doctor?.specialties ?? [];
    if (!specs.some((s) => s.id === specialtyId)) return false;
  }
  if (locationId) {
    const ids = workLocationEntries(doctor).map((x) => x.id);
    if (ids.length === 0) return true;
    if (!ids.includes(locationId)) return false;
  }
  return true;
}

const STEPS = [
  { id: 1, title: 'Location & Doctor', subtitle: 'Choose your preferred doctor and location' },
  { id: 2, title: 'Your Information', subtitle: 'Enter your information or retrieve old data' },
  { id: 3, title: 'Confirmation', subtitle: 'Review and confirm booking' },
];

const AppointmentBooking = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { data: doctorListData, isLoading: loadingDoctors } = useDoctorsQuery({
    limit: 100,
  });
  const doctors = doctorListData?.items ?? [];

  const { data: locationsRes, isLoading: loadingLocations, isError: locationsError } =
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

  const doctorLocationOptions = useMemo(
    () => (selectedDoctor ? workLocationEntries(selectedDoctor) : []),
    [selectedDoctor]
  );

  const filteredDoctors = useMemo(() => {
    if (bookingMode !== 'filters-first') return doctors;
    return doctors.filter((d) => doctorMatchesFilters(d, locationId, specialtyId));
  }, [doctors, bookingMode, locationId, specialtyId]);

  useEffect(() => {
    if (bookingMode !== 'doctor-first' || !selectedDoctor) return;
    const specs = selectedDoctor.specialties ?? [];
    if (specs[0]?.id) setSpecialtyId(specs[0].id);
    const entries = workLocationEntries(selectedDoctor);
    if (entries.length === 1) {
      setLocationId(entries[0].id);
    } else if (entries.length > 0) {
      setLocationId((prev) => (prev && entries.some((e) => e.id === prev) ? prev : entries[0].id));
    }
  }, [bookingMode, doctorId, selectedDoctor]);

  useEffect(() => {
    setSelectedSlot(null);
    setEventId(null);
    setFormError('');
    setFormSuccess('');
  }, [doctorId, serviceDate, locationId]);

  useEffect(() => {
    if (bookingMode === 'filters-first' && doctorId) {
      const stillOk = filteredDoctors.some((d) => d.id === doctorId);
      if (!stillOk) setDoctorId('');
    }
  }, [bookingMode, filteredDoctors, doctorId]);

  const effectiveLocationId = locationId;

  const {
    data: slots = [],
    isLoading: loadingSlots,
    isError: slotsError,
    error: slotsErr,
  } = useDoctorSlotsQuery(doctorId, serviceDate, effectiveLocationId, {
    enabled: !!doctorId && !!serviceDate && !!effectiveLocationId,
  });

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
      }
    },
    [selectedDoctor, effectiveLocationId, serviceDate, holdMutation]
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
    fullName.trim() && phone.trim() && reason.trim();

  const selectedLocationLabel = useMemo(() => {
    const loc = locations.find((l) => l.id === effectiveLocationId);
    return loc?.name || loc?.address || effectiveLocationId || '—';
  }, [locations, effectiveLocationId]);

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
    if (!fullName.trim() || !phone.trim() || !reason.trim()) {
      setFormError('Full name, phone, and reason are required.');
      return;
    }

    try {
      let patientId;
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

      const confirmRaw = await confirmMutation.mutateAsync({
        eventId,
        patientId,
        specialtyId,
        reason: reason.trim(),
      });
      const appt = pickInnerPayload(confirmRaw);
      setFormSuccess(
        `Booking confirmed${appt?.id ? ` (reference: ${appt.id})` : ''}.`
      );
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      setEventId(null);
      setSelectedSlot(null);
      setReason('');
      setStep(1);
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
          <div>
            <h3 className='font-AlbertSans text-HeadingColor-0 mb-2 text-lg font-semibold'>
              Choose your booking method
            </h3>
            <p className='font-DMSans text-TextColor2-0 mb-4 text-sm'>
              Select a doctor first to auto-fill location and specialty, or choose location and
              specialty first to filter doctors.
            </p>
            <div className='flex flex-col gap-3 sm:flex-row'>
              <label className='font-DMSans flex cursor-pointer items-center gap-2 text-sm'>
                <input
                  type='radio'
                  name='booking-mode'
                  checked={bookingMode === 'doctor-first'}
                  onChange={() => {
                    setBookingMode('doctor-first');
                    handleClearStep1();
                  }}
                />
                Doctor first
              </label>
              <label className='font-DMSans flex cursor-pointer items-center gap-2 text-sm'>
                <input
                  type='radio'
                  name='booking-mode'
                  checked={bookingMode === 'filters-first'}
                  onChange={() => {
                    setBookingMode('filters-first');
                    setDoctorId('');
                    setSelectedSlot(null);
                    setEventId(null);
                  }}
                />
                Location &amp; specialty first
              </label>
            </div>
          </div>

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

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            {bookingMode === 'doctor-first' ? (
              <>
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
                    htmlFor='book-specialty-df'
                    className='mb-2 block font-AlbertSans text-sm font-medium text-HeadingColor-0'
                  >
                    Select specialty
                  </label>
                  <select
                    id='book-specialty-df'
                    value={specialtyId}
                    onChange={(ev) => setSpecialtyId(ev.target.value)}
                    disabled={loadingSpecialties || !selectedDoctor}
                    className='font-AlbertSans text-HeadingColor-0 h-[52px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent px-4 focus:outline-PrimaryColor-0'
                  >
                    <option value=''>Select specialty</option>
                    {(selectedDoctor?.specialties?.length
                      ? selectedDoctor.specialties
                      : specialties
                    ).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='book-location-df'
                    className='mb-2 block font-AlbertSans text-sm font-medium text-HeadingColor-0'
                  >
                    Select location
                  </label>
                  <select
                    id='book-location-df'
                    value={locationId}
                    onChange={(ev) => setLocationId(ev.target.value)}
                    disabled={loadingLocations || !selectedDoctor}
                    className='font-AlbertSans text-HeadingColor-0 h-[52px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent px-4 focus:outline-PrimaryColor-0'
                  >
                    <option value=''>Select location</option>
                    {doctorLocationOptions.length > 0
                      ? doctorLocationOptions.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.label}
                          </option>
                        ))
                      : locations.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.name || loc.address || loc.id}
                          </option>
                        ))}
                  </select>
                  {!selectedDoctor ? (
                    <p className='font-DMSans text-TextColor2-0 mt-1 text-xs'>
                      Choose a doctor first — we will suggest a site or list all public locations.
                    </p>
                  ) : doctorLocationOptions.length === 0 ? (
                    <p className='font-DMSans text-TextColor2-0 mt-1 text-xs'>
                      This profile has no linked sites — pick any location for scheduling.
                    </p>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <div>
                  <label
                    htmlFor='book-location'
                    className='mb-2 block font-AlbertSans text-sm font-medium text-HeadingColor-0'
                  >
                    Select location
                  </label>
                  <select
                    id='book-location'
                    value={locationId}
                    onChange={(ev) => setLocationId(ev.target.value)}
                    disabled={loadingLocations}
                    className='font-AlbertSans text-HeadingColor-0 h-[52px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent px-4 focus:outline-PrimaryColor-0'
                  >
                    <option value=''>Select location</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name || loc.address || loc.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='book-specialty-filter'
                    className='mb-2 block font-AlbertSans text-sm font-medium text-HeadingColor-0'
                  >
                    Select specialty
                  </label>
                  <select
                    id='book-specialty-filter'
                    value={specialtyId}
                    onChange={(ev) => setSpecialtyId(ev.target.value)}
                    disabled={loadingSpecialties}
                    className='font-AlbertSans text-HeadingColor-0 h-[52px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent px-4 focus:outline-PrimaryColor-0'
                  >
                    <option value=''>Select specialty</option>
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
              </>
            )}
          </div>

          <div className='flex flex-wrap gap-3'>
            <button
              type='button'
              onClick={handleClearStep1}
              className='rounded-xl border border-Secondarycolor-0 border-opacity-45 px-5 py-2 font-AlbertSans text-sm text-HeadingColor-0 hover:bg-white/40'
            >
              Clear
            </button>
          </div>

          {!effectiveLocationId && selectedDoctor && (
            <p className='font-DMSans text-sm text-amber-700'>
              Choose a location to load available time slots.
            </p>
          )}

          <div className='mt-6'>
            <h4 className='font-AlbertSans text-HeadingColor-0 mb-3 text-base font-semibold'>
              Available times
            </h4>
            <div className='mb-4 max-w-xs'>
              <label
                htmlFor='slot-service-date'
                className='mb-1 block font-AlbertSans text-xs font-medium text-TextColor2-0'
              >
                Date for availability
              </label>
              <input
                id='slot-service-date'
                type='date'
                min={todayISODate()}
                value={serviceDate}
                onChange={(ev) => setServiceDate(ev.target.value)}
                className='font-AlbertSans text-HeadingColor-0 h-[44px] w-full rounded-xl border border-Secondarycolor-0 border-opacity-45 bg-transparent px-3 text-sm focus:outline-PrimaryColor-0'
              />
            </div>
            {!doctorId || !serviceDate || !effectiveLocationId ? (
              <p className='text-muted-foreground font-DMSans text-sm'>
                Choose a doctor, location, and date to load open slots.
              </p>
            ) : loadingSlots ? (
              <div className='flex justify-center py-8'>
                <Loading />
              </div>
            ) : slotsError ? (
              <p className='font-DMSans text-sm text-red-600'>
                {slotsErr?.message || 'Failed to load availability.'}
              </p>
            ) : slots.length === 0 ? (
              <p className='font-DMSans text-sm text-TextColor2-0'>
                No open slots for this date. Try another day.
              </p>
            ) : (
              <div className='flex flex-wrap gap-2'>
                {slots.map((s, idx) => {
                  const active =
                    selectedSlot?.timeStart === s.timeStart &&
                    selectedSlot?.timeEnd === s.timeEnd;
                  return (
                    <button
                      key={`${s.timeStart}-${s.timeEnd}-${idx}`}
                      type='button'
                      disabled={holdMutation.isPending}
                      onClick={() => handlePickSlot(s)}
                      className={`rounded-xl border px-4 py-2 font-AlbertSans text-sm transition-colors ${
                        active
                          ? 'border-PrimaryColor-0 bg-PrimaryColor-0 text-white'
                          : 'border-Secondarycolor-0 border-opacity-45 bg-white/50 text-HeadingColor-0 hover:border-PrimaryColor-0'
                      }`}
                    >
                      {s.timeStart} – {s.timeEnd}
                    </button>
                  );
                })}
              </div>
            )}
            {selectedSlot && eventId && (
              <p className='mt-3 font-DMSans text-sm text-green-700'>
                Slot held — complete the next steps within 10 minutes.
              </p>
            )}
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
          <h3 className='font-AlbertSans text-HeadingColor-0 mb-2 text-lg font-semibold'>
            Your information
          </h3>
          <p className='font-DMSans text-TextColor2-0 mb-6 text-sm'>
            We look up your record by phone. If you are new, we create a minimal profile before
            confirming the visit.
          </p>
          <form
            className='flex flex-col gap-y-5'
            onSubmit={(e) => {
              e.preventDefault();
              if (!canContinueToConfirm) {
                setFormError('Full name, phone, and reason are required.');
                return;
              }
              setFormError('');
              setStep(3);
            }}
          >
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
                placeholder='Phone* (used to find your record)'
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
            <textarea
              placeholder='Reason for visit*'
              required
              value={reason}
              onChange={(ev) => setReason(ev.target.value)}
              className='font-AlbertSans text-HeadingColor-0 placeholder:text-HeadingColor-0 h-[120px] w-full resize-none rounded-2xl border border-Secondarycolor-0 border-opacity-45 bg-transparent py-2 px-6 font-light focus:outline-PrimaryColor-0'
            />
            {formError && <p className='font-DMSans text-sm text-red-600'>{formError}</p>}
            <div className='flex flex-wrap gap-3'>
              <button
                type='button'
                onClick={() => setStep(1)}
                className='rounded-xl border border-Secondarycolor-0 border-opacity-45 px-5 py-2 font-AlbertSans text-sm'
              >
                Back
              </button>
              <button type='submit' className='primary-btn'>
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
            <li>
              <strong className='text-HeadingColor-0'>Location:</strong> {selectedLocationLabel}
            </li>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
