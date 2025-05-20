import { useAuctionStore } from '@/stores/useAuctionStore';
import { SimpleAuction, GeoAuctionGroup } from '@/models/auction';
import { useEffect } from 'react';
import { getPlacesByCoords } from '@/remotes/address';
import { Store } from 'lucide-react';

const MarkerCache = new Map<string, naver.maps.Marker>();

const getZoomLevel = (zoom: number) => {
  if (zoom >= 19) {
    return 100;
  }
  if (zoom === 18) {
    return 45;
  }
  if (zoom === 17) {
    return 30;
  }
  if (zoom === 16) {
    return 18;
  }
  if (zoom === 15) {
    return 10;
  }
};

const getIconSrc = (categoryGroupCode: string) => {
  switch (categoryGroupCode) {
    case 'MT1':
      return '/assets/place/MT1.png';
    case 'CS2':
      return '/assets/place/CS2.png';
    case 'SC4':
      return '/assets/place/SC4.png';
    case 'AC5':
      return '/assets/place/AC5.png';
    case 'PM9':
      return '/assets/place/PM9.png';
    default:
      return '/assets/place/MT1.png';
  }
};

const formatAmount = (amount: number) => {
  if (amount >= 100000000) {
    return `${(amount / 100000000).toFixed(1)}억`;
  } else if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(1)}천만`;
  } else if (amount >= 10000) {
    return `${(amount / 10000).toFixed(1)}만`;
  }
  return amount.toLocaleString();
};

export const useSetMarker = (map: naver.maps.Map) => {
  const { setSelectAuction, selectedAuction } = useAuctionStore();

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
      <div class="relative inline-block rounded-lg bg-white px-4 py-2 shadow-md border border-blue-200 text-center z-30">
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

  useEffect(() => {
    async function setPlacesMarker() {
      if (selectedAuction) {
        const { latitude, longitude } = selectedAuction.auctionObject;
        const { places } = await getPlacesByCoords({
          latitude,
          longitude,
          categories: ['MT1', 'CS2', 'SC4', 'AC5', 'PM9'],
          radius: 300,
        });
        places.forEach((place) => {
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(
              Number(place.latitude),
              Number(place.longitude),
            ),
            map,
            icon: {
              content: `
                <div class="relative inline-block rounded-lg bg-white px-2 py-1 shadow-md border border-blue-200 text-center z-20">
                  <div class="text-xs font-normal text-blue-600 break-keep flex items-center justify-center gap-1.5">
                    <img src="${getIconSrc(place.categoryGroupCode)}" alt="${place.placeName}" class="w-4 h-4 object-cover" />
                    ${place.categoryGroupName}
                  </div>
                </div>
              `,
              anchor: new naver.maps.Point(66, 80),
            },
          });

          marker.addListener('click', () => {
            window.open(place.placeUrl, '_blank');
          });

          MarkerCache.set(place.id, marker);
        });

        // center the map to the selected auction
        const backgroundMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            Number(selectedAuction.auctionObject.latitude),
            Number(selectedAuction.auctionObject.longitude),
          ),
          map,
          icon: {
            content:
              window.mapInstance.zoom >= 17
                ? `
             <div class="fixed top-0 left-0 w-screen h-screen z-10 pointer-events-none">
              <div
                class="w-full h-full bg-gray-600 bg-opacity-20 flex items-center justify-center"
                style="
                  mask-image: radial-gradient(circle at center, transparent ${getZoomLevel(Number(window.mapInstance.zoom))}vh, black 130px);
                  -webkit-mask-image: radial-gradient(circle at center, transparent ${getZoomLevel(Number(window.mapInstance.zoom))}vh, black 130px);
                "
              >
              </div>
            </div>
            `
                : '',
            anchor: new naver.maps.Point(66, 80),
          },
        });
        MarkerCache.set('background', backgroundMarker);
      }
    }
    setPlacesMarker();
  }, [selectedAuction]);

  return { setMarker, setMarkers };
};
