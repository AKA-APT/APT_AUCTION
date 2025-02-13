import { User } from '@/models/user';
import { httpClient } from '@/utils/http-client';

export async function getUser() {
  try {
    return await httpClient.get<User>('/api/v1/members/me');
  } catch {
    return null;
  }
}
