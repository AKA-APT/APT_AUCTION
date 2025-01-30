import { useInitializeNaverMap } from '@/hooks/useInitializeNaverMap';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function MapRenderer() {
  useInitializeNaverMap();

  return null;
}

export default function MapLayout() {
  return (
    <>
      <div id={'map'} style={{ height: '100vh' }} />
      <Suspense>
        <MapRenderer />
        <Outlet />
      </Suspense>
    </>
  );
}
