import { SimpleAuction } from '@/models/auction';
import { MyTenders } from '@/models/tender';
import { httpClient } from '@/utils/http-client';

export function getMyTenders() {
  return httpClient.get<MyTenders>('/api/v1/tenders');
}

export function addTender({
  auctionId,
  amount,
}: {
  auctionId: string;
  amount: number;
}) {
  return httpClient.post('/api/v1/tenders', { auctionId, amount });
}

export function getLikeLists() {
  return httpClient.get<SimpleAuction[]>('/api/v2/auctions/interests');
}
