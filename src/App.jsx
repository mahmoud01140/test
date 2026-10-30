import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import GiftFinderCTA from './components/GiftFinderCTA';
import BenefitsSection from './components/BenefitsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="center-app">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* Main Marketing Journey */}
      <main id="main-content">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Gift & Decor Categories */}
        <CategoryGrid />

        {/* 4. Featured Products Showcase */}
        <FeaturedProducts />

        {/* 5. Friction-Free Gift Finder CTA */}
        <GiftFinderCTA />

        {/* 6. Why Choose Us (Believable Values) */}
        <BenefitsSection />

        {/* 7. Frequently Asked Questions */}
        <FAQSection />

        {/* 8. Final High-Trust Contact Section */}
        <ContactSection />
      </main>

      {/* 9. Informative Footer */}
      <Footer />

      {/* 10. Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
