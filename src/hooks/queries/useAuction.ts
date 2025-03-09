import { getAuction } from '@/remotes/auction';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAuction = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['getAuction', id],
    queryFn: () => getAuction(id),
  });
};
