import { useAuctionStore } from '@/stores/useAuctionStore';

export function SideNav() {
  const { selectedAuction, isNavOpen, closeNav } = useAuctionStore();

  if (!isNavOpen) return null;

  return (
    <div className="fixed left-0 top-[65px] z-10 h-[calc(100vh-65px)] w-[max(30%,24rem)] bg-white shadow-lg">
      <button
        onClick={closeNav}
        className="absolute flex items-center justify-center w-10 h-10 text-white bg-red-500 rounded-none right-4 top-4 size-4"
        style={{ boxSizing: 'border-box' }}
      >
        ✕
      </button>
      {selectedAuction && (
        <div className="p-4">
          <h2 className="text-xl font-bold">
            {selectedAuction.objectList[0].objectAddress}
          </h2>
          <div className="mt-4">
            <p>위도: {selectedAuction.bjdInfo.location.y}</p>
            <p>경도: {selectedAuction.bjdInfo.location.x}</p>
            최저입찰가: {selectedAuction.lowestSellingPrice}원
          </div>
        </div>
      )}
    </div>
  );
}
