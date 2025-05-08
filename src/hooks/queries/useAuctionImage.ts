import { getAuctionImage } from '@/remotes/auction';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useSuspenseAuctionImage = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['getAuctionImage', id],
    queryFn: () => getAuctionImage(id),
  });
};

export const useAuctionImage = (id: string) => {
  return useQuery({
    queryKey: ['getAuctionImage', id],
    queryFn: () => getAuctionImage(id),
  });
};
