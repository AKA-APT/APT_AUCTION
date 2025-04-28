import { DetailAuction } from './auction';

export interface Tender {
  auctionId: number;
  auction: DetailAuction;
  /** 내 입찰가 */
  tenderCost: number;
  /** 모의 낙찰 여부 */
  isMock?: boolean;
}

export type MyTenders = Tender[];
