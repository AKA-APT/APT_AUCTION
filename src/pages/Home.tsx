import { SideNav } from '@/components/Map/SideNav';
import { useInitializeMap } from '@/hooks/Map/useInitializeMap';
import { useSetMarker } from '@/hooks/Map/useSetMarker';
import { useAuctions } from '@/hooks/queries/useAuctions';
import { Suspense, useEffect, useState } from 'react';
import { FilterBar } from '@/components/Map/FilterBar';
import { useAddress } from '@/hooks/queries/useAddress';
import { useMyPosition } from '@/hooks/queries/useMyPosition';
import ErrorBoundary from '@/components/ErrorBoundary';

function MerkerRenderer({ isResult }: { isResult: boolean }) {
  const { data: map } = useInitializeMap();
  const [{ lbLat, lbLng, rtLat, rtLng }, setLatLngBounds] = useState(() => {
    const latLngBounds = map.getBounds();
    return {
      lbLat: latLngBounds.minY(),
      lbLng: latLngBounds.minX(),
      rtLat: latLngBounds.maxY(),
      rtLng: latLngBounds.maxX(),
    };
  });
  const { data: auctions } = useAuctions({
    lbLat,
    lbLng,
    rtLat,
    rtLng,
    isResult,
  });

  const { setMarkers } = useSetMarker(map);

  useEffect(() => {
    setMarkers(auctions, isResult);
  }, [auctions, setMarkers]);

  useEffect(() => {
    const adjustBounds = () => {
      setLatLngBounds({
        lbLat: map.getBounds().minY(),
        lbLng: map.getBounds().minX(),
        rtLat: map.getBounds().maxY(),
        rtLng: map.getBounds().maxX(),
      });
    };

    map.addListener('dragend', adjustBounds);
    map.addListener('zoom_changed', adjustBounds);
  }, [map]);

  return null;
}

function MapFooter() {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.496486063,
    lng: 127.028361548,
  });
  const [map, setMap] = useState<any>(null);
  const { data: myPos } = useMyPosition();

  useEffect(() => {
    let interval: any;
    function trySetMap() {
      const mapEl =
        (window as any).naver?.maps?.Map && (window as any).mapInstance;
      if (mapEl) {
        setMap(mapEl);
        setCenter({
          lat: mapEl.getCenter().lat(),
          lng: mapEl.getCenter().lng(),
        });
        const updateCenter = () => {
          setCenter({
            lat: mapEl.getCenter().lat(),
            lng: mapEl.getCenter().lng(),
          });
        };
        mapEl.addListener('center_changed', updateCenter);
        clearInterval(interval);
        return () => mapEl.removeListener('center_changed', updateCenter);
      }
    }
    interval = setInterval(trySetMap, 100);
    return () => clearInterval(interval);
  }, []);

  const goToMyLocation = () => {
    if (map && myPos) {
      map.setCenter(new window.naver.maps.LatLng(myPos.lat, myPos.lng));
    }
  };

  return (
    <div className="fixed z-40 flex flex-col items-end max-w-md px-3 py-2 text-xs border border-gray-200 shadow-lg bottom-3 right-3 rounded-xl bg-white/90">
      <div className="flex flex-col w-full gap-1">
        <Suspense
          fallback={<span className="text-gray-400">중심 변환 중...</span>}
        >
          <CenterAddress center={center} />
        </Suspense>
        <ErrorBoundary
          fallback={<span className="text-red-500">내 위치 불러오기 실패</span>}
        >
          <Suspense
            fallback={
              <span className="text-gray-400 min-w-[160px]">
                내 위치 변환 중...
              </span>
            }
          >
            <MyPositionAddress onClick={goToMyLocation} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

function CenterAddress({ center }: { center: { lat: number; lng: number } }) {
  const [debouncedCenter, setDebouncedCenter] = useState(center);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCenter(center);
    }, 500);
    return () => clearTimeout(timer);
  }, [center]);

  const { data: centerAddress } = useAddress(
    debouncedCenter.lat,
    debouncedCenter.lng,
  );

  return (
    <div className="flex items-center gap-1">
      <span>중심 위치 :</span>
      <span className="flex items-center gap-1 text-gray-600">
        {centerAddress ? centerAddress.fullAddress : ''}
      </span>
    </div>
  );
}

function MyPositionAddress({ onClick }: { onClick?: () => void }) {
  const { data: myPos } = useMyPosition();
  const { data: myAddress } = useAddress(myPos.lat, myPos.lng);
  return (
    <div className="flex items-center gap-1">
      <span>내 위치 :</span>
      <span
        className="flex items-center gap-1 text-gray-600 min-w-[160px] px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 cursor-pointer transition"
        onClick={onClick}
        tabIndex={0}
        role="button"
        aria-pressed="false"
      >
        {myAddress ? myAddress.fullAddress : '내 위치 변환 중...'}
      </span>
    </div>
  );
}

export default function Home() {
  const [isResult, setIsResult] = useState(false);

  return (
    <>
      <SideNav isResult={isResult} />
      <FilterBar isResult={isResult} setIsResult={setIsResult} />
      <div id={'map'} style={{ height: 'calc(100vh - 66px)' }} />
      <Suspense>
        <MerkerRenderer isResult={isResult} />
      </Suspense>
      <MapFooter />
    </>
  );
}
