import { useMutation } from '@tanstack/react-query';
import { aiService } from '@/api/services/aiService';

export const AI_KEYS = {
  all: ['ai'],
};

export const useAIRecommendDoctorMutation = () => {
  return useMutation({
    mutationFn: (payload) => aiService.recommendDoctor(payload),
  });
};

export const useAISuggestSpecialtiesMutation = () => {
  return useMutation({
    mutationFn: (payload) => aiService.suggestSpecialties(payload),
  });
};

export const useAIChatMutation = () => {
  return useMutation({
    mutationFn: (message) => aiService.chat(message),
  });
};
