import { useEffect } from 'react';
import { useSuspenseNaverMap } from './useSuspenseNaverMap';

interface MarkerPosition {
  lat: number;
  lng: number;
}

export const useNaverMarker = () => {
  const { data: map } = useSuspenseNaverMap();

  const setMarker = (position: MarkerPosition) => {
    if (!map) return;

    new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map: map,
    });
  };

  const setMarkers = (positions: MarkerPosition[]) => {
    if (!map) return;

    positions.forEach(({ lat, lng }) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map,
      });
    });
  };

  return { setMarker, setMarkers };
};
