import React from 'react';
import { MessageCircle, PhoneCall, MapPin, Sparkles, Send } from 'lucide-react';
import { BUSINESS_CONFIG, MESSAGES, getWhatsAppUrl } from '../data/business';
import './ContactSection.css';

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-card">
          <div className="contact-header">
            <div className="contact-badge">
              <Sparkles size={16} />
              <span>جاهزون لخدمتك</span>
            </div>
            
            <h2 className="contact-title">هديتك المميزة تبدأ برسالة</h2>
            
            <p className="contact-subtitle">
              تواصل مع توتي للهدايا والورد واسأل عن الهدايا والورد المتاح للمناسبة اللي بتجهّز لها. يسعدنا استقبال استفساراتك واقتراح الأنسب لك.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="contact-details-grid">
            {/* WhatsApp Card */}
            <div className="contact-method-card featured">
              <div className="method-icon wa-icon">
                <MessageCircle size={28} />
              </div>
              <div className="method-info">
                <span className="method-label">محادثة واتساب سريعة</span>
                <span className="method-value" dir="ltr">01223335050</span>
                <p className="method-desc">الطريقة الأسرع والأسهل للاستفسار وتلقي الصور والأسعار</p>
              </div>
              <a
                href={getWhatsAppUrl(MESSAGES.general())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp-solid method-action-btn"
                aria-label="ابدأ محادثة واتساب الآن"
              >
                <MessageCircle size={18} />
                <span>ابدأ محادثة واتساب</span>
              </a>
            </div>

            {/* Direct Phone Call */}
            <div className="contact-method-card">
              <div className="method-icon call-icon">
                <PhoneCall size={28} />
              </div>
              <div className="method-info">
                <span className="method-label">اتصال هاتفي مباشر</span>
                <span className="method-value" dir="ltr">01223335050</span>
                <p className="method-desc">للاتصال والاستفسار الصوتي المباشر خلال أوقات العمل</p>
              </div>
              <a
                href={BUSINESS_CONFIG.phoneCallUrl}
                className="btn btn-secondary method-action-btn"
                aria-label="اتصل هاتفياً الآن"
              >
                <PhoneCall size={18} />
                <span>اتصال هاتفي الآن</span>
              </a>
            </div>

            {/* Location Card (Precise: Governorate level without making up address) */}
            <div className="contact-method-card">
              <div className="method-icon location-icon">
                <MapPin size={28} />
              </div>
              <div className="method-info">
                <span className="method-label">الموقع الجغرافي</span>
                <span className="method-value">{BUSINESS_CONFIG.location}</span>
                <p className="method-desc">
                  نخدم عملاءنا في محافظة بني سويف، ويمكنك الاستفسار عن تفاصيل الوصول ومواعيد العمل عبر واتساب.
                </p>
              </div>
              <a
                href={getWhatsAppUrl("مرحبًا توتي للهدايا والورد، أود الاستفسار عن مواعيد العمل وموقع المحل داخل بني سويف.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary method-action-btn"
              >
                <span>اسأل عن الموقع والمواعيد</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
