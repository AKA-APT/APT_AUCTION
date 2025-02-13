import { useMarkerStore } from '@/stores/useMarkerStore';
import { useInitializeNaverMap } from './useInitializeNaverMap';
import { Auction } from '@/models/auction';

export const useSetNaverMarker = () => {
  const { data: map } = useInitializeNaverMap();
  const { selectMarker } = useMarkerStore();

  const setMarker = (auction: Auction) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(auction.location.y, auction.location.x),
      map: map,
    });

    naver.maps.Event.addListener(marker, 'click', () => {
      map.panTo(new naver.maps.LatLng(auction.location.y, auction.location.x));

      selectMarker(auction);
    });
  };

  const setMarkers = (auctions: Auction[]) => {
    auctions.forEach((auction) => {
      if (auction.location == null) return;
      setMarker(auction);
    });
  };

  return { setMarker, setMarkers };
};
