import { SideNav } from '@/components/Map/SideNav';
import { useInitializeNaverMap } from '@/hooks/Map/useInitializeNaverMap';
import { useSetNaverMarker } from '@/hooks/Map/useSetNaverMarker';
import { useAuctions } from '@/hooks/queries/useAuctions';
import { Suspense, useEffect, useState } from 'react';

function MapRenderer() {
  useInitializeNaverMap();

  return null;
}

function SeoulMarker() {
  const { data: map } = useInitializeNaverMap();
  const [{ lbLat, lbLng, rtLat, rtLng }, setLatLngBounds] = useState(() => {
    const latLngBounds = map.getBounds();
    return {
      lbLat: latLngBounds.minY(),
      lbLng: latLngBounds.minX(),
      rtLat: latLngBounds.maxY(),
      rtLng: latLngBounds.maxX(),
    };
  });
  const { data: auctions } = useAuctions({ lbLat, lbLng, rtLat, rtLng });

  const { setMarkers } = useSetNaverMarker();

  useEffect(() => {
    setMarkers(auctions);
  }, [setMarkers]);

  useEffect(() => {
    map.addListener('dragend', () => {
      setLatLngBounds({
        lbLat: map.getBounds().minY(),
        lbLng: map.getBounds().minX(),
        rtLat: map.getBounds().maxY(),
        rtLng: map.getBounds().maxX(),
      });
    });
  }, [map]);

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
