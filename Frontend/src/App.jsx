import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; // Ensure you have this import
import AdminPage from './AdminPage'; // For example, Admin page
import MainPage from './MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<MainPage />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
