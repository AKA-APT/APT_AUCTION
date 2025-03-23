import React, { Suspense } from 'react';
import { FavoriteListings } from './components/FavoriteListings';
import { InvestmentPreferences } from './components/InvestmentPreferences';
import { MyTenders } from './components/MyTenders';
import { UserProfile } from './components/UserProfile';
import { RecommendedListings } from './components/RecommendedListings';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function MyPage() {
  return (
    <div className="container mx-auto p-4">
      <Suspense>
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
      <div className="p-8"></div>
    </div>
  );
}
