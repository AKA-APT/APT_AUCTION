import { AuctionParams } from '@/models/auction';
import { getAuctions } from '@/remotes/auction';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAuctions = (params: AuctionParams) => {
  return useSuspenseQuery({
    queryKey: [
      'getAuctions',
      params.lbLat,
      params.lbLng,
      params.rtLat,
      params.rtLng,
      params.isResult,
    ],
    queryFn: () => getAuctions(params),
  });
};
