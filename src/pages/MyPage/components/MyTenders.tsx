import { AuctionCard } from '@/components/AuctionCard';
import { AuctionCardImage } from '@/components/AuctionCardImage';
import { Spacing } from '@/components/Spacing';
import { useAuctionStatus } from '@/hooks/queries/useAuctionStatus';
import { useMyTenders } from '@/hooks/queries/useMyTenders';
import type { Tender as TenderType } from '@/models/tender';
import { commaizeNumber } from '@/utils/number';
import {
  ArrowBigDownDash,
  HandCoins,
  Receipt,
  TrendingUp,
  Info,
} from 'lucide-react';
import { Suspense } from 'react';

export function MyTenders() {
  const { data: tenders } = useMyTenders();

  return (
    <div className="my-8">
      <h2 className="mb-4 text-2xl font-bold">모의 입찰 현황</h2>
      {tenders.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense>
            {tenders.map((tender) => (
              <Tender
                key={`${tender.auctionId}_${tender.tenderCost}`}
                tender={tender}
                isMock={false}
              />
            ))}
          </Suspense>
        </div>
      ) : (
        <p className="text-gray-500">진행 중인 입찰 내역이 없습니다.</p>
      )}

      <Spacing size={32} />
    </div>
  );
}

function Tender({ tender, isMock }: { tender: TenderType; isMock: boolean }) {
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
      className="relative overflow-hidden border rounded-lg shadow-lg"
    >
      <div className="p-4">
        {/* AuctionCard에 이미 상태 라벨이 있으므로 중복을 방지하기 위해 showLabel={false}로 설정 */}
        <AuctionCard auction={tender.auction} showStatusLabel={false} />

        {isMock && (
          <div className="absolute flex items-center px-2 py-1 pr-3 text-sm font-medium text-blue-700 bg-blue-100 border-2 border-blue-500 rounded-full left-6 top-8">
            <Info className="w-4 h-4 mr-1" /> 모의 낙찰
          </div>
        )}

        <div className="flex items-center mt-2 text-sm">
          <ArrowBigDownDash className="w-4 h-4 mr-2" />
          <span className="text-gray-900">최저 입찰가:</span>
          <span className="ml-auto font-medium">
            {commaizeNumber(
              tender.auction.disposalGoodsExecutionInfo.firstAuctionPrice,
            )}
            원
          </span>
        </div>
        <div className="flex items-center mt-2 text-sm">
          <Receipt className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-gray-900">
            {isMock ? '모의 입찰가:' : '내 입찰가:'}
          </span>
          <span className="ml-auto font-medium text-blue-600">
            {commaizeNumber(tender.tenderCost)}원
          </span>
        </div>

        {!isMock && (
          <>
            {auctionStatus.status === '낙찰' ? (
              <div className="flex items-center mt-2 text-sm">
                <HandCoins className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-gray-900">낙찰가:</span>
                <span className="ml-auto font-medium text-blue-600">
                  {commaizeNumber(auctionStatus.auctionPrice)}원
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-gray-900">예상 수익률:</span>
                  <span className="ml-auto font-medium text-blue-600">
                    {수익률.toFixed(2)}%
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
