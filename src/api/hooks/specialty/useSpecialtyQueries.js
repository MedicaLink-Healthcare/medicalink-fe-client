import { useQuery } from '@tanstack/react-query';
import { specialtyService } from '@/api/services/specialtyService';

export const SPECIALTY_KEYS = {
  all: ['specialties'],
  list: (params) => [...SPECIALTY_KEYS.all, { params }],
  detail: (id) => [...SPECIALTY_KEYS.all, id],
};

export const useSpecialtiesQuery = (params = {}) => {
  return useQuery({
    queryKey: SPECIALTY_KEYS.list(params),
    queryFn: () => specialtyService.getSpecialties(params),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export const useSpecialtyDetailQuery = (id) => {
  return useQuery({
    queryKey: SPECIALTY_KEYS.detail(id),
    queryFn: () => specialtyService.getSpecialtyById(id),
    enabled: !!id,
    staleTime: 24 * 60 * 60 * 1000,
  });
};
