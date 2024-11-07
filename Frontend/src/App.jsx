import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import MainPage from './MainPage';
import AdminPage from './AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<LandingPage />} />
        <Route path='/Main' element={<MainPage />} /> */}
        <Route path='/' element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
