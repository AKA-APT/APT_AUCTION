import { Suspense } from 'react';
import TopNavigator from './TopNavigator';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <TopNavigator>
      <Suspense>
        <Outlet />
      </Suspense>
    </TopNavigator>
  );
}
