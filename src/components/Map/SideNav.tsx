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
import {
  LuMapPin,
  LuTag,
  LuBuilding,
  LuConstruction,
  LuBadgeDollarSign,
  LuCalendarDays,
  LuListChecks,
} from 'react-icons/lu';

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
      className="fixed left-0 top-[65px] z-10 h-[calc(100vh-65px)] w-[max(35%,20rem)] rounded-r-lg bg-gray-50 p-2 shadow-lg"
      style={{
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <div className="flex h-14 items-center justify-between rounded-t-md border-b bg-white px-4">
        <div className="bold text-xl font-bold text-blue-600">매물 정보</div>
        <div className="flex items-center">
          <button
            className="mr-2 flex size-4 items-center justify-center rounded-none hover:opacity-75"
            style={{ background: 'none', outline: 'none', border: 'none' }}
            onClick={() => {
              if (isPending) return;
              handleLikeClick();
            }}
            title={
              selectedAuction?.isInterested
                ? '관심 목록에서 제거'
                : '관심 목록에 추가'
            }
          >
            {selectedAuction?.isInterested ? '❤️' : '🤍'}
          </button>
          <button
            onClick={closeNav}
            className="flex size-8 items-center justify-center rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            style={{ boxSizing: 'border-box' }}
            title="닫기"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="space-y-4 p-2">
        <div className="rounded-md border bg-white p-4 shadow-sm">
          <Suspense>
            <InvestmentTags auctionId={auctionId} />
          </Suspense>
        </div>
        <div className="rounded-md border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center">
            <LuMapPin className="mr-2 size-5 text-blue-500" />
            <h2 className="text-lg font-semibold">
              {auction.auctionObjectList[0]?.address || '주소 정보 없음'}
            </h2>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center">
              <LuTag className="mr-2 size-4 text-gray-500" />
              <span>
                최저입찰가:{' '}
                {commaizeNumber(
                  auction.disposalGoodsExecutionInfo.firstAuctionPrice,
                )}
                원
              </span>
            </div>
            <div className="flex items-center">
              <LuBadgeDollarSign className="mr-2 size-4 text-gray-500" />
              <span>
                감정가:{' '}
                {commaizeNumber(
                  auction.disposalGoodsExecutionInfo.appraisedValue,
                )}
                원
              </span>
            </div>
            <div className="flex items-center">
              <LuBuilding className="mr-2 size-4 text-gray-500" />
              <span>
                층수: {auction.disposalGoodsExecutionInfo.floorCount}층
              </span>
            </div>
            <div className="flex items-center">
              <LuConstruction className="mr-2 size-4 text-gray-500" />
              <span>
                구조:{' '}
                {auction.auctionObjectList[0]?.buildingStructure || '정보 없음'}
              </span>
            </div>
            <div className="flex items-center">
              <LuBadgeDollarSign className="mr-2 size-4 text-gray-500" />
              <span>
                최근 거래가:{' '}
                {auction.latestBiddingPrice
                  ? `${auction.latestBiddingPrice.toLocaleString()}원`
                  : '정보 없음'}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-md border bg-white p-4 shadow-sm">
          <AuctionCardImage auctionId={auctionId} />
        </div>
        {auctionSchedules.length > 0 && (
          <div className="rounded-md border bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center text-xl font-bold text-blue-600">
              <LuCalendarDays className="mr-2 size-5" />
              경매일정
            </div>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              {auctionSchedules.map((schedule) => (
                <li key={schedule.auctionDate}>
                  {schedule.auctionDate} - 최저입찰가:{' '}
                  {commaizeNumber(schedule.totalAuctionPrice)}원
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="rounded-md border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center text-xl font-bold text-blue-600">
            <LuListChecks className="mr-2 size-5" />
            감정평가
          </div>
          <ul className="space-y-2">
            {auction.evaluationList.map((evaluation) => (
              <li
                key={evaluation.evaluationItemCode}
                className="rounded border border-blue-200 bg-blue-50 p-2 text-sm"
              >
                <div className="font-medium">ㆍ{evaluation.evaluationItem}</div>
                <p className="text-gray-700">{evaluation.evaluationContent}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="sticky bottom-0 -m-2 rounded-b-lg bg-gray-50 pt-2">
          <입찰하기 auctionId={auctionId} />
        </div>
      </div>
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

  const minBidPrice =
    auction.latestBiddingPrice ||
    auction.disposalGoodsExecutionInfo.firstAuctionPrice;

  return (
    <>
      <div className="grid grid-cols-2 gap-px bg-gray-200 px-4 py-2 text-center text-sm">
        <div className="rounded-l bg-white p-2">
          최저 입찰가:
          <br />{' '}
          <span className="font-semibold">{commaizeNumber(minBidPrice)}원</span>
        </div>
        <div className="rounded-r bg-white p-2">
          예상 낙찰가:
          <br />{' '}
          <span className="font-semibold text-blue-600">
            {commaizeNumber(minBidPrice)}원
          </span>
        </div>
      </div>
      <input
        placeholder="입찰가를 입력하세요"
        className="h-12 w-full border-t border-gray-300 p-4 text-right"
        value={
          biddingPrice === null || biddingPrice === 0
            ? ''
            : commaizeNumber(biddingPrice ?? 0)
        }
        onChange={(e) => {
          const value = e.target.value.replace(/,/g, '');
          if (value === '' || /^[0-9]+$/.test(value)) {
            setBiddingPrice(value === '' ? null : Number(value));
          }
        }}
      />
      <button
        className="h-12 w-full rounded-b-md bg-blue-500 text-white shadow-md transition-shadow hover:bg-blue-600 hover:shadow-lg"
        onClick={() => {
          if (biddingPrice == null || biddingPrice < minBidPrice) {
            toast.error(
              `입찰가는 최저 입찰가(${commaizeNumber(minBidPrice)}원) 이상이어야 합니다.`,
            );
            return;
          }
          handleBidding();
        }}
        disabled={biddingPrice === null}
      >
        입찰하기
      </button>
    </>
  );
}
