import { httpClient } from '@/utils/http-client';

export function getAddressByCoords(latitude: number, longitude: number) {
  return httpClient.post('/api/v1/addresses', {
    latitude,
    longitude,
  });
}
