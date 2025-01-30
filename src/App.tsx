import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import KakaoCallback from '@/components/KakaoCallback';
import MapLayout from '@/layout/MapLayout';
import NotNeedMap from '@/pages/NotNeedMap';
import Layout from './layout/Layout';

export default function App() {
  return (
    <Routes>
      <Route path="/auth/login/kakao" element={<KakaoCallback />} />

      <Route element={<Layout />}>
        <Route path="/a" element={<NotNeedMap />} />

        <Route path="/" element={<MapLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}
