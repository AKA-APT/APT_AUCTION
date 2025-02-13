import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import KakaoCallback from '@/components/Auth/KakaoCallback';
import Layout from './layout/Layout';
import MyPage from './pages/MyPage';
import { Suspense } from 'react';
import { LoginListener } from './components/Auth/LoginListener';

export default function App() {
  return (
    <Suspense>
      <LoginListener />
      <Routes>
        <Route path="/oauth/login/kakao" element={<KakaoCallback />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/my-page" element={<MyPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
