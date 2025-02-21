import { GeoAuctionGroup, AuctionParams } from '@/models/auction';
import { httpClient } from '@/utils/http-client';

export function getAuctions(params: AuctionParams) {
  return httpClient.get<GeoAuctionGroup[]>('/api/v2/auctions', { params });
}
