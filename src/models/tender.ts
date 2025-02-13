import { Auction } from './auction';

interface Tender {
  id: number;
  auction: Auction;
  /** 내 입찰가 */
  tenderCost: number;
}

export type MyTenders = Tender[];
