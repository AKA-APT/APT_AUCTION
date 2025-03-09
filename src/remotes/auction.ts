import {
  GeoAuctionGroup,
  AuctionParams,
  DetailAuction,
} from '@/models/auction';
import { httpClient } from '@/utils/http-client';

export function getAuctions(params: AuctionParams) {
  return httpClient.get<GeoAuctionGroup[]>('/api/v2/auctions', { params });
}

export function getAuction(id: string) {
  return httpClient.get<DetailAuction>(`/api/v2/auctions/${id}`);
}

export function toggleLikeAuction(id: string) {
  return httpClient.put(`/api/v2/auctions/interests/${id}`);
}

export function getPictureLst(id: string) {
  return httpClient.get<string[]>(`/api/v2/auctions/${id}/pictures`);
}
