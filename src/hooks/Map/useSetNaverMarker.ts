import { useAuctionStore } from '@/stores/useAuctionStore';
import { useInitializeNaverMap } from './useInitializeNaverMap';
import { Auction } from '@/models/auction';

export const useSetNaverMarker = () => {
  const { data: map } = useInitializeNaverMap();
  const { setSelectAuction } = useAuctionStore();

  const setMarker = (auction: Auction) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(auction.location.y, auction.location.x),
      map: map,
    });

    naver.maps.Event.addListener(marker, 'click', () => {
      map.panTo(new naver.maps.LatLng(auction.location.y, auction.location.x));

      selectMarker(auction);
    });

    return marker;
  };

  const setMarkers = (auctions: Auction[]) => {
    return auctions
      .filter((auction) => auction.location != null)
      .map((auction) => setMarker(auction));
  };

  return { setMarker, setMarkers };
};
