import { useAuctionStore } from '@/stores/useAuctionStore';
import { useInitializeMap } from './useInitializeMap';
import { Auction, GeoAuctionGroup } from '@/models/auction';

export const useSetMarker = () => {
  const { data: map } = useInitializeMap();
  const { setSelectAuction } = useAuctionStore();

  const setMarker = (auction: Auction) => {
    const x = auction.auctionObject.longitude;
    const y = auction.auctionObject.latitude;
    const position = new naver.maps.LatLng(y, x);

    const marker = new naver.maps.Marker({ position, map });

    naver.maps.Event.addListener(marker, 'click', () => {
      map.panTo(position);
      setSelectAuction(auction);
    });

    return marker;
  };

  const setMarkers = (auctionGroups: GeoAuctionGroup[]) => {
    return auctionGroups
      .map((group) => group.auctions.map((auction) => setMarker(auction)))
      .flat();
  };

  return { setMarker, setMarkers };
};
