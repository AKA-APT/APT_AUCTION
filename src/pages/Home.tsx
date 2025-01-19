import { useSuspenseNaverMap } from '@/hooks/useNaverMap';
import { Suspense, useRef } from 'react';

export default function Home() {
  const map = useSuspenseNaverMap({
    latitude: 37.3595704,
    longitude: 127.105399,
  });

  return <></>;
}
