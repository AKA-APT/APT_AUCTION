import { useSuspenseQuery } from '@tanstack/react-query';
import { getAddressByCoords } from '@/remotes/address';

export const useAddress = (latitude: number, longitude: number) => {
  return useSuspenseQuery({
    queryKey: ['getAddressByCoords', latitude, longitude],
    queryFn: () => getAddressByCoords(latitude, longitude),
  });
};
