import { MESSAGES, getWhatsAppUrl } from './business';

export const CATEGORIES = [
  {
    id: "antiques-decor",
    title: "الأنتيكات وقطع الديكور",
    description: "قطع كلاسيكية وأنتيكات تضفي لمسة فخامة وأناقة تدوم في كل زاوية من منزلك.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    badge: "لمسة كلاسيكية",
    whatsappUrl: getWhatsAppUrl(MESSAGES.category("الأنتيكات وقطع الديكور")),
  },
  {
    id: "wedding-engagement",
    title: "هدايا الخطوبة والزفاف",
    description: "تشكيلات راقية وصواني تقديم وبراويز تذكارية تليق بأجمل أيام العمر.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    badge: "فرحة العمر",
    whatsappUrl: getWhatsAppUrl(MESSAGES.category("هدايا الخطوبة والزفاف")),
  },
  {
    id: "newborn-kids",
    title: "هدايا المواليد والأطفال",
    description: "أطقم تذكارية رقيقة ومجسمات لطيفة للاحتفال بأغلى القادمين الجدد.",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    badge: "أجمل تهنئة",
    whatsappUrl: getWhatsAppUrl(MESSAGES.category("هدايا المواليد والأطفال")),
  },
  {
    id: "birthdays",
    title: "هدايا أعياد الميلاد",
    description: "أفكار مبتكرة وتنسيقات غير تقليدية تجعل يوم ميلاد أحبابك ذكرى لا تُنسى.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    badge: "ذكرى لا تُنسى",
    whatsappUrl: getWhatsAppUrl(MESSAGES.category("هدايا أعياد الميلاد")),
  },
  {
    id: "special-occasions",
    title: "هدايا المناسبات الخاصة",
    description: "هدايا التخرج، الترقيات، وعيد الأم ومواسم الأعياد بتغليف واختيارات مميزة.",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80",
    badge: "لأصحاب الذوق الرفيع",
    whatsappUrl: getWhatsAppUrl(MESSAGES.category("هدايا المناسبات الخاصة")),
  },
  {
    id: "variety-gifts",
    title: "هدايا وتذكارات متنوعة",
    description: "مباخر فخمة، شمعدانات، ساعات حائطية وإكسسوارات منزلية تلبي كل الأذواق.",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
    badge: "خيارات متعددة",
    whatsappUrl: getWhatsAppUrl(MESSAGES.category("هدايا وتذكارات متنوعة")),
  },
];
