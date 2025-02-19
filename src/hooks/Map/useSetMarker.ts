import { useAuctionStore } from '@/stores/useAuctionStore';
import { useInitializeMap } from './useInitializeMap';
import { Auction } from '@/models/auction';

export const useSetMarker = () => {
  const { data: map } = useInitializeMap();
  const { setSelectAuction } = useAuctionStore();

  const setMarker = (auction: Auction) => {
    const { x, y } = auction.bjdInfo.location;
    const position = new naver.maps.LatLng(y, x);

    const marker = new naver.maps.Marker({ position, map });

    naver.maps.Event.addListener(marker, 'click', () => {
      map.panTo(position);
      setSelectAuction(auction);
    });

    return marker;
  };

  const setMarkers = (auctions: Auction[]) => {
    return auctions.map((auction) => setMarker(auction));
  };

  return { setMarker, setMarkers };
};
