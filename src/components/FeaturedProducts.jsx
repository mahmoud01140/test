import React, { useState } from 'react';
import { MessageCircle, Sparkles, Filter, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import './FeaturedProducts.css';

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'جميع المعروضات' },
    { id: 'antiques-decor', label: 'أنتيكات وديكور' },
    { id: 'wedding-engagement', label: 'خطوبة وزفاف' },
    { id: 'newborn-kids', label: 'مواليد وأطفال' },
    { id: 'birthdays', label: 'أعياد ميلاد' },
    { id: 'special-occasions', label: 'مناسبات خاصة' },
  ];

  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section className="products-section" id="products">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={16} />
            <span>معرض الصور والقطع المختارة</span>
          </div>
          <h2 className="section-title">منتجات وقطع مميزة</h2>
          <p className="section-subtitle">
            نماذج مختارة من الهدايا والقطع الفنية المتاحة في سنتر الأحلام. اضغط على أي قطعة للاستفسار الفوري عن سعرها وتوافرها عبر واتساب.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="products-filter-bar" role="tablist" aria-label="تصفية المنتجات">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              className={`filter-pill ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {activeFilter === filter.id && <Check size={14} className="filter-check" />}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image-box">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to high quality neutral placeholder if network issue occurs
                    e.currentTarget.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80";
                  }}
                />
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <span className="product-category-label">{product.categoryLabel}</span>
              </div>

              <div className="product-card-content">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                
                <div className="product-meta">
                  <span className="product-price-note">{product.priceStatus}</span>
                </div>

                <a
                  href={product.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-solid product-btn"
                  aria-label={`استفسر عن ${product.name} عبر واتساب`}
                >
                  <MessageCircle size={18} />
                  <span>استفسر عن المنتج على واتساب</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Section Reassurance Note */}
        <div className="products-footer-note">
          <p>
            💡 <strong>ملاحظة للمهتمين:</strong> التشكيلة تتجدد باستمرار في المحل، وإذا كان لديك تصميم أو هدية معينة في بالك، يمكنك إرسال صورتها لنا عبر واتساب لمساعدتك في توفيرها أو إيجاد الأقرب لها.
          </p>
        </div>
      </div>
    </section>
  );
}
