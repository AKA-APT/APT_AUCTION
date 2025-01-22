import { useEffect } from 'react';
import { useSuspenseNaverMap } from './useSuspenseNaverMap';

interface MarkerPosition {
  lat: number;
  lng: number;
}

export const useNaverMarker = () => {
  const { data: map } = useSuspenseNaverMap();

  const setMarker = (position: MarkerPosition | MarkerPosition[]) => {
    if (!map) return;

    if (Array.isArray(position)) {
      position.forEach(({ lat, lng }) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map: map,
        });
      });
      return;
    }

    new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map: map,
    });
  };

  return { setMarker };
};
