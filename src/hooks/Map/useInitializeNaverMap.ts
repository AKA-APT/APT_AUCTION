import { useSuspenseQuery } from '@tanstack/react-query';

async function getMyLocation() {
  return new Promise<{ latitude: number; longitude: number }>((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      resolve({ latitude, longitude });
    });
  });
}

export function useInitializeNaverMap() {
  const initializeNaverMap = async () => {
    const mapOption = {
      zoomControl: false,
      zoom: 17,
      scaleControl: false,
      mapDataControl: false,
    };

    const { latitude, longitude } = await getMyLocation();
    const newMap = new naver.maps.Map('map', {
      ...mapOption,
      center: new naver.maps.LatLng(latitude, longitude),
    });

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
