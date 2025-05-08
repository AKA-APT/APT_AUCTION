import { useAuctionStore } from '@/stores/useAuctionStore';
import { useInitializeMap } from './useInitializeMap';
import { SimpleAuction, GeoAuctionGroup } from '@/models/auction';

const MarkerCache = new Map<string, naver.maps.Marker>();

const formatAmount = (amount: number) => {
  if (amount >= 100000000) {
    return `${(amount / 100000000).toFixed(1)}억`;
  } else if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(1)}천만`;
  }
  return amount.toLocaleString();
};

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

    const ruptureCount = auction.auctionStatus.ruptureCount;
    const propertyUsage = auction.auctionStatus.propertyUsage;
    const minBidPrice = auction.auctionStatus.minimumPrice;
    const formattedAmount = formatAmount(minBidPrice);

    const htmlContent = `
      <div class="relative inline-block rounded-lg bg-white px-4 py-2 shadow-md border border-blue-200 text-center">
        <div class="flex items-center justify-center gap-1.5">
          <div class="text-xs font-semibold text-blue-600 break-keep">${propertyUsage}</div>
          <span
            class="whitespace-nowrap rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white shadow-sm border border-white"
            style="letter-spacing: -0.5px;"
          >
            유찰${ruptureCount}회
          </span>
        </div>
        <div class="mt-1">
          <span class="text-2xl font-bold text-gray-800">${formattedAmount}</span>
        </div>
        <div class="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0
                    border-l-[10px] border-l-transparent
                    border-r-[10px] border-r-transparent
                    border-t-[10px] border-t-blue-200">
        </div>
        <div class="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0
                    border-l-[10px] border-l-transparent
                    border-r-[10px] border-r-transparent
                    border-t-[10px] border-t-white">
        </div>
      </div>
    `;

    const marker = new naver.maps.Marker({
      position,
      map,
      icon: {
        content: htmlContent,
        anchor: new naver.maps.Point(66, 80),
      },
    });

    naver.maps.Event.addListener(marker, 'click', () => {
      map.panTo(position);
      setSelectAuction(auction);
    });

    MarkerCache.set(auction.id, marker);

    return marker;
  };

  const setMarkers = async (auctionGroups: GeoAuctionGroup[]) => {
    // destroy all markers
    MarkerCache.forEach((marker) => {
      marker.setMap(null);
    });
    MarkerCache.clear();
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
