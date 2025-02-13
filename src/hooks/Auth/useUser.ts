import { User } from '@/models/user';
import { getUser } from '@/remotes/user';
import { httpClient } from '@/utils/http-client';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

export function useUser() {
  return useSuspenseQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
}
