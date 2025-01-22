import { Suspense } from 'react';
import MapLayout from './MapLayout';
import TopNavigator from './TopNavigator';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TopNavigator>
      <MapLayout>
        <Suspense>{children}</Suspense>
      </MapLayout>
    </TopNavigator>
  );
}
