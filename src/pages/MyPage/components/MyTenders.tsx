import { AuctionCard } from '@/components/AuctionCard';
import { AuctionCardImage } from '@/components/AuctionCardImage';
import { Spacing } from '@/components/Spacing';
import { useAuctionStatus } from '@/hooks/queries/useAuctionStatus';
import { useMyTenders } from '@/hooks/queries/useMyTenders';
import type { Tender as TenderType } from '@/models/tender';
import { commaizeNumber } from '@/utils/number';
import { ArrowBigDownDash, HandCoins, Receipt, TrendingUp } from 'lucide-react';
import { Suspense } from 'react';

export function MyTenders() {
  const { data: tenders } = useMyTenders();

  return (
    <div className="my-8">
      <h2 className="mb-4 text-2xl font-bold">내 입찰 현황</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense>
          {tenders.map((tender) => (
            <Tender key={tender.auctionId} tender={tender} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

function Tender({ tender }: { tender: TenderType }) {
  const { data: auctionStatus } = useAuctionStatus(tender.auction.id);
  const 원금 = tender.tenderCost;
  const 감정가 = tender.auction.disposalGoodsExecutionInfo.appraisedValue;
  const 최소유지기간 = 2;
  const 원금이자 = 원금 * 0.05 * 최소유지기간;
  const 경매수수료 = 원금 * 0.01;
  const 수익률 = ((감정가 - 원금이자 - 경매수수료) / 원금) * 100 - 100;

  return (
    <div
      key={tender.auctionId}
      className="relative overflow-hidden rounded-lg border shadow-lg"
    >
      <div className="p-4">
        <AuctionCard auction={tender.auction} />
        {auctionStatus.status === '낙찰' ? (
          <div>
            <div className="absolute left-6 top-8 rounded-full border-2 border-slate-500 bg-slate-500 px-2 py-1 pr-3 text-white">
              ㆍ낙찰됨
            </div>
          </div>
        ) : null}
        <div className="mt-2 flex items-center text-sm">
          <ArrowBigDownDash className="mr-2 h-4 w-4" />
          <span className="text-gray-900">최저 입찰가:</span>
          <span className="ml-auto font-medium">
            {commaizeNumber(tender.auction.latestBiddingPrice)}원
          </span>
        </div>
        <div className="mt-2 flex items-center text-sm">
          <Receipt className="mr-2 h-4 w-4 text-blue-500" />
          <span className="text-gray-900">내 입찰가:</span>
          <span className="ml-auto font-medium text-blue-600">
            {commaizeNumber(tender.tenderCost)}원
          </span>
        </div>
        {auctionStatus.status === '낙찰' ? (
          <div className="mt-2 flex items-center text-sm">
            <HandCoins className="mr-2 h-4 w-4 text-blue-600" />
            <span className="text-gray-900">낙찰가:</span>
            <span className="ml-auto font-medium text-blue-600">
              {commaizeNumber(auctionStatus.auctionPrice)}원
            </span>
          </div>
        ) : (
          <>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-gray-900">예상 수익률:</span>
              <span className="ml-auto font-medium text-blue-600">
                {수익률.toFixed(2)}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
