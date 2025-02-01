import { useSetNaverMarker } from '@/hooks/useSetNaverMarker';
import { SEOUL_CITY_HALL } from '@/static/positions';

export default function Home() {
  const { setMarker } = useSetNaverMarker();

  const m1 = SEOUL_CITY_HALL;

  setMarker(m1);

  return <>ㄴ</>;
}
