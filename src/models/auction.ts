export interface AuctionParams {
  lbLat: number;
  lbLng: number;
  rtLat: number;
  rtLng: number;
  failedBidCount: number;
}

export interface GeoAuctionGroup {
  latitude: number;
  longitude: number;
  totalCount: number;
  auctions: SimpleAuction[];
}

export interface SimpleAuction {
  id: string;
  caseBaseInfo: CaseBaseInfo;
  auctionObject: AuctionObject;
  isBidding: boolean;
  isInterested: boolean;
}

/**
 * 아파트 경매 관련 데이터 타입 정의
 */

/**
 * 사건 기본 정보
 */
interface CaseBaseInfo {
  /** 법원 코드 */
  courtCode: string;
  /** 법원명 */
  courtName: string;
  /** 지원 법원명 */
  supportCourtName: string;
  /** 사건 번호 */
  caseNumber: string;
  /** 사건 유형 (예: 부동산임의경매) */
  caseType: string;
  /** 사건 접수일 */
  caseReceivedDate: string;
  /** 사건 결정일 */
  caseDecisionDate: string;
  /** 청구 금액 */
  claimAmount: number;
  /** 경매 중지 상태 코드 */
  auctionSuspensionStatus: string;
  /** 담당 부서 코드 */
  departmentCode: string;
  /** 담당 부서명 */
  departmentName: string;
  /** 담당 부서 전화번호 */
  departmentPhone: string;
  /** 소송 유형 코드 */
  lawsuitTypeCode: string;
  /** 사용자 사건 번호 */
  userCaseNumber: string;
}

/**
 * 관할청 요구 정보
 */
interface DistrictDemandInfo {
  /** 요구 코드 */
  demandCode: string;
  /** 최종 발급일 */
  lastIssuedDate: string;
}

/**
 * 매각물건 집행 정보
 */
interface DisposalGoodsExecutionInfo {
  /** 법원 코드 */
  courtCode: string;
  /** 사건 번호 */
  caseNumber: string;
  /** 매각 물건 순번 */
  disposalGoodsSequence: number;
  /** 경매 물건 상태 코드 */
  auctionGoodsStatus: string;
  /** 물건 명세일 */
  goodsSpecificationDate: string;
  /** 비고 */
  remarks: string | null;
  /** 근저당권 등 상세 정보 */
  mortgageDetails: string;
  /** 추가 비고 */
  additionalRemarks: string | null;
  /** 경매 물건 용도 코드 */
  auctionGoodsUsageCode: string;
  /** 층수 */
  floorCount: number;
  /** 감정가 */
  appraisedValue: number;
  /** 최저 입찰가 (1회차) */
  firstAuctionPrice: number;
  /** 최저 입찰가 (2회차) */
  secondAuctionPrice: number | null;
  /** 최저 입찰가 (3회차) */
  thirdAuctionPrice: number | null;
  /** 최저 입찰가 (4회차) */
  fourthAuctionPrice: number | null;
  /** 입찰 유형 코드 */
  bidTypeCode: string;
  /** 경매 날짜 */
  auctionDate: string;
  /** 1차 경매 시간 */
  firstAuctionTime: string;
  /** 2차 경매 시간 */
  secondAuctionTime: string | null;
  /** 3차 경매 시간 */
  thirdAuctionTime: string | null;
  /** 4차 경매 시간 */
  fourthAuctionTime: string | null;
  /** 경매 결정일 */
  auctionDecisionDate: string;
  /** 경매 관련 문서 ID */
  auctionDocumentId: string;
  /** 경매 집행 상태 코드 */
  auctionExecutionStatusCode: string;
  /** 경매 장소 */
  auctionPlace: string;
  /** 경매 결정 시간 */
  auctionDecisionTime: string;
  /** 경매 결정 장소 */
  auctionDecisionPlace: string;
  /** 입찰 시작일 */
  bidStartDate: string | null;
  /** 입찰 종료일 */
  bidEndDate: string | null;
  /** 법원명 */
  courtName: string;
  /** 지원 법원명 */
  supportCourtName: string;
  /** 부동산 유형 코드 */
  realEstateType: string;
  /** 승인 코드 */
  approvalCode: string;
}

/**
 * 사진 정보
 */
interface PhotoInfo {
  /** 법원 코드 */
  courtCode: string;
  /** 사건 번호 */
  caseNumber: string;
  /** 사진 카테고리 코드 */
  photoCategoryCode: string;
  /** 사진 개수 */
  photoCount: number;
}

/**
 * 경매 일정
 */
interface AuctionSchedule {
  /** 경매 날짜 */
  auctionDate: string;
  /** 경매 시간 */
  auctionTime: string;
  /** 경매 장소 */
  auctionPlace: string;
  /** 경매 결과 코드 */
  auctionResultCode: string | null;
  /** 총 경매 가격 */
  totalAuctionPrice: number;
  /** 최종 경매 가격 */
  finalAuctionPrice: number | null;
}

/**
 * 경매 대상 물건
 */
interface AuctionObject {
  /** 법원 코드 */
  courtCode: string;
  /** 사건 번호 */
  caseNumber: string;
  /** 물건 순번 */
  objectSequence: number;
  /** 부동산 유형 */
  propertyType: string;
  /** 건물 구조 */
  buildingStructure: string | null;
  /** 감정가 */
  appraisedValue: number;
  /** 토지 용도 코드 */
  landUseCode: string;
  /** 위도 */
  latitude: number;
  /** 경도 */
  longitude: number;
  /** 주소 */
  address: string;
}

interface Evaluation {
  courtCode: string;
  caseNumber: string;
  evaluationSequence: number;
  evaluationCategoryCode: string;
  evaluationItem: string;
  evaluationItemCode: string;
  /** 평가 내용 */
  evaluationContent: string;
}

/**
 * 아파트 경매 상세 정보
 */
export type DetailAuction = {
  /** 경매 ID */
  id: string;
  /** 사건 기본 정보 */
  caseBaseInfo: CaseBaseInfo;
  /** 관할청 요구 정보 리스트 */
  districtDemandInfoList: DistrictDemandInfo[];
  /** 매각물건 집행 정보 */
  disposalGoodsExecutionInfo: DisposalGoodsExecutionInfo;
  /** 사진 정보 리스트 */
  photoInfoList: PhotoInfo[];
  /** 경매 일정 리스트 */
  auctionScheduleList: AuctionSchedule[];
  /** 경매 대상 물건 리스트 */
  auctionObjectList: AuctionObject[];
  /** 가장 최근 경매건의 최저입찰가 */
  latestBiddingPrice: number;
  /** 평가 리스트 */
  evaluationList: Evaluation[];
};

export interface AuctionImage {
  picFileUrl: string;
  picTitlNm: string;
  cortAuctnPicDvsCd: string;
  cortAuctnPicSeq: string;
  pageSeq: string;
  cortOfcCd: string;
  csNo: string;
  /** 이진 파일 */
  picFile: string;
}

export interface AuctionStatus {
  status: string;
  auctionDate: string;
  auctionPrice: number;
}

export interface AuctionInvestmentTag {
  id: number;
  name: string;
  description: string;
}
