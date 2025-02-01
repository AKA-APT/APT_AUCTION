import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import KakaoCallback from '@/components/KakaoCallback';
import NotNeedMap from '@/pages/NotNeedMap';
import Layout from './layout/Layout';
import MyPage from './pages/MyPage';

export default function App() {
  return (
    <Routes>
      <Route path="/auth/login/kakao" element={<KakaoCallback />} />

      <Route element={<Layout />}>
        <Route path="/a" element={<NotNeedMap />} />

        <Route path="/" element={<Home />} />
        <Route path="/my-page" element={<MyPage />} />
      </Route>
    </Routes>
  );
}
