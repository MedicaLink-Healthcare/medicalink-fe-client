import axiosClient from '../core/axiosClient';

export const blogService = {
  getBlogs: async (params) => {
    return axiosClient.get('/blogs/public', { params });
  },

  getBlogBySlug: async (slug) => {
    return axiosClient.get(`/blogs/public/${slug}`);
  },

  getBlogCategories: async () => {
    return axiosClient.get('/blogs/categories');
  },
};
