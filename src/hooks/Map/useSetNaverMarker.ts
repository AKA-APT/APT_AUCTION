import { useMarkerStore } from '@/stores/useMarkerStore';
import { useInitializeNaverMap } from './useInitializeNaverMap';
import { Auction } from '@/models/auction';

interface MarkerPosition {
  id: string;
  title: string;
  lat: number;
  lng: number;
}

export const useSetNaverMarker = () => {
  const { data: map } = useInitializeNaverMap();
  const { selectMarker } = useMarkerStore();

  const setMarker = (position: MarkerPosition) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map: map,
    });

    naver.maps.Event.addListener(marker, 'click', () => {
      selectMarker({
        id: position.id,
        title: position.title,
        lat: position.lat,
        lng: position.lng,
      });
    });
  };

  const setMarkers = (auctions: Auction[]) => {
    auctions.forEach((auction) => {
      if (auction.bjdInfo.location == null) return;
      setMarker({
        id: auction.id,
        title: auction.objectList[0].objectAddress,
        lat: auction.bjdInfo.location.y,
        lng: auction.bjdInfo.location.x,
      });
    });
  };

  return { setMarker, setMarkers };
};
