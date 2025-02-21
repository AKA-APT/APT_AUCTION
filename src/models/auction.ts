export interface AuctionParams {
  lbLat: number;
  lbLng: number;
  rtLat: number;
  rtLng: number;
}

export interface GeoAuctionGroup {
  latitude: number;
  longitude: number;
  totalCount: number;
  auctions: Auction[];
}

export interface Auction {
  id: string;
  caseBaseInfo: CaseBaseInfo;
  auctionObject: AuctionObject;
}

interface CaseBaseInfo {
  courtCode: string;
  courtName: string;
  supportCourtName: string;
  caseNumber: string;
  caseType: string;
  caseReceivedDate: string;
  caseDecisionDate: string;
  claimAmount: number;
  auctionSuspensionStatus: string;
  departmentCode: string;
  departmentName: string;
  departmentPhone: string;
  lawsuitTypeCode: string;
  userCaseNumber: string;
}

interface AuctionObject {
  courtCode: string;
  caseNumber: string;
  objectSequence: number;
  propertyType: string | null;
  buildingStructure: string | null;
  appraisedValue: number;
  landUseCode: string;
  latitude: number;
  longitude: number;
  address: string;
}
