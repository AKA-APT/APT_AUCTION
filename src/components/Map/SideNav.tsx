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
import { useAuctionImage } from '@/hooks/queries/useAuctionImage';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (selectedAuction == null) {
    throw new Error('selectedAuction is null');
  }

  const { data: auction } = useAuction(auctionId);
  const { data: imageList } = useAuctionImage(auctionId);

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

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNextImage = () => {
    if (imageList && currentImageIndex < imageList.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const showPrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div
      className="fixed left-0 top-[65px] z-10 h-[calc(100vh-65px)] w-[max(35%,20rem)] rounded-r-lg bg-gray-50 p-2 shadow-lg"
      style={{
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <div className="flex items-center justify-between px-4 bg-white border-b h-14 rounded-t-md">
        <div className="text-xl font-bold text-blue-600 bold">매물 정보</div>
        <div className="flex items-center">
          <button
            className="flex items-center justify-center mr-2 rounded-none size-4 hover:opacity-75"
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
            className="flex items-center justify-center text-gray-700 bg-gray-200 rounded-md size-8 hover:bg-gray-300"
            style={{ boxSizing: 'border-box' }}
            title="닫기"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="p-2 space-y-4">
        <div className="p-4 bg-white border rounded-md shadow-sm">
          <Suspense>
            <InvestmentTags auctionId={auctionId} />
          </Suspense>
        </div>
        <div className="p-4 bg-white border rounded-md shadow-sm">
          <div className="flex items-center mb-3">
            <LuMapPin className="mr-2 text-blue-500 size-5" />
            <h2 className="text-lg font-semibold">
              {auction.auctionObjectList[0]?.address || '주소 정보 없음'}
            </h2>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center">
              <LuTag className="mr-2 text-gray-500 size-4" />
              <span>
                최저입찰가:{' '}
                {commaizeNumber(
                  auction.disposalGoodsExecutionInfo.firstAuctionPrice,
                )}
                원
              </span>
            </div>
            <div className="flex items-center">
              <LuBadgeDollarSign className="mr-2 text-gray-500 size-4" />
              <span>
                감정가:{' '}
                {commaizeNumber(
                  auction.disposalGoodsExecutionInfo.appraisedValue,
                )}
                원
              </span>
            </div>
            <div className="flex items-center">
              <LuBuilding className="mr-2 text-gray-500 size-4" />
              <span>
                층수: {auction.disposalGoodsExecutionInfo.floorCount}층
              </span>
            </div>
            <div className="flex items-center">
              <LuConstruction className="mr-2 text-gray-500 size-4" />
              <span>
                구조:{' '}
                {auction.auctionObjectList[0]?.buildingStructure || '정보 없음'}
              </span>
            </div>
            <div className="flex items-center">
              <LuBadgeDollarSign className="mr-2 text-gray-500 size-4" />
              <span>
                최근 거래가:{' '}
                {auction.latestBiddingPrice
                  ? `${auction.latestBiddingPrice.toLocaleString()}원`
                  : '정보 없음'}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white border rounded-md shadow-sm">
          <AuctionCardImage auctionId={auctionId} onImageClick={openModal} />
        </div>
        {auctionSchedules.length > 0 && (
          <div className="p-4 bg-white border rounded-md shadow-sm">
            <div className="flex items-center mb-2 text-xl font-bold text-blue-600">
              <LuCalendarDays className="mr-2 size-5" />
              경매일정
            </div>
            <ul className="pl-5 space-y-1 text-sm text-gray-700 list-disc">
              {auctionSchedules.map((schedule) => (
                <li key={schedule.auctionDate}>
                  {schedule.auctionDate} - 최저입찰가:{' '}
                  {commaizeNumber(schedule.totalAuctionPrice)}원
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="p-4 bg-white border rounded-md shadow-sm">
          <div className="flex items-center mb-2 text-xl font-bold text-blue-600">
            <LuListChecks className="mr-2 size-5" />
            감정평가
          </div>
          <ul className="space-y-2">
            {auction.evaluationList.map((evaluation) => (
              <li
                key={evaluation.evaluationItemCode}
                className="p-2 text-sm border border-blue-200 rounded bg-blue-50"
              >
                <div className="font-medium">ㆍ{evaluation.evaluationItem}</div>
                <p className="text-gray-700">{evaluation.evaluationContent}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="sticky bottom-0 pt-2 -m-2 rounded-b-lg bg-gray-50">
          <입찰하기 auctionId={auctionId} />
        </div>
      </div>
      {isModalOpen && imageList && imageList.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg bg-white p-4">
            <button
              onClick={closeModal}
              className="absolute z-10 flex items-center justify-center font-bold text-white bg-gray-700 bg-opacity-50 rounded-full right-2 top-2 size-8 hover:bg-opacity-75"
              title="닫기"
            >
              X
            </button>
            <img
              src={`data:image/jpeg;base64,${imageList[currentImageIndex].picFile}`}
              alt={`Auction Image ${currentImageIndex + 1}`}
              className="max-h-[80vh] w-auto object-contain"
            />
            {currentImageIndex > 0 && (
              <button
                onClick={showPrevImage}
                className="absolute z-10 p-2 text-white transform -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-full left-4 top-1/2 hover:bg-opacity-75"
                title="이전 이미지"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}
            {currentImageIndex < imageList.length - 1 && (
              <button
                onClick={showNextImage}
                className="absolute z-10 p-2 text-white transform -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-full right-4 top-1/2 hover:bg-opacity-75"
                title="다음 이미지"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
            <div className="absolute z-10 px-3 py-1 text-sm text-white transform -translate-x-1/2 bg-gray-700 bg-opacity-50 rounded-full bottom-4 left-1/2">
              {currentImageIndex + 1} / {imageList.length}
            </div>
          </div>
        </div>
      )}
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
      <div className="grid grid-cols-2 gap-px px-4 py-2 text-sm text-center bg-gray-200">
        <div className="p-2 bg-white rounded-l">
          최저 입찰가:
          <br />{' '}
          <span className="font-semibold">{commaizeNumber(minBidPrice)}원</span>
        </div>
        <div className="p-2 bg-white rounded-r">
          예상 낙찰가:
          <br />{' '}
          <span className="font-semibold text-blue-600">
            {commaizeNumber(minBidPrice)}원
          </span>
        </div>
      </div>
      <input
        placeholder="입찰가를 입력하세요"
        className="w-full h-12 p-4 text-right border-t border-gray-300"
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
        className="w-full h-12 text-white transition-shadow bg-blue-500 shadow-md rounded-b-md hover:bg-blue-600 hover:shadow-lg"
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
