import { useSuspenseQuery } from '@tanstack/react-query';

async function getMyLocation() {
  return new Promise<{ latitude: number; longitude: number }>((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      resolve({ latitude, longitude });
    });
  });
}

export function useInitializeMap() {
  const initializeNaverMap = async () => {
    const mapOption = {
      zoomControl: false,
      zoom: 17,
      scaleControl: false,
      mapDataControl: false,
      minZoom: 14,
    };

    // const { latitude, longitude } = await getMyLocation();
    const newMap = new naver.maps.Map('map', {
      ...mapOption,
      center: new naver.maps.LatLng(37.496486063, 127.028361548),
    });

    (window as any).mapInstance = newMap;

    return newMap;
  };

  const { data } = useSuspenseQuery({
    queryKey: ['naver-map'],
    queryFn: () => initializeNaverMap(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 5,
  });

  return { data };
}
