import { useSuspenseNaverMap } from '@/hooks/useNaverMap';
import { Suspense } from 'react';

function MapRenderer() {
  // useSuspenseNaverMap({
  //   latitude: 37.3595704,
  //   longitude: 127.105399,
  // });

  return null;
}

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <div id={'map'} style={{ height: '100vh' }} /> */}
      <div style={{ height: '100vh' }} />
      <Suspense>
        <MapRenderer />
      </Suspense>
      {children}
    </>
  );
}
