import { SideNav } from '@/components/Map/SideNav';
import { useInitializeMap } from '@/hooks/Map/useInitializeMap';
import { useSetMarker } from '@/hooks/Map/useSetMarker';
import { useAuctions } from '@/hooks/queries/useAuctions';
import { Suspense, useEffect, useState } from 'react';
import { FilterBar } from '@/components/Map/FilterBar';

function MapRenderer() {
  useInitializeMap();
  return null;
}

function MerkerRenderer({ failedBidCount }: { failedBidCount: number }) {
  const { data: map } = useInitializeMap();
  const [{ lbLat, lbLng, rtLat, rtLng }, setLatLngBounds] = useState(() => {
    const latLngBounds = map.getBounds();
    return {
      lbLat: latLngBounds.minY(),
      lbLng: latLngBounds.minX(),
      rtLat: latLngBounds.maxY(),
      rtLng: latLngBounds.maxX(),
    };
  });
  const { data: auctions } = useAuctions({
    lbLat,
    lbLng,
    rtLat,
    rtLng,
    failedBidCount,
  });

  const { setMarkers } = useSetMarker();

  useEffect(() => {
    setMarkers(auctions);
  }, [auctions, setMarkers]);

  useEffect(() => {
    const adjustBounds = () => {
      setLatLngBounds({
        lbLat: map.getBounds().minY(),
        lbLng: map.getBounds().minX(),
        rtLat: map.getBounds().maxY(),
        rtLng: map.getBounds().maxX(),
      });
    };

    map.addListener('dragend', adjustBounds);
    map.addListener('zoom_changed', adjustBounds);
  }, [map]);

  return null;
}

export default function Home() {
  const [failedBidCount, setFailedBidCount] = useState(0);
  return (
    <>
      <SideNav />
      <FilterBar
        failedBidCount={failedBidCount}
        setFailedBidCount={setFailedBidCount}
      />
      <div id={'map'} style={{ height: 'calc(100vh - 66px)' }} />
      <Suspense>
        <MapRenderer />
        <MerkerRenderer failedBidCount={failedBidCount} />
      </Suspense>
    </>
  );
}
