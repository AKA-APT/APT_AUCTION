declare module '@/utils/MarkerClustering' {
  interface MarkerClusteringOptions {
    map: naver.maps.Map | null;
    markers: naver.maps.Marker[];
    minClusterSize?: number;
    maxZoom?: number;
    gridSize?: number;
    icons?:
      | naver.maps.ImageIcon[]
      | naver.maps.SymbolIcon[]
      | naver.maps.HtmlIcon[];
    indexGenerator?: number[] | ((count: number) => number);
    averageCenter?: boolean;
    stylingFunction?: (marker: naver.maps.Marker, count: number) => void;
    disableClickZoom?: boolean;
  }

  class MarkerClustering {
    constructor(options: MarkerClusteringOptions);
    onAdd(): void;
    onRemove(): void;
    setOptions(newOptions: MarkerClusteringOptions | string, value?: any): void;
    getOptions(key?: string): any;
    clear(): void;
  }

  export default MarkerClustering;
}
