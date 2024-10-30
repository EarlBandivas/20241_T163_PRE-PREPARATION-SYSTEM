import React, { useState } from 'react';
import SignIn from './Components/SignIn';
import Header from './Components/Header';
import About from './Components/About';
import Cards from './Components/Card';
import Footer from './Components/Footer';

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
