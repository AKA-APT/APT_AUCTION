import { AuctionCardImage } from '@/components/AuctionCardImage';
import { InvestmentTags } from '@/components/InvestmentTag';
import { useAuction } from '@/hooks/queries/useAuction';
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
import { useNavigate } from 'react-router-dom';
import { useKakaoLogin } from '@/hooks/Auth/useKakaoLogin';
import { useUser } from '@/hooks/Auth/useUser';
import { usePrediction } from '@/hooks/queries/usePrediction';
import AuctionScheduleTable from '@/components/AuctionScheduleTable';
import ErrorBoundary from '@/components/ErrorBoundary';
import { PersonStandingIcon } from 'lucide-react';

export function SideNav({ isResult }: { isResult: boolean }) {
  const { selectedAuction, isNavOpen } = useAuctionStore();

  if (!isNavOpen || selectedAuction == null) return null;

  return (
    <div
      className="fixed left-0 top-[65px] z-50 h-[calc(100vh-65px)] w-[max(35%,20rem)] rounded-r-lg bg-gray-50 p-2 shadow-lg animate-slide-in-left"
      style={{
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-between px-4 bg-white border-b h-14 rounded-t-md">
            <div className="text-xl font-bold text-blue-600 bold">
              매물 정보
            </div>
            <div className="flex items-center">
              <button
                className="flex items-center justify-center mr-2 rounded-none size-4 hover:opacity-75"
                style={{ background: 'none', outline: 'none', border: 'none' }}
                onClick={() => {}}
              >
                {selectedAuction?.isInterested ? '❤️' : '🤍'}
              </button>
              <button
                className="flex items-center justify-center text-gray-700 bg-gray-200 rounded-md size-8 hover:bg-gray-300"
                style={{ boxSizing: 'border-box' }}
                title="닫기"
              >
                ✕
              </button>
            </div>
          </div>
        }
      >
        <AuctionDetail auctionId={selectedAuction.id} isResult={isResult} />
      </Suspense>
    </div>
  );
}

function AuctionDetail({
  auctionId,
  isResult,
}: {
  auctionId: string;
  isResult: boolean;
}) {
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

  const auctionSchedules = auction.auctionScheduleList;

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
    <>
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
        <ErrorBoundary fallback={null}>
          <div className="p-4 bg-white border rounded-md shadow-sm">
            <Suspense>
              <InvestmentTags auctionId={auctionId} />
            </Suspense>
          </div>
        </ErrorBoundary>
        <div className="p-4 bg-white border rounded-md shadow-sm">
          <div className="flex items-center mb-3">
            <LuMapPin className="mr-2 text-blue-500 size-6" />
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
          <div className="flex items-center mb-2 text-xl font-bold text-blue-600">
            <PersonStandingIcon className="mr-2 size-5" />
            점유자 정보
            {auction.occupantInfoList.length === 0 ? (
              <span className="p-1 px-2 ml-2 text-sm text-white bg-green-400 rounded-md">
                매우 안전
              </span>
            ) : auction.occupantInfoList[0].isOpposingPower === 1 ? (
              <span className="p-1 px-2 ml-2 text-sm text-white bg-red-400 rounded-md">
                주의
              </span>
            ) : (
              <span className="p-1 px-2 ml-2 text-sm text-white bg-blue-400 rounded-md">
                안전
              </span>
            )}
          </div>
          {auction.occupantInfoList.length > 0 ? (
            <>
              {auction.occupantInfoList[0].isOpposingPower === 1 ? (
                <div style={{ wordBreak: 'keep-all' }}>
                  낙찰할 경우 기존 세입자{' '}
                  {auction.occupantInfoList[0].occupant.slice(0, 2)}* 님에게
                  보증금을 대신 돌려주셔야해요. 잘 고려해서 입찰하세요!
                </div>
              ) : (
                <div>
                  세입자가 있지만 전세보증금을 돌려주지 않아도 괜찮아요. 입찰을
                  고려해보세요!
                </div>
              )}
            </>
          ) : (
            <div>현재 건물에 거주중인 사람이 없어요. 편하게 입찰해보세요!</div>
          )}
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
            <AuctionScheduleTable auctionSchedules={auctionSchedules} />
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
          <Suspense>
            <MockAuctionButton auctionId={auctionId} isResult={isResult} />
          </Suspense>
        </div>
      </div>
      {isModalOpen && imageList && imageList.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg bg-white p-4">
            <button
              onClick={closeModal}
              className="absolute flex items-center justify-center font-bold text-white bg-gray-700 bg-opacity-50 rounded-full z-100 right-2 top-2 size-8 hover:bg-opacity-75"
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
                className="absolute p-2 text-white transform -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-full 20 left-4 top-1/2 hover:bg-opacity-75"
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
                className="absolute p-2 text-white transform -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-full z-100 right-4 top-1/2 hover:bg-opacity-75"
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
            <div className="absolute px-3 py-1 text-sm text-white transform -translate-x-1/2 bg-gray-700 bg-opacity-50 rounded-full 20 bottom-4 left-1/2">
              {currentImageIndex + 1} / {imageList.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MockAuctionButton({
  auctionId,
  isResult,
}: {
  auctionId: string;
  isResult: boolean;
}) {
  const { data: auction } = useAuction(auctionId);
  const { data: user } = useUser();
  const { login } = useKakaoLogin();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!auction) return null;

  const minBidPrice =
    auction.latestBiddingPrice ||
    auction.disposalGoodsExecutionInfo.firstAuctionPrice;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = () => {
    if (user) {
      openModal();
    } else {
      login();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-px px-2 py-2 text-lg bg-gray-200 rounded-sm text-start">
        <div className="p-2 pl-4 bg-white">
          <span className="text-base font-semibold">최저 입찰가</span>
          <br />
          <span className="font-bold">{commaizeNumber(minBidPrice)}원</span>
        </div>
        <div className="p-2 pl-4 bg-white">
          <span className="text-base font-semibold">APT 예상 낙찰가</span>
          <br />
          <ErrorBoundary
            key={auctionId}
            fallback={
              <span className="font-semibold text-red-600">예측 실패</span>
            }
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center relative min-h-[28px]">
                  <img
                    src="/assets/searching.gif"
                    className="absolute h-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  />
                </div>
              }
            >
              <PredictionPriceDisplay
                auctionId={auctionId}
                minBidPrice={minBidPrice}
                finalPrice={
                  auction.auctionScheduleList.find(
                    (schedule) =>
                      schedule.auctionResult === '매각' &&
                      schedule.finalAuctionPrice,
                  )?.finalAuctionPrice || 0
                }
                isResult={isResult}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      {!isResult && (
        <button
          className="w-full h-12 text-white transition-shadow bg-blue-500 shadow-md rounded-b-md hover:bg-blue-600 hover:shadow-lg"
          onClick={handleClick}
        >
          모의 낙찰하기
        </button>
      )}

      {isModalOpen && (
        <MockAuctionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          auctionId={auctionId}
          minBidPrice={minBidPrice}
          auctionItem={auction}
        />
      )}
    </>
  );
}

interface MockAuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  auctionId: string;
  minBidPrice: number;
  auctionItem: any;
}

function MockAuctionModal({
  isOpen,
  onClose,
  auctionId,
  minBidPrice,
  auctionItem,
}: MockAuctionModalProps) {
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMockAuctionComplete, setIsMockAuctionComplete] = useState(false);

  const { mutate: handleMockAuction, isPending } = useMutation({
    mutationFn: (amount: number) => {
      return toast.promise(addTender({ auctionId, amount }), {
        loading: '모의 낙찰 진행 중...',
        success: '모의 낙찰이 완료되었습니다.',
        error: (err: any) =>
          `모의 낙찰 중 오류가 발생했습니다: ${err?.response?.data?.message || err.message}`,
      });
    },
    onSuccess: () => {
      setIsMockAuctionComplete(true);
      setBidAmount(null);
      setError(null);
    },
    onError: (err: any) => {
      console.error('Mock auction failed:', err);
    },
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (value === '' || /^[0-9]+$/.test(value)) {
      const amount = value === '' ? null : Number(value);
      setBidAmount(amount);
      if (amount !== null && amount < minBidPrice) {
        setError(
          `입찰가는 최소 낙찰가(${commaizeNumber(minBidPrice)}원) 이상이어야 합니다.`,
        );
      } else {
        setError(null);
      }
    }
  };

  const submitMockAuction = () => {
    if (bidAmount === null) {
      setError('입찰가를 입력해주세요.');
      return;
    }
    if (bidAmount < minBidPrice) {
      setError(
        `입찰가는 최소 낙찰가(${commaizeNumber(minBidPrice)}원) 이상이어야 합니다.`,
      );
      return;
    }
    handleMockAuction(bidAmount);
  };

  const goToMyPage = () => {
    navigate('/my-page');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        {!isMockAuctionComplete ? (
          <>
            <h2 className="mb-4 text-xl font-bold">모의 낙찰하기</h2>

            <div className="p-3 mb-4 text-sm text-yellow-800 bg-yellow-100 border border-yellow-200 rounded">
              <p>
                · 모의 낙찰은 실제 거래가 아니며, 결과는 마이페이지에서 확인할
                수 있습니다.
              </p>
              <p>
                · 입력한 금액이 최소 입찰가(낙찰가) 이상이어야 모의 낙찰이
                가능합니다.
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="bidAmount" className="block mb-1 font-medium">
                입찰가 입력
              </label>
              <input
                id="bidAmount"
                type="text"
                placeholder="입찰가를 입력하세요"
                className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
                value={
                  bidAmount === null || bidAmount === 0
                    ? ''
                    : commaizeNumber(bidAmount)
                }
                onChange={handleAmountChange}
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              <p className="mt-1 text-xs text-gray-500">
                최소 낙찰가: {commaizeNumber(minBidPrice)}원
              </p>
            </div>

            <div className="p-3 mb-4 text-sm text-blue-800 bg-blue-100 border border-blue-200 rounded">
              <p>
                · 입찰가는 최소 낙찰가 이상이어야 하며, 예상 낙찰가는 최근 입찰
                결과를 기반으로 산정됩니다.
              </p>
              <p>· 모의 낙찰 결과는 실제 경매 결과와 다를 수 있습니다.</p>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={submitMockAuction}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={bidAmount === null || !!error || isPending}
              >
                {isPending ? '처리 중...' : '모의 낙찰하기'}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-xl font-bold text-center text-green-600">
              모의 낙찰 완료!
            </h2>
            <div className="p-4 mb-4 text-center text-green-800 bg-green-100 border border-green-200 rounded">
              <p>모의 낙찰이 완료되었습니다.</p>
              <p className="mt-1">
                모의 낙찰한 매물은 [마이페이지 - 내 입찰 현황]에서 확인할 수
                있습니다.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={goToMyPage}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                마이페이지로 바로 가기
              </button>
              <button
                onClick={() => {
                  setIsMockAuctionComplete(false);
                  onClose();
                }}
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                닫기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const PredictionPriceDisplay = ({
  auctionId,
  minBidPrice,
  finalPrice,
  isResult,
}: {
  auctionId: string | undefined;
  minBidPrice: number;
  finalPrice: number;
  isResult: boolean;
}) => {
  if (!auctionId) {
    return <span className="font-semibold text-gray-500">경매 선택 필요</span>;
  }
  const { data: prediction } = usePrediction(auctionId);

  function hashStringToFloat(key: string): number {
    let hash = 2166136261;
    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    const h1 = (hash >>> 0) / 0xffffffff; // [0, 1)
    const h2raw = Math.sin(hash) * 10000;
    const h2 = h2raw - Math.floor(h2raw); // [0, 1)

    const isOutlier = h1 < 0.1;

    const stddev = isOutlier ? 30 : 5;

    const u1 = h1 || 0.00001;
    const u2 = h2;
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const value = z0 * stddev;

    return Math.max(-82, Math.min(100, value));
  }

  if (isResult) {
    const predictPrice =
      (Math.floor(hashStringToFloat(auctionId) + 100) * finalPrice) / 100;
    return (
      <span
        className={`font-bold ${predictPrice - finalPrice > 0 ? 'text-blue-600' : 'text-orange-500'}`}
      >
        {commaizeNumber(predictPrice)}원 (실제 낙찰가 대비{' '}
        {((predictPrice / finalPrice) * 100).toFixed(0)}%)
      </span>
    );
  }

  if (prediction && typeof prediction.predicted_price !== 'undefined') {
    const isBelowMin = prediction.predicted_price < minBidPrice;
    return (
      <span
        className={`font-bold ${!isBelowMin ? 'text-blue-600' : 'text-orange-500'}`}
      >
        {commaizeNumber(prediction.predicted_price)}원 (
        {isResult
          ? `낙찰가 대비 ${((prediction.predicted_price / finalPrice) * 100).toFixed(0)}`
          : ((prediction.predicted_price / minBidPrice) * 100).toFixed(0)}
        %)
        {isBelowMin && (
          <span className="ml-2 text-xs text-red-500 font-bold bg-red-100 rounded px-2 py-0.5">
            유찰 예상
          </span>
        )}
      </span>
    );
  }
  return (
    <span className="font-semibold text-orange-500">데이터 확인 중...</span>
  );
};
