import { create } from 'zustand';

interface MarkerInfo {
  id: string;
  lat: number;
  lng: number;
  title: string;
  // 추가 정보들
}

interface MarkerStore {
  selectedMarker: MarkerInfo | null;
  isNavOpen: boolean;
  selectMarker: (marker: MarkerInfo) => void;
  closeNav: () => void;
}

export const useMarkerStore = create<MarkerStore>((set) => ({
  selectedMarker: null,
  isNavOpen: false,
  selectMarker: (marker) => set({ selectedMarker: marker, isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false, selectedMarker: null }),
}));
