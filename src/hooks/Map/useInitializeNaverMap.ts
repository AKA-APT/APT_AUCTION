import { useSuspenseQuery } from '@tanstack/react-query';

export function useInitializeNaverMap() {
  const initializeNaverMap = () => {
    const mapOption = {
      zoomControl: false,
      zoom: 17,
      scaleControl: false,
      mapDataControl: false,
    };

    const newMap = new naver.maps.Map('map', mapOption);
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
    retry: 2,
  });

  return { data };
}
