import { useMutation } from '@tanstack/react-query';
import { reviewService } from '@/api/services/reviewService';

export const useCreateReviewMutation = () => {
  return useMutation({
    mutationFn: (data) => reviewService.createReview(data),
  });
};
