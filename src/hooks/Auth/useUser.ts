import { User } from '@/models/user';
import { useSuspenseQuery } from '@tanstack/react-query';

const autoLogin = async () => {
  try {
    const response = await fetch('/api/oauth/session-check', {
      credentials: 'include',
    });

    if (response.ok) {
      return (await response.json()) as User;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export function useUser() {
  return useSuspenseQuery({
    queryKey: ['user'],
    queryFn: autoLogin,
  });
}
