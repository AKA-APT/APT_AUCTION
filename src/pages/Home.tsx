import { SideNav } from '@/components/Map/SideNav';
import { useInitializeNaverMap } from '@/hooks/Map/useInitializeNaverMap';
import { useSetNaverMarker } from '@/hooks/Map/useSetNaverMarker';
import { SEOUL_CITY_HALL } from '@/static/positions';
import { Suspense, useEffect } from 'react';

function MapRenderer() {
  useInitializeNaverMap();

  return null;
}

function SeoulMarker() {
  const { setMarker } = useSetNaverMarker();

  useEffect(() => {
    setMarker(SEOUL_CITY_HALL);
  }, [setMarker]);

  return null;
}

export default function Home() {
  return (
    <>
      <SideNav />
      <div id={'map'} style={{ height: 'calc(100vh - 66px)' }} />
      <Suspense>
        <MapRenderer />
        <SeoulMarker />
      </Suspense>
    </>
  );
}
