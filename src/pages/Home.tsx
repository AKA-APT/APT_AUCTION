import { useSetNaverMarker } from '@/hooks/useSetNaverMarker';

export default function Home() {
  const { setMarker } = useSetNaverMarker();

  const m1 = {
    lat: 37.3595704,
    lng: 127.105399,
  };

  setMarker(m1);
  return <>ㄴ</>;
}
