
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import TranslatorsList from '../components/TranslatorsList';
import UserDashboard from '../components/UserDashboard';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <TranslatorsList />
      <UserDashboard />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
