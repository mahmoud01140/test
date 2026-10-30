import React from 'react';
import { Gift, MessageCircle, PhoneCall, Heart, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG, MESSAGES, getWhatsAppUrl } from '../data/business';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Brand & Bio */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <span className="footer-brand-icon">
              <Gift size={24} />
            </span>
            <div className="footer-brand-text">
              <span className="footer-brand-title">{BUSINESS_CONFIG.name}</span>
              <span className="footer-brand-sub">{BUSINESS_CONFIG.location}</span>
            </div>
          </div>
          <p className="footer-bio">
            {BUSINESS_CONFIG.tagline}. وجهتك المفضلة في بني سويف لاقتناء أجمل الهدايا والأنتيكات وقطع الديكور التي تعبر عن ذوقك الرفيع.
          </p>
          <div className="footer-location-tag">
            <MapPin size={16} />
            <span>محافظة بني سويف، مصر</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">أقسام الهدايا</h4>
          <ul className="footer-links">
            <li><a href="#categories">الأنتيكات وقطع الديكور</a></li>
            <li><a href="#categories">هدايا الخطوبة والزفاف</a></li>
            <li><a href="#categories">هدايا المواليد والأطفال</a></li>
            <li><a href="#categories">هدايا أعياد الميلاد</a></li>
            <li><a href="#categories">هدايا المناسبات الخاصة</a></li>
          </ul>
        </div>

        {/* Navigation & Help */}
        <div className="footer-col">
          <h4 className="footer-heading">روابط سريعة</h4>
          <ul className="footer-links">
            <li><a href="#hero">الرئيسية</a></li>
            <li><a href="#products">معرض المنتجات المميزة</a></li>
            <li><a href="#gift-finder">مساعد اختيار الهدية</a></li>
            <li><a href="#benefits">لماذا سنتر الأحلام؟</a></li>
            <li><a href="#faq">الأسئلة الشائعة</a></li>
            <li><a href="#contact">تواصل معنا</a></li>
          </ul>
        </div>

        {/* Direct Contact */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">تواصل مباشر</h4>
          <p className="footer-contact-desc">
            يسعدنا تواصلك في أي وقت للاستفسار عن أي منتج أو طلب اقتراحات للهدايا.
          </p>
          <div className="footer-cta-buttons">
            <a
              href={getWhatsAppUrl(MESSAGES.general())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp-solid footer-wa-btn"
            >
              <MessageCircle size={18} />
              <span>واتساب: {BUSINESS_CONFIG.phone}</span>
            </a>
            <a
              href={BUSINESS_CONFIG.phoneCallUrl}
              className="btn btn-secondary footer-call-btn"
            >
              <PhoneCall size={16} />
              <span>اتصال هاتفي مباشر</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            جميع الحقوق محفوظة &copy; {currentYear} {BUSINESS_CONFIG.name} - بني سويف.
          </p>
          <p className="made-with-love">
            صُممت بعناية لتجربة تسوق راقية وسريعة عبر واتساب <Heart size={14} className="heart-icon" />
          </p>
        </div>
      </div>
    </footer>
  );
}
