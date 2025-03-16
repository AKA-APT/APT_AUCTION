import MarkerClustering from '@/utils/MarkerClustering';
import clusterUrl1 from '@/assets/cluster/cluster-marker-1.png';
import clusterUrl2 from '@/assets/cluster/cluster-marker-2.png';
import clusterUrl3 from '@/assets/cluster/cluster-marker-3.png';
import clusterUrl4 from '@/assets/cluster/cluster-marker-4.png';
import clusterUrl5 from '@/assets/cluster/cluster-marker-5.png';

const clusterUrls = [
  clusterUrl1,
  clusterUrl2,
  clusterUrl3,
  clusterUrl4,
  clusterUrl5,
];

interface SetClusterProps {
  map: naver.maps.Map;
  markers: naver.maps.Marker[];
}

export const useSetCluster = () => {
  const setCluster = async ({ map, markers }: SetClusterProps) => {
    new Promise(
      () =>
        new MarkerClustering({
          minClusterSize: 2,
          maxZoom: 15,
          map: map,
          markers: markers,
          disableClickZoom: false,
          gridSize: 100,
          icons: clusterUrls.map((url) => {
            const imageIcon: naver.maps.ImageIcon = {
              url,
              size: new naver.maps.Size(40, 40),
              scaledSize: new naver.maps.Size(40, 40),
            };
            return imageIcon;
          }),
          indexGenerator: [10, 100, 200, 500, 1000],
          stylingFunction: function (clusterMarker, count) {
            const container = clusterMarker.getElement();
            container.style.position = 'relative';
            container.innerHTML = `
          <div class="absolute inset-0 z-10 flex items-center justify-center text-white font-bold text-[12px]">
            ${count}
          </div>
        `;
          },
        }),
    );
  };
  return { setCluster };
};
