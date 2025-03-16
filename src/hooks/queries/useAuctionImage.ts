import { getAuctionImage } from '@/remotes/auction';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAuctionImage = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['getAuctionImage', id],
    queryFn: () => getAuctionImage(id),
  });
};
