import { SideNav } from '@/components/Map/SideNav';
import { useInitializeNaverMap } from '@/hooks/Map/useInitializeNaverMap';
import { useSetNaverMarker } from '@/hooks/Map/useSetNaverMarker';
import { useAuctions } from '@/hooks/queries/useAuctions';
import { Suspense, useEffect, useState } from 'react';
import clusterUrl1 from '@/assets/cluster/cluster-marker-1.png';
import clusterUrl2 from '@/assets/cluster/cluster-marker-2.png';
import clusterUrl3 from '@/assets/cluster/cluster-marker-3.png';
import clusterUrl4 from '@/assets/cluster/cluster-marker-4.png';
import clusterUrl5 from '@/assets/cluster/cluster-marker-5.png';
import MarkerClustering from '@/utils/MarkerClustering';

const clusterUrls = [
  clusterUrl1,
  clusterUrl2,
  clusterUrl3,
  clusterUrl4,
  clusterUrl5,
];

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
    const markers = setMarkers(auctions).flat();

    const markerClustering = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 13,
      map: map,
      markers: markers,
      disableClickZoom: false,
      gridSize: 120,
      icons: clusterUrls.map((url) => {
        const imageIcon: naver.maps.ImageIcon = { url };
        return imageIcon;
      }),
      indexGenerator: [10, 100, 200, 500, 1000],
    });
  }, [auctions, setMarkers]);

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
