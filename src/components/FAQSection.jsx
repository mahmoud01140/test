import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/faq';
import { MESSAGES, getWhatsAppUrl } from '../data/business';
import './FAQSection.css';

export default function FAQSection() {
  // Keep first question open by default for immediate clarity
  const [openId, setOpenId] = useState('faq-types');

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <HelpCircle size={16} />
            <span>إجابات واضحة ومباشرة</span>
          </div>
          <h2 className="section-title">الأسئلة الشائعة</h2>
          <p className="section-subtitle">
            جمعنا لك أهم الاستفسارات المتكررة حول كيفية اختيار الهدايا ومعرفة الأسعار والتواصل معنا.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="faq-accordion-list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className={`faq-icon-arrow ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={20} />
                  </span>
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  className={`faq-answer-collapse ${isOpen ? 'expanded' : ''}`}
                >
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Bottom Support Link */}
        <div className="faq-footer-cta">
          <p>عندك سؤال آخر أو استفسار خاص؟</p>
          <a
            href={getWhatsAppUrl(MESSAGES.general())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary faq-wa-link"
          >
            <MessageCircle size={18} />
            <span>تحدث معنا مباشرة على واتساب</span>
          </a>
        </div>
      </div>
    </section>
  );
}
