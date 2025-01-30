import { useInitializeNaverMap } from '@/hooks/useInitializeNaverMap';
import { Suspense } from 'react';

function MapRenderer() {
  useInitializeNaverMap();

  return null;
}

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div id={'map'} style={{ height: '100vh' }} />
      <Suspense>
        <MapRenderer />
      </Suspense>
      {children}
    </>
  );
}
