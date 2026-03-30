import axiosClient from '../core/axiosClient';

export const testimonialService = {
  getPublicTestimonials: (params = {}) =>
    axiosClient.get('/testimonials', { params }),
};
