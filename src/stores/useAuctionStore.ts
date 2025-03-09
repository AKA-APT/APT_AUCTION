import { SimpleAuction } from '@/models/auction';
import { create } from 'zustand';

interface AuctionStore {
  selectedAuction: SimpleAuction | null;
  isNavOpen: boolean;
  setSelectAuction: (auction: SimpleAuction) => void;
  closeNav: () => void;
}

export const useAuctionStore = create<AuctionStore>((set) => ({
  selectedAuction: null,
  isNavOpen: false,
  setSelectAuction: (auction) =>
    set({ selectedAuction: auction, isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false, selectedAuction: null }),
}));
