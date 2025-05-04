import { useAuctionImage } from '@/hooks/queries/useAuctionImage';
import { Suspense } from 'react';

export function AuctionCardImage({
  auctionId,
  onImageClick,
}: {
  auctionId: string;
  onImageClick?: (index: number) => void;
}) {
  return (
    <Suspense fallback={<div style={{ height: '200px' }}></div>}>
      <CardImage auctionId={auctionId} onImageClick={onImageClick} />
    </Suspense>
  );
}

function CardImage({
  auctionId,
  onImageClick,
}: {
  auctionId: string;
  onImageClick?: (index: number) => void;
}) {
  const { data: imageList } = useAuctionImage(auctionId);
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
      <div className="absolute px-2 py-1 pr-4 text-white bg-orange-600 border-2 rounded-full left-2 top-2">
        ㆍ경매예정
      </div>
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
      경매를 마친 매물이예요
    </div>
  );
}
