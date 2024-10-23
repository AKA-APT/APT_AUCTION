import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/layout/Layout';
import Home from '@/pages/Home';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}
