import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; // Ensure you have this import
import AdminPage from './AdminPage'; // For example, Admin page
import MainPage from './MainPage'; // For example, Admin page
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId='739038621196-uol95im9plo5d3nbi2mh6mbkqt6ihi5a.apps.googleusercontent.com'>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/users' element={<MainPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
