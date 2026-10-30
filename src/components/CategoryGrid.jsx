import React from 'react';
import { MessageCircle, ArrowLeft, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import './CategoryGrid.css';

export default function CategoryGrid() {
  return (
    <section className="categories-section" id="categories">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Layers size={16} />
            <span>تشكيلاتنا المتنوعة</span>
          </div>
          <h2 className="section-title">أقسام الهدايا والديكور</h2>
          <p className="section-subtitle">
            اختر القسم الذي يناسب مناسبتك، واستفسر مباشرة عبر واتساب عن القطع المتاحة وأسعارها وتفاصيلها.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-image-container">
                <img
                  src={category.image}
                  alt={category.title}
                  className="category-img"
                  loading="lazy"
                />
                <span className="category-badge">{category.badge}</span>
              </div>

              <div className="category-card-body">
                <h3 className="category-title">{category.title}</h3>
                <p className="category-desc">{category.description}</p>
                
                <div className="category-card-footer">
                  <a
                    href={category.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp-solid category-wa-btn"
                    aria-label={`استفسر عن هدايا ${category.title} عبر واتساب`}
                  >
                    <MessageCircle size={18} />
                    <span>استفسر عن هذا القسم</span>
                    <ArrowLeft size={16} className="btn-arrow" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
