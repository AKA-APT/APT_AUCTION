import { SideNav } from '@/components/Map/SideNav';
import { useInitializeNaverMap } from '@/hooks/Map/useInitializeNaverMap';
import { useSetNaverMarker } from '@/hooks/Map/useSetNaverMarker';
import { useAuctions } from '@/hooks/queries/useAuctions';
import { Suspense, useEffect } from 'react';

function MapRenderer() {
  useInitializeNaverMap();

  return null;
}

function SeoulMarker() {
  const { data: map } = useInitializeNaverMap();
  const latLngBounds = map.getBounds();
  const { data: auctions } = useAuctions({
    lbLat: latLngBounds.minY(),
    lbLon: latLngBounds.minX(),
    rtLat: latLngBounds.maxY(),
    rtLon: latLngBounds.maxX(),
  });

  const { setMarkers } = useSetNaverMarker();

  useEffect(() => {
    setMarkers(auctions);
  }, [setMarkers]);

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
