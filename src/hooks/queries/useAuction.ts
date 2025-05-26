import { getAuction, getAuctionDetails } from '@/remotes/auction';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAuction = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['getAuction', id],
    queryFn: async () => {
      const [auction, details] = await Promise.all([
        getAuction(id),
        getAuctionDetails(id),
      ]);

      return { ...auction, ...details };
    },
  });
};
