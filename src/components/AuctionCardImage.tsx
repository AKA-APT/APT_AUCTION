import { useAuctionImage } from '@/hooks/queries/useAuctionImage';
import { Suspense } from 'react';

export function AuctionCardImage({ auctionId }: { auctionId: string }) {
  return (
    <Suspense fallback={<div style={{ height: '200px' }}></div>}>
      <CardImage auctionId={auctionId} />
    </Suspense>
  );
}

function CardImage({ auctionId }: { auctionId: string }) {
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
      <div className="absolute left-2 top-2 rounded-full border-2 bg-orange-600 px-2 py-1 pr-4 text-white">
        ㆍ경매예정
      </div>
      {imageList.map((image) => {
        const imageUrl = `data:image/jpeg;base64,${image.picFile}`;

        return (
          <div
            style={{
              // scroll-snap
              scrollSnapAlign: 'center',
              flex: '0 0 auto',
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
