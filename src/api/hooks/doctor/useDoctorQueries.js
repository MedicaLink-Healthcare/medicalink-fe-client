import { useQuery } from '@tanstack/react-query';
import { doctorService } from '@/api/services/doctorService';

export const DOCTOR_KEYS = {
  all: ['doctors'],
  lists: () => [...DOCTOR_KEYS.all, 'list'],
  list: (filters) => [...DOCTOR_KEYS.lists(), { filters }],
  details: () => [...DOCTOR_KEYS.all, 'detail'],
  detail: (id) => [...DOCTOR_KEYS.details(), id],
  slots: (doctorId, serviceDate, locationId) =>
    [...DOCTOR_KEYS.all, 'slots', doctorId, serviceDate, locationId],
};

/**
 * API trả `{ data: Doctor[] | { data: Doctor[] }, meta? }` sau interceptor axios.
 * Luôn normalize thành `{ items, meta }` để trang không nhầm `data` đã là mảng.
 */
function selectDoctorListEnvelope(res) {
  if (!res) return { items: [], meta: null };
  const inner = res.data;
  let items = [];
  if (inner && Array.isArray(inner.data)) items = inner.data;
  else if (Array.isArray(inner)) items = inner;
  const meta = res.meta && typeof res.meta === 'object' ? res.meta : null;
  return { items, meta };
}

function selectSlotsEnvelope(res) {
  if (!res) return [];
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
}

export const useDoctorsQuery = (filters = {}) => {
  return useQuery({
    queryKey: DOCTOR_KEYS.list(filters),
    queryFn: () => doctorService.getDoctors(filters),
    select: selectDoctorListEnvelope,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDoctorSlotsQuery = (doctorId, serviceDate, locationId, options = {}) => {
  const { enabled = true, ...rest } = options;
  return useQuery({
    queryKey: DOCTOR_KEYS.slots(doctorId, serviceDate, locationId || 'none'),
    queryFn: () =>
      doctorService.getAvailableSlots(doctorId, {
        serviceDate,
        ...(locationId ? { locationId } : {}),
      }),
    select: selectSlotsEnvelope,
    enabled:
      !!enabled &&
      !!doctorId &&
      !!serviceDate &&
      !!locationId,
    staleTime: 60 * 1000,
    ...rest,
  });
};


export const useDoctorDetailQuery = (id) => {
  return useQuery({
    queryKey: DOCTOR_KEYS.detail(id),
    queryFn: () => doctorService.getDoctorById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
