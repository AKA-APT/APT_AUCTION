import { useSuspenseNaverMap } from '@/hooks/useSuspenseNaverMap';
import { useNaverMarker } from '@/hooks/useNaverMarker';
import { Suspense } from 'react';

const initialPosition = {
  latitude: 37.3595704,
  longitude: 127.105399,
};

function MapRenderer() {
  useSuspenseNaverMap(initialPosition);

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
