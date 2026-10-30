import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Gift, PhoneCall } from 'lucide-react';
import { BUSINESS_CONFIG, MESSAGES, getWhatsAppUrl } from '../data/business';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-icon">
            <Gift size={24} strokeWidth={2.2} />
          </span>
          <div className="brand-text">
            <span className="brand-title">{BUSINESS_CONFIG.name}</span>
            <span className="brand-subtitle">بني سويف</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          <a href="#" className="nav-link">الرئيسية</a>
          <a href="#categories" className="nav-link">أقسام الهدايا</a>
          <a href="#products" className="nav-link">منتجات مميزة</a>
          <a href="#gift-finder" className="nav-link">ساعدني أختار</a>
          <a href="#benefits" className="nav-link">لماذا نحن؟</a>
          <a href="#faq" className="nav-link">الأسئلة الشائعة</a>
          <a href="#contact" className="nav-link">تواصل معنا</a>
        </nav>

        {/* Action Button */}
        <div className="navbar-actions">
          <a
            href={getWhatsAppUrl(MESSAGES.general())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp-solid navbar-wa-btn"
            aria-label="تواصل مع سنتر الأحلام على واتساب"
          >
            <MessageCircle size={19} className="btn-icon" />
            <span>اسألنا على واتساب</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links" aria-label="قائمة الهاتف">
          <a href="#" className="mobile-nav-link" onClick={closeMenu}>الرئيسية</a>
          <a href="#categories" className="mobile-nav-link" onClick={closeMenu}>أقسام الهدايا</a>
          <a href="#products" className="mobile-nav-link" onClick={closeMenu}>منتجات مميزة</a>
          <a href="#gift-finder" className="mobile-nav-link" onClick={closeMenu}>مساعد اختيار الهدية</a>
          <a href="#benefits" className="mobile-nav-link" onClick={closeMenu}>لماذا نحن؟</a>
          <a href="#faq" className="mobile-nav-link" onClick={closeMenu}>الأسئلة الشائعة</a>
          <a href="#contact" className="mobile-nav-link" onClick={closeMenu}>تواصل معنا</a>
        </nav>

        <div className="mobile-drawer-footer">
          <a
            href={getWhatsAppUrl(MESSAGES.general())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp-solid w-full"
            onClick={closeMenu}
          >
            <MessageCircle size={20} />
            <span>تواصل الآن عبر واتساب</span>
          </a>
          <a
            href={BUSINESS_CONFIG.phoneCallUrl}
            className="btn btn-secondary w-full"
            onClick={closeMenu}
          >
            <PhoneCall size={18} />
            <span>اتصال هاتفي: {BUSINESS_CONFIG.phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
