import { useMapStore } from '@/stores/useMapStore';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useInitializeNaverMap() {
  const { map, setMap } = useMapStore();

  const initializeNaverMap = () => {
    if (map !== null) {
      return map;
    }

    const mapOption = {
      zoomControl: false,
      zoom: 17,
      scaleControl: false,
      mapDataControl: false,
    };

    const newMap = new naver.maps.Map('map', mapOption);
    setMap(newMap);
    console.log(newMap);
    return newMap;
  };

  const { data } = useSuspenseQuery({
    queryKey: ['naver-map'],
    queryFn: () => initializeNaverMap(),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    gcTime: Infinity,
  });

  return { data };
}
