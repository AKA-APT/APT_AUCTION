import { getMyTenders } from '@/remotes/my-page';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useMyTenders() {
  return useSuspenseQuery({
    queryKey: ['getMyTenders'],
    queryFn: getMyTenders,
  });
}
