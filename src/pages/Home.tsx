import { useInitializeNaverMap } from '@/hooks/Map/useInitializeNaverMap';
import { useSetNaverMarker } from '@/hooks/Map/useSetNaverMarker';
import { SEOUL_CITY_HALL } from '@/static/positions';
import { Suspense } from 'react';

function MapRenderer() {
  useInitializeNaverMap();

  return null;
}

function SeoulMarker() {
  const { setMarker } = useSetNaverMarker();

  setMarker(SEOUL_CITY_HALL);

  return null;
}


export default function Home() {
  return (
    <>
      <div id={'map'} style={{ height: 'calc(100vh - 66px)' }} />
      <Suspense>
        <MapRenderer />    
        <SeoulMarker />
      </Suspense>
    </>
  );
}
