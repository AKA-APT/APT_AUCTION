import { getLikeLists } from '@/remotes/my-page';
import { commaizeNumber } from '@/utils/number';
import { useSuspenseQuery } from '@tanstack/react-query';

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
          {likeLists.map((auction) => (
            <div
              key={auction.id}
              className="overflow-hidden rounded-lg border shadow-lg"
            >
              {/* TODO: 이미지 포함한 Card 추가 */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {auction.auctionObject.address}
                </h3>
                <p className="text-gray-600">
                  {auction.caseBaseInfo.userCaseNumber}
                </p>
                <p className="text-gray-600">
                  감정가: {commaizeNumber(auction.auctionObject.appraisedValue)}
                  원
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>즐겨찾기한 매물이 없습니다.</p>
      )}
    </div>
  );
}
