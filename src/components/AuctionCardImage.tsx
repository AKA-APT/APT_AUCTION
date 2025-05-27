import {
  useAuctionImage,
  useSuspenseAuctionImage,
} from '@/hooks/queries/useAuctionImage';
import { useAuctionStatus } from '@/hooks/queries/useAuctionStatus';
import { Suspense } from 'react';

export function AuctionCardImage({
  auctionId,
  onImageClick,
  showLabel = true, // 라벨 표시 여부를 제어하는 prop 추가
}: {
  auctionId: string;
  onImageClick?: (index: number) => void;
  showLabel?: boolean;
}) {
  return (
    <Suspense
      fallback={
        <div style={{ height: '200px', display: 'flex', gap: '8px' }}>
          <div className="flex items-center justify-center bg-gray-200 w-64 h-full" />
          <div className="flex items-center justify-center bg-gray-200 w-64 h-full" />
          <div className="flex items-center justify-center bg-gray-200 w-64 h-full" />
        </div>
      }
    >
      <CardImage auctionId={auctionId} onImageClick={onImageClick} showLabel={showLabel} />
    </Suspense>
  );
}

function CardImage({
  auctionId,
  onImageClick,
  showLabel,
}: {
  auctionId: string;
  onImageClick?: (index: number) => void;
  showLabel: boolean;
}) {
  const { data: imageList } = useSuspenseAuctionImage(auctionId);
  const { data: auctionStatus } = useAuctionStatus(auctionId);
  
  // 경매 상태가 낙찰되었는지 확인 ('낙찰' 값으로 비교)
  const isAuctioned = auctionStatus?.status === '낙찰';
  
  return imageList !== null && imageList.length > 0 ? (
    <div
      style={{
        // scroll-snap
        scrollSnapType: 'x mandatory',
        overflowX: 'auto',
        height: '200px',
        display: 'flex',
        gap: '8px',
      }}
      className="relative"
    >
      {/* showLabel이 true일 때만 라벨 표시 */}
      {showLabel && (
        isAuctioned ? (
          <div className="absolute px-2 py-1 pr-4 text-white bg-blue-600 border-2 rounded-full left-2 top-2">
            ㆍ낙찰됨
          </div>
        ) : (
          <div className="absolute px-2 py-1 pr-4 text-white bg-orange-600 border-2 rounded-full left-2 top-2">
            ㆍ경매예정
          </div>
        )
      )}
      
      {imageList.map((image, index) => {
        const imageUrl = `data:image/jpeg;base64,${image.picFile}`;

        return (
          <div
            key={index}
            onClick={() => onImageClick?.(index)}
            style={{
              // scroll-snap
              scrollSnapAlign: 'center',
              flex: '0 0 auto',
              cursor: onImageClick ? 'pointer' : 'default',
            }}
          >
            <img
              src={imageUrl}
              alt="Auction Image"
              style={{ height: '100%' }}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <div
      className="flex items-center justify-center bg-gray-200"
      style={{ height: '200px' }}
    >
      경매 사진이 존재하지 않아요
    </div>
  );
}
