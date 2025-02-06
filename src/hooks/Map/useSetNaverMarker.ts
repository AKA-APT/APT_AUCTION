import { useMarkerStore } from '@/stores/useMarkerStore';
import { useInitializeNaverMap } from './useInitializeNaverMap';

interface MarkerPosition {
  id: string;
  title: string;
  lat: number;
  lng: number;
}

export const useSetNaverMarker = () => {
  const { data: map } = useInitializeNaverMap();
  const { selectMarker } = useMarkerStore();

  const setMarker = (position: MarkerPosition) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map: map,
    });

    naver.maps.Event.addListener(marker, 'click', () => {
      selectMarker({
        id: position.id,
        title: position.title,
        lat: position.lat,
        lng: position.lng,
      });
    });
  };

  const setMarkers = (positions: MarkerPosition[]) => {
    positions.map((position) => setMarker(position));
  };

  return { setMarker, setMarkers };
};
