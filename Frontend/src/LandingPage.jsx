import React, { useState, useEffect } from 'react';
import SignIn from './LPComponents/SignIn';
import Header from './LPComponents/Header';
import About from './LPComponents/About';
import Cards from './LPComponents/Card';
import Footer from './LPComponents/Footer';
import PasswordSetupModal from './LPComponents/PasswordSetupModal';

function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (state) => setModalOpen(state);

  // Extract the token from the URL (if applicable)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const verificationToken = queryParams.get('token');

    // Open modal if a token exists in the query params
    if (verificationToken) {
      setModalOpen(true);
    }
  }, []);

  return (
    <>
      <Header />
      <SignIn />
      <About />
      <Cards />
      <Footer />
      <PasswordSetupModal
        open={modalOpen}
        handleOpen={handleModalOpen}
        verificationToken={new URLSearchParams(window.location.search).get(
          'token'
        )} // Pass token
      />
    </>
  );
}

export default LandingPage;
