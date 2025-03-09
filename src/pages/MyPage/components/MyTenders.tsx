import { useMyTenders } from '@/hooks/queries/useMyTenders';
import { commaizeNumber } from '@/utils/number';

export function MyTenders() {
  const { data: tenders } = useMyTenders();

  return (
    <div className="my-8">
      <h2 className="mb-4 text-2xl font-bold">내 입찰 현황</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tenders.map((tender) => (
          <div
            key={tender.auctionId}
            className="overflow-hidden rounded-lg border shadow-lg"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {tender.auction.auctionObjectList[0].address}
              </h3>
              <p className="text-gray-600">
                내 입찰가: {commaizeNumber(tender.tenderCost)}원
              </p>
              <p className="text-gray-600">
                최저 입찰가: {commaizeNumber(tender.auction.latestBiddingPrice)}
                원
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
