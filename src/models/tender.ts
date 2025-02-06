interface Tender {
  id: number;
  auction: {
    id: number;
    // .... 매물 정보
    name: string;
    /** 최소 입찰가 */
    lowestCost: number;
  };
  /** 내 입찰가 */
  tenderCost: number;
}

export type MyTenders = Tender[];
