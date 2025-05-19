import React, { Suspense } from 'react';
import { FavoriteListings } from './components/FavoriteListings';
import { InvestmentPreferences } from './components/InvestmentPreferences';
import { MyTenders } from './components/MyTenders';
import { UserProfile } from './components/UserProfile';
import { RecommendedListings } from './components/RecommendedListings';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useKakaoLogin } from '@/hooks/Auth/useKakaoLogin';

export default function MyPage() {
  const { logout } = useKakaoLogin();
  return (
    <div className="container mx-auto p-4">
      <Suspense
        fallback={<div style={{ height: '100vh', width: '100vw' }}></div>}
      >
        <UserProfile />
        <Suspense>
          <InvestmentPreferences />
        </Suspense>
        <ErrorBoundary fallback={null}>
          <MyTenders />
        </ErrorBoundary>
        <Suspense>
          <FavoriteListings />
        </Suspense>
        <RecommendedListings />
      </Suspense>
      <div className="w-full flex justify-end">
        <button className="text-white" onClick={logout}>
          로그아웃
        </button>
      </div>
      <div className="p-8"></div>
    </div>
  );
}
