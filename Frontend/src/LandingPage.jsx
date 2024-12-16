import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './LPComponents/SignIn';
import Header from './LPComponents/Header';
import About from './LPComponents/About';
import Cards from './LPComponents/Card';
import Footer from './LPComponents/Footer';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Simulate decoding token to get role (Replace this with actual token decoding logic if needed)
      const role = token === 'adminToken' ? 'admin' : 'user'; // Example logic

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'user') {
        navigate('/users');
      }
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <SignIn />
      <About />
      <Cards />
      <Footer />
    </>
  );
}

export default LandingPage;