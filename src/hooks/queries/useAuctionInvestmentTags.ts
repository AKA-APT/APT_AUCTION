import { getAuctionInvestmentTags } from '@/remotes/auction';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAuctionInvestmentTags = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['getAuctionInvestmentTags', id],
    queryFn: () => getAuctionInvestmentTags(id),
  });
};
