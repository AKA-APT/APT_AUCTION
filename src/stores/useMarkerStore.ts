import { Auction } from '@/models/auction';
import { create } from 'zustand';

interface MarkerStore {
  selectedAuction: Auction | null;
  isNavOpen: boolean;
  selectMarker: (marker: Auction) => void;
  closeNav: () => void;
}

export const useMarkerStore = create<MarkerStore>((set) => ({
  selectedAuction: null,
  isNavOpen: false,
  selectMarker: (marker) => set({ selectedAuction: marker, isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false, selectedAuction: null }),
}));
