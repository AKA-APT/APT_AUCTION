import { useMarkerStore } from '@/stores/useMarkerStore';
import { useInitializeNaverMap } from './useInitializeNaverMap';
import MarkerClustering from '@/utils/MarkerClustering';

interface Position {
  id: string;
  title: string;
  lat: number;
  lng: number;
}

export const useMarkerClustering = () => {
  const { data: map } = useInitializeNaverMap();
  const { selectMarker } = useMarkerStore();

  const initializeCluster = (positions: Position[]) => {
    if (!map) return;

    const markers = positions.map(
      (position) =>
        new naver.maps.Marker({
          position: new naver.maps.LatLng(position.lat, position.lng),
          map: undefined,
        }),
    );

    const clusterer = new MarkerClustering({
      map: map,
      markers: markers,
      minClusterSize: 2,
      maxZoom: 13,
      gridSize: 100,
      icons: [
        {
          content: `<div style="
            background: #ff0000; 
            width: 30px; 
            height: 30px; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-weight: bold;">$[count]</div>`,
          size: new naver.maps.Size(30, 30),
        },
      ],
      stylingFunction: (clusterMarker, count) => {
        // 클러스터 마커 스타일링
        clusterMarker.getElement().innerHTML = `<div style="background-color: #ff0000; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: white;">${count}</div>`;
      },
    });

    markers.forEach((marker, index) => {
      naver.maps.Event.addListener(marker, 'click', () => {
        const position = positions[index];
        selectMarker({
          id: position.id,
          title: position.title,
          lat: position.lat,
          lng: position.lng,
        });
      });
    });
  };

  return { initializeCluster };
};
