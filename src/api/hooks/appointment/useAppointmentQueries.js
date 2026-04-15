import { useQuery } from '@tanstack/react-query';
import { appointmentService } from '@/api/services/appointmentService';

export const APPOINTMENT_KEYS = {
  all: ['appointments'],
  patientHistory: (patientId, params) => [...APPOINTMENT_KEYS.all, 'patientHistory', patientId, params],
};

export const usePatientAppointmentsQuery = (patientId, params, options = {}) => {
  return useQuery({
    queryKey: APPOINTMENT_KEYS.patientHistory(patientId, params),
    queryFn: () => appointmentService.getPatientAppointments(patientId, params),
    enabled: !!patientId,
    ...options,
  });
};
