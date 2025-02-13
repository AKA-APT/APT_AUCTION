import { Auction, AuctionParams } from '@/models/auction';
import { httpClient } from '@/utils/http-client';

export function getAuctions(params: AuctionParams) {
  return httpClient.get<Auction[]>('/api/v1/auctions', { params });
}
