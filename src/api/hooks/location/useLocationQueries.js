import { useQuery } from '@tanstack/react-query';
import { workLocationService } from '@/api/services/workLocationService';

export const LOCATION_KEYS = {
  all: ['work-locations'],
  list: (params) => [...LOCATION_KEYS.all, { params }],
};

export const useWorkLocationsQuery = (params = {}) => {
  return useQuery({
    queryKey: LOCATION_KEYS.list(params),
    queryFn: () => workLocationService.getWorkLocations(params),
    staleTime: 24 * 60 * 60 * 1000,
  });
};
