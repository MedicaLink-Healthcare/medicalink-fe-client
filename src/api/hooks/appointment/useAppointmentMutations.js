import { useMutation } from '@tanstack/react-query';
import { appointmentService } from '@/api/services/appointmentService';

export const useHoldSlotMutation = () => {
  return useMutation({
    mutationFn: (data) => appointmentService.holdSlot(data),
  });
};

export const useConfirmBookingMutation = () => {
  return useMutation({
    mutationFn: (data) => appointmentService.confirmBooking(data),
  });
};
