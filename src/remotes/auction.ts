import {
  GeoAuctionGroup,
  AuctionParams,
  DetailAuction,
  AuctionImage,
  AuctionStatus,
  AuctionInvestmentTag,
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

export function getAuctionImage(id: string) {
  return httpClient.get<AuctionImage[] | null>(`/api/v2/auctions/${id}/images`);
}

export function getAuctionStatus(id: string) {
  return httpClient.get<AuctionStatus>(`/api/v2/auctions/${id}/status`);
}

export function getAuctionInvestmentTags(id: string) {
  return httpClient.get<AuctionInvestmentTag[]>(
    `/api/v2/auctions/${id}/investment-tags`,
  );
}
