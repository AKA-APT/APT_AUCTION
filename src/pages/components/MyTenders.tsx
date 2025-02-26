import { useMyTenders } from '@/hooks/queries/useMyTenders';

export function MyTenders() {
  const { data: tenders } = useMyTenders();

  return (
    <div className="my-8">
      <h2 className="mb-4 text-2xl font-bold">내 입찰 현황</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tenders.map((tender) => (
          <div
            key={tender.id}
            className="overflow-hidden rounded-lg border shadow-lg"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {tender.auction.auctionObject.address}
              </h3>
              <p className="text-gray-600">{tender.tenderCost}</p>
              <p className="text-gray-600">
                {tender.auction.auctionObject.appraisedValue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
