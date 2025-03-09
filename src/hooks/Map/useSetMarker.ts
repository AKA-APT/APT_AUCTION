import { useAuctionStore } from '@/stores/useAuctionStore';
import { useInitializeMap } from './useInitializeMap';
import { SimpleAuction, GeoAuctionGroup } from '@/models/auction';

const MarkerCache = new Map<string, naver.maps.Marker>();

export const useSetMarker = () => {
  const { data: map } = useInitializeMap();
  const { setSelectAuction } = useAuctionStore();

  const setMarker = async (auction: SimpleAuction) => {
    const cachedMarker = MarkerCache.get(auction.id);
    if (cachedMarker != null) {
      return cachedMarker;
    }
    const x = auction.auctionObject.longitude;
    const y = auction.auctionObject.latitude;
    const position = new naver.maps.LatLng(y, x);

    const marker = new naver.maps.Marker({ position, map });

    naver.maps.Event.addListener(marker, 'click', () => {
      map.panTo(position);
      setSelectAuction(auction);
    });

    MarkerCache.set(auction.id, marker);

    return marker;
  };

  const setMarkers = async (auctionGroups: GeoAuctionGroup[]) => {
    const res = [];
    for (let i = 0; i < auctionGroups.length; i++) {
      for (let j = 0; j < auctionGroups[i].auctions.length; j++) {
        res.push(await setMarker(auctionGroups[i].auctions[j]));
      }
    }
    return res;
  };

  return { setMarker, setMarkers };
};
