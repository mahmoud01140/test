import React from 'react';
import { MessageCircle, Compass, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG, MESSAGES, getWhatsAppUrl } from '../data/business';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        {/* Content Column */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} className="badge-icon" />
            <span>فلورا للهدايا والورد</span>
          </div>

          <h1 className="hero-title">
            لكل مناسبة <span className="highlight-text">هدية وباقة</span> تحكي حكاية
          </h1>

          <p className="hero-description">
            من هدايا أعياد الميلاد والخطوبة إلى أحدث باقات الورد وقطع الديكور، اكتشف تشكيلات راقية في متجر فلورا، واسألنا مباشرة عن القطعة المناسبة لمناسبتك وميزانيتك.
          </p>

          {/* Quick Context Highlights (Truthful & Credible) */}
          <div className="hero-pills">
            <div className="pill-item">
              <CheckCircle2 size={16} className="pill-icon" />
              <span>باقات ورد وتنسيقات عصرية</span>
            </div>
            <div className="pill-item">
              <CheckCircle2 size={16} className="pill-icon" />
              <span>هدايا خطوبة ومواليد ومناسبات</span>
            </div>
            <div className="pill-item">
              <MapPin size={16} className="pill-icon" />
              <span>توصيل سريع ومتاح</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="hero-cta-group">
            <a
              href={getWhatsAppUrl(MESSAGES.general())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp-solid hero-btn-main"
            >
              <MessageCircle size={22} />
              <span>اسأل عن هديتك على واتساب</span>
            </a>

            <a href="#categories" className="btn btn-secondary hero-btn-sub">
              <Compass size={19} />
              <span>اكتشف الأقسام</span>
            </a>
          </div>

          {/* Reassurance note */}
          <p className="hero-microcopy">
            * اضغط للتواصل وسيقوم فريقنا بمساعدتك في اختيار الهدية وتوضيح الأسعار والتوافر.
          </p>
        </div>

        {/* Visual Column */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=85"
              alt="صناديق هدايا فاخرة وباقات ورد طبيعي من متجر فلورا"
              className="hero-main-img"
              loading="eager"
            />
            
            {/* Elegant Floating Card */}
            <div className="hero-floating-card">
              <div className="floating-card-icon">
                <Sparkles size={20} />
              </div>
              <div className="floating-card-info">
                <span className="floating-title">مستعدون لمساعدتك</span>
                <span className="floating-desc">رسالة واحدة تكفي لمعرفة كل التفاصيل</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
