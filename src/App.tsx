import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/layout/Layout';
import Home from '@/pages/Home';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
