import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import MainPage from './MainPage';
import AdminPage from './AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/Login' element={<LandingPage />} /> */}
        {/* <Route path='/' element={<MainPage />} /> */}
        <Route path='/' element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
