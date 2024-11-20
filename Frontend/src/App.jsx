import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; // Ensure you have this import
import AdminPage from './AdminPage'; // For example, Admin page
import MainPage from './MainPage'; // For example, Admin page
import { GoogleOAuthProvider } from '@react-oauth/google';
import { initGoogleCalendar } from './MPComponents/SidebarPages/googleCalendar';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    initGoogleCalendar();
  }, []);
  return (
    <GoogleOAuthProvider clientId='863437018339-ervi46asct1gs4d1t2tjuuf6fms4vo8q.apps.googleusercontent.com'>
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
