import { DetailAuction } from './auction';

interface Tender {
  auctionId: number;
  auction: DetailAuction;
  /** 내 입찰가 */
  tenderCost: number;
}

export type MyTenders = Tender[];
