import { useSuspenseQuery } from '@tanstack/react-query';

function getMyPosition(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('브라우저가 위치 정보를 지원하지 않습니다.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => reject(err),
    );
  });
}

export function useMyPosition() {
  return useSuspenseQuery({
    queryKey: ['myPosition'],
    queryFn: getMyPosition,
  });
}
