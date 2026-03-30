import { useQuery } from '@tanstack/react-query';
import { faqService } from '@/api/services/faqService';
import { testimonialService } from '@/api/services/testimonialService';

export const LANDING_CONTENT_KEYS = {
  faqs: ['landing', 'faqs'],
  testimonials: ['landing', 'testimonials'],
};

export const usePublicFaqsQuery = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [...LANDING_CONTENT_KEYS.faqs, params],
    queryFn: () => faqService.getPublicFaqs(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const usePublicTestimonialsQuery = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [...LANDING_CONTENT_KEYS.testimonials, params],
    queryFn: () => testimonialService.getPublicTestimonials(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
