import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { MESSAGES, getWhatsAppUrl } from '../data/business';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show polite tooltip after 3 seconds, without blocking the screen
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="floating-wa-wrapper" aria-label="زر التواصل المباشر عبر واتساب">
      {showTooltip && (
        <div className="floating-wa-tooltip" role="status">
          <button
            type="button"
            className="tooltip-close-btn"
            onClick={() => setShowTooltip(false)}
            aria-label="إغلاق التنبيه"
          >
            <X size={14} />
          </button>
          <p className="tooltip-title">جاهزون لمساعدتك!</p>
          <p className="tooltip-text">اسألنا عن أي هدية أو قطعة تناسب ذوقك عبر واتساب 🎁</p>
        </div>
      )}

      <a
        href={getWhatsAppUrl(MESSAGES.general())}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-button"
        aria-label="تواصل مع فلورا للهدايا والورد على واتساب مباشرة"
      >
        <span className="floating-wa-pulse" aria-hidden="true"></span>
        <MessageCircle size={32} className="floating-wa-icon" />
        <span className="floating-wa-label">تواصل معنا</span>
      </a>
    </div>
  );
}
