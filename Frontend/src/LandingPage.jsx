import React, { useState } from 'react';
import SignIn from './LPComponents/SignIn';
import Header from './LPComponents/Header';
import About from './LPComponents/About';
import Cards from './LPComponents/Card';
import Footer from './LPComponents/Footer';

function LandingPage() {
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
