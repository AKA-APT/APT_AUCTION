import { useMapStore } from '@/stores/useMapStore';
import { useSuspenseQuery } from '@tanstack/react-query';

interface UseSuspenseNaverMapProps {
  latitude: number;
  longitude: number;
}

export function useSuspenseNaverMap(
  { latitude, longitude }: UseSuspenseNaverMapProps = {
    latitude: 37.3595704,
    longitude: 127.105399,
  },
) {
  const { map, setMap } = useMapStore();

  const getMap = () => {
    if (map) return map;

    const mapOption = {
      center: new naver.maps.LatLng(latitude, longitude),
      zoomControl: false,
      zoom: 17,
      scaleControl: false,
      mapDataControl: false,
    };

    const newMap = new naver.maps.Map('map', mapOption);
    setMap(newMap);
    return newMap;
  };

  const { data } = useSuspenseQuery({
    queryKey: ['naverMap', latitude, longitude],
    queryFn: () => getMap(),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: Infinity,
  });

  return { data };
}
