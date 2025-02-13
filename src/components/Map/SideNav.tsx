import { useMarkerStore } from '@/stores/useMarkerStore';

export function SideNav() {
  const { selectedMarker, isNavOpen, closeNav } = useMarkerStore();

  if (!isNavOpen) return null;

  return (
    <div className="fixed left-0 top-[65px] z-10 h-[calc(100vh-65px)] w-[max(50%,24rem)] bg-white shadow-lg">
      <button
        onClick={closeNav}
        className="absolute right-4 top-4 flex size-4 h-10 w-10 items-center justify-center rounded-none bg-red-500 text-white"
        style={{ boxSizing: 'border-box' }}
      >
        ✕
      </button>
      {selectedMarker && (
        <div className="p-4">
          <h2 className="text-xl font-bold">{selectedMarker.title}</h2>
          <div className="mt-4">
            <p>위도: {selectedMarker.lat}</p>
            <p>경도: {selectedMarker.lng}</p>
            {/* 추가 정보 표시 */}
          </div>
        </div>
      )}
    </div>
  );
}
