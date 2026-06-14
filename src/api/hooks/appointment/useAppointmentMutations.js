import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@/api/services/appointmentService';
import { DOCTOR_KEYS } from '../doctor/useDoctorQueries';

export const useHoldSlotMutation = () => {
  return useMutation({
    mutationFn: (data) => appointmentService.holdSlot(data),
  });
};

export const useConfirmBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => appointmentService.confirmBooking(data),
    onSuccess: (data, variables) => {
      // Invalidate slots for the specific doctor and date if available
      if (variables.doctorId && variables.serviceDate) {
        queryClient.invalidateQueries({
          queryKey: DOCTOR_KEYS.slots(variables.doctorId, variables.serviceDate, variables.locationId || 'none'),
        });
      } else {
        // Fallback: invalidate all slots
        queryClient.invalidateQueries({
          queryKey: [...DOCTOR_KEYS.all, 'slots'],
        });
      }
    },
  });
};
