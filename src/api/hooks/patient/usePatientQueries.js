import { useQuery, useMutation } from '@tanstack/react-query';
import { patientService } from '@/api/services/patientService';

export const PATIENT_KEYS = {
  all: ['patients'],
  search: (params) => [...PATIENT_KEYS.all, 'search', params],
};

export const usePatientSearchQuery = (params, options = {}) => {
  return useQuery({
    queryKey: PATIENT_KEYS.search(params),
    queryFn: () => patientService.searchPatient(params),
    enabled: !!(params?.phone || params?.email),
    ...options,
  });
};

export const useCreatePatientMutation = () => {
  return useMutation({
    mutationFn: (data) => patientService.createPatient(data),
  });
};
