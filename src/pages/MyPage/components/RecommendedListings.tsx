import { AuctionCardImage } from '@/components/AuctionCardImage';
import { Spacing } from '@/components/Spacing';
import { getAuction } from '@/remotes/auction';
import { commaizeNumber } from '@/utils/number';
import { useSuspenseQueries } from '@tanstack/react-query';

export function RecommendedListings() {
  const auctionQueries = useSuspenseQueries({
    queries: [
      {
        queryKey: ['getAuction', '67db2bae6ebb8c8350b78f3c'],
        queryFn: () => getAuction('67db2bae6ebb8c8350b78f3c'),
      },
      {
        queryKey: ['getAuction', '67db2c4a6ebb8c8350b79676'],
        queryFn: () => getAuction('67db2c4a6ebb8c8350b79676'),
      },
      {
        queryKey: ['getAuction', '67db2c2a6ebb8c8350b794f0'],
        queryFn: () => getAuction('67db2c2a6ebb8c8350b794f0'),
      },
    ],
  });

  return (
    <div className="my-8">
      <h2 className="mb-4 text-2xl font-bold">추천 매물</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {auctionQueries.map(({ data: auction }) => (
          <div
            key={auction.id}
            className="overflow-hidden rounded-lg border shadow-lg"
          >
            <div className="p-4">
              <AuctionCardImage auctionId={auction.id} />
              <Spacing size={8} />
              <h3 className="text-lg font-semibold">
                {auction.auctionObjectList[0].address}
              </h3>
              <p className="text-gray-600">
                {auction.caseBaseInfo.userCaseNumber}
              </p>
              <p className="text-gray-600">
                감정가:{' '}
                {commaizeNumber(auction.auctionObjectList[0].appraisedValue)}원
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
