import { useInitializeNaverMap } from './useInitializeNaverMap';

interface MarkerPosition {
  lat: number;
  lng: number;
}

export const useSetNaverMarker = () => {
  const { data: map } = useInitializeNaverMap();

  const setMarker = (position: MarkerPosition) => {
    new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map: map,
    });
  };

  const setMarkers = (positions: MarkerPosition[]) => {
    positions.forEach(({ lat, lng }) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map,
      });
    });
  };

  return { setMarker, setMarkers };
};
