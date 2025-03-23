import { getInvestmentTags } from '@/remotes/my-page';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useInvestmentTags = () => {
  return useSuspenseQuery({
    queryKey: ['getInvestmentTags'],
    queryFn: () => getInvestmentTags(),
  });
};
