/**
 * إعدادات النشاط التجاري والكلمات المفتاحية
 * قابلة للتوسيع لتشمل أي نوع نشاط تجاري آخر في المستقبل بسهولة
 */

module.exports = {
  currentCategory: 'flower_shops',

  categories: {
    flower_shops: {
      id: 'flower_shops',
      categoryEn: 'Flower Shops',
      categoryAr: 'محلات الزهور والورد',
      nicheKeywordsAr: [
        'محل ورد',
        'محل زهور',
        'تنسيق زهور',
        'بيع الورد',
        'زهور وهدايا',
        'بوكيهات ورد',
        'مشتل زهور'
      ],
      nicheKeywordsEn: [
        'Flower Shop',
        'Florist',
        'Flowers',
        'Flower Boutique',
        'Floral Design'
      ],
      osmFilters: [
        '["shop"="florist"]',
        '["shop"="flowers"]'
      ]
    },

    // مثال على سهولة التوسيع لنشاط آخر مستقبلاً
    gift_shops: {
      id: 'gift_shops',
      categoryEn: 'Gift Shops',
      categoryAr: 'محلات الهدايا والأنتيكات',
      nicheKeywordsAr: ['محل هدايا', 'أنتيكات', 'تحف وهدايا'],
      nicheKeywordsEn: ['Gift Shop', 'Antiques', 'Gifts & Decor'],
      osmFilters: ['["shop"="gift"]']
    }
  }
};

