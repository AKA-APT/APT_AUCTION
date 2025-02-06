import { MyTenders } from '@/models/tender';
import { httpClient } from '@/utils/http-client';

export function getMyTenders() {
  return httpClient.get<MyTenders>('/api/v1/tenders');
}
