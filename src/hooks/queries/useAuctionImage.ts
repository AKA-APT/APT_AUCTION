import { getAuctionImage } from '@/remotes/auction';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useSuspenseAuctionImage = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['getAuctionImage', id],
    queryFn: () => getAuctionImage(id),
    staleTime: 300000, // 5분 동안 캐시 유지
    retry: 1, // 실패 시 1번만 재시도
    refetchOnWindowFocus: false, // 창 포커스 시 자동 갱신 방지
  });
};

export const useAuctionImage = (id: string) => {
  return useQuery({
    queryKey: ['getAuctionImage', id],
    queryFn: () => getAuctionImage(id),
    staleTime: 300000, // 5분 동안 캐시 유지
    retry: 1, // 실패 시 1번만 재시도
    refetchOnWindowFocus: false, // 창 포커스 시 자동 갱신 방지
  });
};
