import React from 'react';
import { Gift, Sparkles, MessageCircle, HelpCircle, Truck, ShieldCheck } from 'lucide-react';
import { MESSAGES, getWhatsAppUrl } from '../data/business';
import './BenefitsSection.css';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Gift size={28} />,
      title: "تنوع واسع في الهدايا والأنتيكات",
      description: "تشكيلة غنية تجمع بين الذوق الكلاسيكي والحديث، لتجد دائماً ما يعبر عن مشاعرك بكل رقي.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "خيارات لكل مناسبة",
      description: "سواء كانت مناسبة خطوبة، زفاف، سبوع مولود، عيد ميلاد، أو تجديد ديكور بيتك، لدينا اختيارات تلائمها.",
    },
    {
      icon: <MessageCircle size={28} />,
      title: "تواصل مباشر وسريع",
      description: "لا حاجة لخطوات تسجيل معقدة؛ كل ما عليك هو فتح واتساب والتحدث مباشرة مع المحل لتلقي الرد.",
    },
    {
      icon: <HelpCircle size={28} />,
      title: "وضوح في الأسعار والتوافر",
      description: "اسألنا عن أي قطعة تختارها، وسنزودك بتفاصيل السعر الحالي ومدى توافرها أو حجزها في المحل.",
    },
    {
      icon: <Truck size={28} />,
      title: "اسأل عن التوصيل داخل بني سويف",
      description: "يمكنك الاستفسار عن إمكانية وترتيبات التوصيل لمنطقتك داخل محافظة بني سويف حسب القطعة المطلوبة.",
      hasInquiryLink: true,
      inquiryUrl: getWhatsAppUrl(MESSAGES.delivery()),
      inquiryText: "استفسر عن التوصيل لمنطقتك",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "معاينة القطع والتأكد قبل الشراء",
      description: "يمكنك طلب صور إضافية أو مقطع فيديو للقطعة عبر واتساب للتأكد من تفاصيلها ومظهرها الحقيقي.",
    },
  ];

  return (
    <section className="benefits-section" id="benefits">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={16} />
            <span>تجربة تسوق مريحة</span>
          </div>
          <h2 className="section-title">لماذا تختار توتي للهدايا والورد؟</h2>
          <p className="section-subtitle">
            نحرص على أن تكون تجربة اختيار هديتك سهلة وممتعة، مع تقديم معلومات صادقة وخدمة تليق بأهل بني سويف.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid">
          {benefits.map((b, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon-wrapper">
                {b.icon}
              </div>
              <h3 className="benefit-title">{b.title}</h3>
              <p className="benefit-desc">{b.description}</p>
              
              {b.hasInquiryLink && (
                <a
                  href={b.inquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="benefit-link"
                >
                  <MessageCircle size={15} />
                  <span>{b.inquiryText}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
