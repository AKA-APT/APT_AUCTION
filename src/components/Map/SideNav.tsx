import { AuctionCardImage } from '@/components/AuctionCardImage';
import { InvestmentTags } from '@/components/InvestmentTag';
import { useAuction } from '@/hooks/queries/useAuction';
import { SimpleAuction } from '@/models/auction';
import { toggleLikeAuction } from '@/remotes/auction';
import { addTender } from '@/remotes/my-page';
import { useAuctionStore } from '@/stores/useAuctionStore';
import { commaizeNumber } from '@/utils/number';
import { useMutation } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import toast from 'react-hot-toast';

export function SideNav() {
  const { selectedAuction, isNavOpen } = useAuctionStore();

  if (!isNavOpen || selectedAuction == null) return null;

  return (
    <Suspense>
      <AuctionDetail auctionId={selectedAuction.id} />
    </Suspense>
  );
}

function AuctionDetail({ auctionId }: { auctionId: string }) {
  const { closeNav, selectedAuction, setSelectAuction } = useAuctionStore();

  if (selectedAuction == null) {
    throw new Error('selectedAuction is null');
  }

  const { data: auction } = useAuction(auctionId);

  const { mutate: handleLikeClick, isPending } = useMutation({
    mutationFn: () => toggleLikeAuction(auctionId),
    onSuccess: () => {
      setSelectAuction({
        ...selectedAuction,
        isInterested: !selectedAuction.isInterested,
      });
    },
  });

  const auctionSchedules = auction.auctionScheduleList.slice(
    0,
    // 마지막 건은 매각기일 예정일이므로 제외
    auction.auctionScheduleList.length - 1,
  );

  return (
    <div
      className="fixed left-0 top-[65px] z-10 h-[calc(100vh-65px)] w-[max(40%,24rem)] bg-white shadow-lg"
      style={{
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <div className="flex h-16 items-center justify-between border-b align-middle">
        <div className="bold p-4 text-xl font-bold">매물 정보</div>

        <button
          className="size-4items-center absolute right-12 flex justify-center rounded-none"
          style={{ background: 'none', outline: 'none', border: 'none' }}
          onClick={() => {
            if (isPending) return;
            handleLikeClick();
          }}
        >
          {selectedAuction?.isInterested ? '❤️' : '🤍'}
        </button>

        <button
          onClick={closeNav}
          className="absolute right-4 flex size-4 h-10 w-10 items-center justify-center rounded-none bg-red-500 text-white"
          style={{ boxSizing: 'border-box' }}
        >
          ✕
        </button>
      </div>
      <div className="pl-4 pt-4">
        <Suspense>
          <InvestmentTags auctionId={auctionId} />
        </Suspense>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">
          {auction.auctionObjectList[0]?.address || '주소 정보 없음'}
        </h2>
        <div className="mt-4">
          최저입찰가:{' '}
          {commaizeNumber(auction.disposalGoodsExecutionInfo.firstAuctionPrice)}
          원
        </div>
        <div className="mt-2">
          감정가:{' '}
          {commaizeNumber(auction.disposalGoodsExecutionInfo.appraisedValue)}원
        </div>
        <div className="mt-2">
          층수: {auction.disposalGoodsExecutionInfo.floorCount}층
        </div>
        <div className="mt-2">
          구조: {auction.auctionObjectList[0]?.buildingStructure || '정보 없음'}
        </div>
        <div className="mt-2">
          최근 거래가:{' '}
          {auction.latestBiddingPrice
            ? `${auction.latestBiddingPrice.toLocaleString()}원`
            : '정보 없음'}
        </div>
      </div>
      <div className="p-4">
        <AuctionCardImage auctionId={auctionId} />
      </div>
      {auctionSchedules.length < 1 ? null : (
        <>
          <div className="mt-1 border-b pb-1 pl-4 text-xl font-bold">
            경매일정
          </div>
          <ul className="p-4">
            {auctionSchedules.map((schedule) => (
              <li key={schedule.auctionDate}>
                {schedule.auctionDate} - 최저입찰가:{' '}
                {commaizeNumber(schedule.totalAuctionPrice)}원
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-1 border-b pb-1 pl-4 text-xl font-bold">감정평가</div>
      <ul className="p-4">
        {auction.evaluationList.map((evaluation) => (
          <li
            key={evaluation.evaluationItemCode}
            style={{
              border: '1px solid #c9e1ff',
              backgroundColor: '#f9fdff',
              padding: '4px',
              marginTop: 4,
              borderRadius: 4,
            }}
          >
            <div className="font-bold">ㆍ{evaluation.evaluationItem}</div>
            {evaluation.evaluationContent}
          </li>
        ))}
      </ul>
      <입찰하기 auctionId={auctionId} />
    </div>
  );
}

function 입찰하기({ auctionId }: { auctionId: string }) {
  const { data: auction } = useAuction(auctionId);
  const [biddingPrice, setBiddingPrice] = useState<number | null>(null);
  const { mutate: handleBidding } = useMutation({
    mutationFn: () => {
      if (biddingPrice == null) return Promise.reject('biddingPrice is null');
      return toast.promise(addTender({ auctionId, amount: biddingPrice }), {
        loading: '입찰 진행중..',
        success: '입찰에 성공했습니다.',
        error: (err) => `${err.response.data.message}`,
      });
    },
  });

  return (
    <div className="sticky bottom-0 w-full">
      <div className="flex h-12 items-center justify-center bg-gray-100">
        최저 입찰가: {commaizeNumber(auction.latestBiddingPrice)}원
      </div>
      <div className="flex h-12 items-center justify-center bg-gray-100">
        <span>
          예상 낙찰가:{' '}
          <span className="text-blue-500">
            {/* TODO: 계산해둔 예상 낙찰가 */}
            {commaizeNumber(auction.latestBiddingPrice)}
          </span>
          원
        </span>
      </div>
      <input
        placeholder="입찰가를 입력하세요"
        className="h-12 w-full border-t border-gray-300 p-4"
        value={
          biddingPrice === null || biddingPrice === 0
            ? undefined
            : commaizeNumber(biddingPrice ?? 0)
        }
        onChange={(e) => {
          const value = e.target.value.replace(/,/g, '');
          if (isNaN(Number(value))) {
            return;
          }
          setBiddingPrice(Number(value));
        }}
      />
      <button
        className="h-12 w-full bg-blue-500 text-white"
        style={{ borderRadius: 0 }}
        onClick={() => {
          if (biddingPrice == null) return;
          handleBidding();
        }}
      >
        입찰하기
      </button>
    </div>
  );
}
