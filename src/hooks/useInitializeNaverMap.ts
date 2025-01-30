import { SEOUL_CITY_HALL } from '@/static/positions';
import { useMapStore } from '@/stores/useMapStore';
import { useSuspenseQuery } from '@tanstack/react-query';

const INITIAL_POSITION = SEOUL_CITY_HALL;

export function useInitializeNaverMap() {
  const { map, setMap } = useMapStore();

  const initializeNaverMap = () => {
    if (map !== null) {
      return map;
    }

    const mapOption = {
      center: new naver.maps.LatLng(INITIAL_POSITION),
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
    queryKey: ['naver-map', INITIAL_POSITION.lat, INITIAL_POSITION.lng],
    queryFn: () => initializeNaverMap(),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: Infinity,
  });

  return { data };
}
