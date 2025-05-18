import { AuctionCardImage } from '@/components/AuctionCardImage';
import { DetailAuction } from '@/models/auction';
import { commaizeNumber } from '@/utils/number';
import { Building, AlertTriangle, Calendar } from 'lucide-react';

export function AuctionCard({ auction }: { auction: DetailAuction }) {
  const getAiScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="">
      <AuctionCardImage auctionId={auction.id} />

      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="flex items-center">
          <Building className="w-5 h-5" />
          <span className="ml-1 text-sm text-gray-500">아파트</span>
        </div>
      </div>

      <h3 className="mb-1 text-lg font-bold">
        {auction.auctionObjectList[0].address}
      </h3>
      <p className="mb-3 text-sm text-gray-500">
        {auction.caseBaseInfo.userCaseNumber}
      </p>

      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-gray-500">경매일:</span>
          <span className="ml-auto">
            {auction.disposalGoodsExecutionInfo.auctionDate}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <AlertTriangle className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-gray-500">감정가:</span>
          <span className="ml-auto">
            {commaizeNumber(auction.disposalGoodsExecutionInfo.appraisedValue)}
            원
          </span>
        </div>
      </div>
    </div>
  );
}
