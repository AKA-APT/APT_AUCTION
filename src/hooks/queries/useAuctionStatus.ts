import { getAuctionStatus } from '@/remotes/auction';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAuctionStatus = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['getAuctionStatus', id],
    queryFn: () => getAuctionStatus(id),
  });
};
