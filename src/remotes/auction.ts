import {
  GeoAuctionGroup,
  AuctionParams,
  DetailAuction,
  AuctionImage,
  AuctionStatus,
  AuctionInvestmentTag,
  AccupantInfo,
} from '@/models/auction';
import { httpClient } from '@/utils/http-client';

export function getAuctions({
  isResult,
  lbLat,
  lbLng,
  rtLat,
  rtLng,
}: AuctionParams) {
  return httpClient.get<GeoAuctionGroup[]>('/api/v2/auctions', {
    params: {
      lbLat,
      lbLng,
      rtLat,
      rtLng,
      isInProgress: !isResult,
    },
  });
}

export function getAuction(id: string) {
  return httpClient.get<DetailAuction>(`/api/v2/auctions/${id}`);
}

export function getAuctionDetails(id: string) {
  return httpClient.get<{ 
    occupantInfoList: AccupantInfo[], 
    photoCount: number
  }>(
    `/api/v2/auctions/${id}/details`,
  );
}

export function toggleLikeAuction(id: string) {
  return httpClient.put(`/api/v2/auctions/interests/${id}`);
}

export function getPictureLst(id: string) {
  return httpClient.get<string[]>(`/api/v2/auctions/${id}/pictures`);
}

// 단일 이미지를 가져오는 함수
function getSingleImage(id: string, index: number) {
  return httpClient.get<ArrayBuffer>(`/api/v2/auctions/${id}/images/${index}`, {
    responseType: 'arraybuffer'
  }).then(data => {
    if (!data) return null;
    
    try {
      // ArrayBuffer를 Uint8Array로 변환
      const bytes = new Uint8Array(data);
      
      // Uint8Array를 base64 문자열로 변환
      let binary = '';
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = btoa(binary);
      
      return { picFile: base64 };
    } catch (error) {
      console.error(`이미지 ${index} 변환 중 오류:`, error);
      return null;
    }
  });
}

// 경매 상세 정보를 통해 모든 이미지를 가져오는 함수
export async function getAuctionImage(id: string) {
  try {
    // details API에서 photoCount 정보 가져오기
    const { photoCount } = await getAuctionDetails(id);
    
    if (typeof photoCount !== 'number' || photoCount <= 0) {
      return [];
    }
    
    // 모든 이미지 요청 생성
    const imagePromises = [];
    for (let i = 0; i < photoCount; i++) {
      imagePromises.push(getSingleImage(id, i));
    }
    
    // 모든 이미지 요청 병렬 처리
    const results = await Promise.all(imagePromises);
    
    // null이 아닌 결과만 반환
    return results.filter(result => result !== null);
  } catch (error) {
    console.error('이미지 로드 중 오류:', error);
    return [];
  }
}

export function getAuctionStatus(id: string) {
  return httpClient.get<AuctionStatus>(`/api/v2/auctions/${id}/status`);
}

export function getAuctionInvestmentTags(id: string) {
  return httpClient.get<AuctionInvestmentTag[]>(
    `/api/v2/auctions/${id}/investment-tags`,
  );
}
