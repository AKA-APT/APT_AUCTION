import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from './pages/Root';
import Apartment from './pages/Apartment';
import Auction from './pages/Auction';

const App = () => {
  return (
    <Router>
      <Root />
      <Routes>
        <Route path="/apartment" element={<Apartment />} />
        <Route path="/auction" element={<Auction />} />
      </Routes>
    </Router>
  );
};

export default App;
