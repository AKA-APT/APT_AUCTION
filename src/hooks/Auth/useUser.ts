import { getUser } from '@/remotes/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useUser() {
  return useSuspenseQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
}
