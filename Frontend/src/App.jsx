import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdminPage from './AdminPage';
import MainPage from './MainPage';

function App() {
  // Check if the user is authenticated (you can use localStorage, context, etc.)
  const isAuthenticated = localStorage.getItem('token');
  console.log('Token:', isAuthenticated); // Check token value


  return (
    <GoogleOAuthProvider clientId="739038621196-208ng4lk2r5qs69nqd0435cg6et7qc32.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          
          {/* Protect this route using conditional rendering */}
          <Route
            path="/users"
            element={isAuthenticated ? <MainPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
