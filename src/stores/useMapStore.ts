import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MapStore {
  map: naver.maps.Map | null;
  setMap: (map: naver.maps.Map) => void;
}

export const useMapStore = create<MapStore>()(
  devtools(
    (set) => ({
      map: null,
      setMap: (map) => set({ map }),
    }),
    { name: 'map-store' },
  ),
);
