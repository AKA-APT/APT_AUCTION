import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import KakaoCallback from '@/components/Auth/KakaoCallback';
import Layout from './layout/Layout';
import MyPage from './pages/MyPage';

export default function App() {
  return (
    <Routes>
      <Route path="/auth/login/kakao" element={<KakaoCallback />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/my-page" element={<MyPage />} />
      </Route>
    </Routes>
  );
}
