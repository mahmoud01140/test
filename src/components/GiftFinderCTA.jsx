import React, { useState } from 'react';
import { HelpCircle, MessageCircle, HeartHandshake, Sparkles, Send } from 'lucide-react';
import { MESSAGES, getWhatsAppUrl } from '../data/business';
import './GiftFinderCTA.css';

export default function GiftFinderCTA() {
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');

  const occasionsList = [
    'عيد ميلاد',
    'خطوبة وزفاف',
    'مولود جديد / سبوع',
    'تخرج ونجاح',
    'ديكور وتجديد منزل',
    'هدية خاصة للأم / الأب',
  ];

  const budgetOptions = [
    'ميزانية بسيطة ومناسبة',
    'ميزانية متوسطة',
    'قطعة فاخرة مميزة',
  ];

  const handleOccasionClick = (val) => {
    setOccasion(occasion === val ? '' : val);
  };

  const handleBudgetClick = (val) => {
    setBudget(budget === val ? '' : val);
  };

  // Generate target message with selected parameters or default dots
  const targetOccasionText = occasion || '...';
  const targetBudgetText = budget || '...';
  const generatedWhatsAppUrl = getWhatsAppUrl(
    MESSAGES.giftHelp(targetOccasionText, targetBudgetText)
  );

  return (
    <section className="gift-finder-section" id="gift-finder">
      <div className="container">
        <div className="gift-finder-card">
          <div className="gift-finder-badge">
            <HeartHandshake size={18} />
            <span>خدمة مساعدة مجانية وسريعة</span>
          </div>

          <h2 className="gift-finder-title">مش عارف تختار هدية إيه؟ إحنا نساعدك</h2>
          
          <p className="gift-finder-desc">
            قول لنا المناسبة والميزانية اللي حاططها، واسألنا عن الاختيارات المتاحة اللي تناسبك. فريق سنتر الأحلام جاهز لاقتراح أفضل الأفكار التي تناسب ذوقك وتليق بمن تحب.
          </p>

          {/* Interactive Fast Selectors (Zero friction, no personal data forms) */}
          <div className="fast-selectors-wrapper">
            {/* Occasion Selection */}
            <div className="selector-group">
              <label className="selector-label">1. اختر المناسبة (اختياري للتخصيص):</label>
              <div className="selector-chips">
                {occasionsList.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`selector-chip ${occasion === item ? 'active' : ''}`}
                    onClick={() => handleOccasionClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range Selection */}
            <div className="selector-group">
              <label className="selector-label">2. حدد نطاق الميزانية التقريبي:</label>
              <div className="selector-chips">
                {budgetOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`selector-chip ${budget === item ? 'active' : ''}`}
                    onClick={() => handleBudgetClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Message Preview */}
          <div className="message-preview-box">
            <span className="preview-label">نص رسالة الواتساب الجاهزة:</span>
            <p className="preview-text">
              «مرحبًا، أبحث عن هدية مناسبة. المناسبة هي: <strong>{targetOccasionText}</strong> والميزانية التقريبية: <strong>{targetBudgetText}</strong>. هل يمكنكم مساعدتي في معرفة الاختيارات المتاحة؟»
            </p>
          </div>

          {/* Direct CTA */}
          <div className="gift-finder-cta-wrapper">
            <a
              href={generatedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp-solid gift-finder-btn"
              aria-label="ساعدوني أختار هدية على واتساب"
            >
              <MessageCircle size={22} />
              <span>ساعدوني أختار هدية على واتساب</span>
              <Send size={18} className="cta-send-icon" />
            </a>
          </div>

          <span className="gift-finder-guarantee">
            🔒 لا نسألك عن أي بيانات شخصية، المحادثة مباشرة بينك وبين المحل على تطبيق واتساب.
          </span>
        </div>
      </div>
    </section>
  );
}
