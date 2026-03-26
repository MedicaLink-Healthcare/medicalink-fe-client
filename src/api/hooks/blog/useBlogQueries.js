import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/api/services/blogService';

export const BLOG_KEYS = {
  all: ['blogs'],
  lists: () => [...BLOG_KEYS.all, 'list'],
  list: (filters) => [...BLOG_KEYS.lists(), { filters }],
  categories: () => [...BLOG_KEYS.all, 'categories'],
  details: () => [...BLOG_KEYS.all, 'detail'],
  detail: (slug) => [...BLOG_KEYS.details(), slug],
};

export const useBlogsQuery = (filters = {}) => {
  return useQuery({
    queryKey: BLOG_KEYS.list(filters),
    queryFn: () => blogService.getBlogs(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useBlogDetailQuery = (slug) => {
  return useQuery({
    queryKey: BLOG_KEYS.detail(slug),
    queryFn: () => blogService.getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBlogCategoriesQuery = () => {
  return useQuery({
    queryKey: BLOG_KEYS.categories(),
    queryFn: () => blogService.getBlogCategories(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
