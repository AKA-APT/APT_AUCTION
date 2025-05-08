import { AuctionSchedule } from '@/models/auction';

const AuctionScheduleTable = ({
  auctionSchedules,
}: {
  auctionSchedules: AuctionSchedule[];
}) => {
  // 날짜를 yy.MM.dd 포맷으로 바꾸는 함수
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 가격 포맷팅 함수
  const formatPrice = (price?: number) => {
    if (!price || price === 0) return '-';
    const billion = Math.floor(price / 100000000);
    const million = Math.floor((price % 100000000) / 10000);
    return `${billion > 0 ? `${billion}억` : ''}${million > 0 ? ` ${million}만원` : ''}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-center text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">구분</th>
            <th className="border p-2">날짜</th>
            <th className="border p-2">최저매각가</th>
            <th className="border p-2">비고</th>
          </tr>
        </thead>
        <tbody>
          {auctionSchedules.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.auctionKind}</td>
              <td className="border p-2">{formatDate(item.auctionDate)}</td>
              <td className="border p-2">
                {item.totalAuctionPrice ? (
                  <span className="text-blue-600 font-semibold">
                    {formatPrice(item.totalAuctionPrice)}
                  </span>
                ) : (
                  '-'
                )}
              </td>
              <td className="border p-2">
                {item.auctionResult ? (
                  item.auctionResult === '최고가매각허가결정' ||
                  item.auctionResult === '미납' ? (
                    item.auctionResult
                  ) : item.auctionResult === '매각' ? (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      최저매각가
                    </span>
                  ) : (
                    item.auctionResult
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionScheduleTable;
