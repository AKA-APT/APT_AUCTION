export interface AuctionParams {
  lbLat: number;
  lbLon: number;
  rtLat: number;
  rtLon: number;
}

interface Location {
  x: number;
  y: number;
}

interface BjdInfo {
  sd: string;
  sgg: string;
  emd: string;
  bjdCode: string;
  location?: Location;
}

interface History {
  auctionId: string;
  caseId: string;
  caseSite: string;
  itemNumber: number;
  historyOrder: number;
  appointedDayType: string;
  appointedDayAt: string;
  numberOfFailures: number;
  lowestSellingPrice: number | null;
  results: string | null;
}

interface ObjectInfo {
  auctionId: string;
  caseId: string;
  caseSite: string;
  itemNumber: number;
  objectNumber: number;
  objectType: string;
  usage: string;
  objectAddress: string;
  groundTotalArea: number;
  buildingTotalArea: number;
}

interface LandInfo {
  pnu: string | null;
  bjdCode: string | null;
  landPurposeName1: string | null;
  landUseName: string | null;
  area: number | null;
  usagePlanItems: any[];
}

export interface Auction {
  id: string;
  keyword: string | null;
  biddingDate: string;
  pnu: string;
  bjdCode: string;
  bjdInfo: BjdInfo;
  registrationDate: string;
  sellingDate: string | null;
  category: string;
  danjiId: string | null;
  pyeong: number | null;
  appraisedPrice: number;
  lowestSellingPrice: number;
  sellingPrice: number | null;
  numberOfFailures: number;
  biddingDepositMin: number;
  biddingDepositMax: number;
  biddingDepositPercentMin: number;
  biddingDepositPercentMax: number;
  itemStatus: string;
  historyList: History[];
  objectList: ObjectInfo[];
  occupantInfoList: any[];
  landInfo: LandInfo;
}
