import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Layout from './layout/Layout';
import MyPage from './pages/MyPage';
import { Suspense } from 'react';

export default function App() {
  return (
    <Suspense>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/my-page" element={<MyPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
