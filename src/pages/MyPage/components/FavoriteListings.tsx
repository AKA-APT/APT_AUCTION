import { AuctionCardImage } from '@/components/AuctionCardImage';
import { useAuctionImage } from '@/hooks/queries/useAuctionImage';
import { SimpleAuction } from '@/models/auction';
import { getLikeLists } from '@/remotes/my-page';
import { commaizeNumber } from '@/utils/number';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

export function FavoriteListings() {
  const { data: likeLists } = useSuspenseQuery({
    queryKey: ['getLikeLists'],
    queryFn: getLikeLists,
  });

  return (
    <div className="my-8">
      <h2 className="mb-4 text-2xl font-bold">즐겨찾기한 매물</h2>
      {likeLists.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense>
            {likeLists.map((auction) => (
              <Auction auction={auction} key={auction.id} />
            ))}
          </Suspense>
        </div>
      ) : (
        <p>즐겨찾기한 매물이 없습니다.</p>
      )}
    </div>
  );
}

export function Auction({ auction }: { auction: SimpleAuction }) {
  return (
    <div className="overflow-hidden rounded-lg border shadow-lg">
      <div className="p-4">
        <AuctionCardImage auctionId={auction.id} />
        <h3 className="text-lg font-semibold">
          {auction.auctionObject.address}
        </h3>
        <p className="text-gray-600">{auction.caseBaseInfo.userCaseNumber}</p>
        <p className="text-gray-600">
          감정가: {commaizeNumber(auction.auctionObject.appraisedValue)}원
        </p>
      </div>
    </div>
  );
}
