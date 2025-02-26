import { useAuctionStore } from '@/stores/useAuctionStore';
import { commaizeNumber } from '@/utils/number';

export function SideNav() {
  const { selectedAuction, isNavOpen, closeNav } = useAuctionStore();

  if (!isNavOpen) return null;

  return (
    <div className="fixed left-0 top-[65px] z-10 h-[calc(100vh-65px)] w-[max(30%,24rem)] bg-white shadow-lg">
      <button
        onClick={closeNav}
        className="absolute right-4 top-4 flex size-4 h-10 w-10 items-center justify-center rounded-none bg-red-500 text-white"
        style={{ boxSizing: 'border-box' }}
      >
        ✕
      </button>
      {selectedAuction && (
        <div className="p-4">
          <h2 className="text-xl font-bold">
            {selectedAuction.auctionObject.address}
          </h2>
          <div className="mt-4">
            <p>위도: {selectedAuction.auctionObject.latitude}</p>
            <p>경도: {selectedAuction.auctionObject.longitude}</p>
            최저입찰가:{' '}
            {commaizeNumber(selectedAuction.auctionObject.appraisedValue)}원
          </div>
        </div>
      )}
    </div>
  );
}
