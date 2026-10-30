# صفحة هبوط سنتر الأحلام للهدايا والأنتيكات (بني سويف)

صفحة هبوط تسويقية عالية التحويل (High-Conversion Landing Page) مبنية لـ **سنتر الأحلام للهدايا والأنتيكات** في محافظة بني سويف، مصر، ومصممة لتحويل زوار الصفحة إلى محادثات واتساب ذات نية شراء حقيقية.

---

## 🚀 التقنيات المستخدمة
- **React 19** & **JavaScript**
- **Vite** لتشغيل وبناء فائق السرعة
- **Vanilla CSS (Design Tokens)** بنظام ألوان دافئ وهوية بصرية مخصصة للهدايا والأنتيكات
- **Lucide React** لأيقونات واضحة وخفيفة
- **RTL أصلي** مع خطوط عربية محسنة (`Cairo` للعناوين و `Tajawal` للنصوص)

---

## 🛠️ كيفية تشغيل المشروع

### متطلبات التشغيل:
- Node.js (إصدار 18 فما فوق)

### الأوامر:
```bash
# تثبيت التبعيات (إذا لم تكن مثبتة)
npm install

# تشغيل بيئة التطوير المحلية
npm run dev

# بناء النسخة الإنتاجية
npm run build

# معاينة النسخة الإنتاجية
npm run preview
```

---

## 📁 هيكل الملفات وتنظيم الكود

```
center/
├── index.html                   # إعدادات SEO، الخطوط العربية، و Favicon
├── vite.config.js               # إعدادات Vite مع React Plugin
├── package.json                 # التبعيات والأوامر
└── src/
    ├── main.jsx                 # نقطة الدخول
    ├── App.jsx                  # تجميع الأقسام وفق رحلة العميل
    ├── index.css                # نظام التصميم والمتغيرات (Design Tokens)
    ├── data/
    │   ├── business.js          # بيانات النشاط ودوال رسائل واتساب المشفرة
    │   ├── categories.js        # أقسام الهدايا الستة مع صورها وروابطها
    │   ├── products.js          # المنتجات المميزة المتاحة للاستفسار
    │   └── faq.js               # الأسئلة الشائعة وإجاباتها الدقيقة
    └── components/
        ├── Navbar.jsx / .css            # شريط التنقل مع زر واتساب البارز
        ├── HeroSection.jsx / .css       # قسم الهيرو والرسالة التسويقية الأساسية
        ├── CategoryGrid.jsx / .css      # بطاقات الأقسام الستة
        ├── FeaturedProducts.jsx / .css  # معرض المنتجات مع الفلترة التفاعلية
        ├── GiftFinderCTA.jsx / .css     # مساعد اختيار الهدية بدون نماذج معقدة
        ├── BenefitsSection.jsx / .css   # لماذا سنتر الأحلام (مزايا حقيقية)
        ├── FAQSection.jsx / .css        # أسئلة شائعة بنظام الأكورديون
        ├── ContactSection.jsx / .css    # قسم التواصل المباشر ومعلومات بني سويف
        ├── Footer.jsx / .css            # الفوتر وحقوق الملكية
        └── FloatingWhatsApp.jsx / .css  # زر واتساب العائم المتجاوب
```

---

## 📞 بيانات التواصل المثبتة
- **الرقم المعتمد:** `01223335050`
- **رابط واتساب الدولي:** `https://wa.me/201223335050`
- **الموقع:** محافظة بني سويف، مصر (بدون اختلاق عنوان تفصيلي)

---

## 🔄 التخصيص المستقبلي السهل
- **تحديث المنتجات:** افتح ملف [`src/data/products.js`](file:///c:/Users/Number%20One/Desktop/center/src/data/products.js) وأضف أو عدّل أي منتج، صورته، أو اسمه.
- **تحديث الأقسام:** افتح ملف [`src/data/categories.js`](file:///c:/Users/Number%20One/Desktop/center/src/data/categories.js).
- **تحديث بيانات النشاط:** افتح ملف [`src/data/business.js`](file:///c:/Users/Number%20One/Desktop/center/src/data/business.js).
