/**
 * Business Configuration and WhatsApp Helper Functions
 * Central source of truth for business contact details and context-aware messaging.
 */

export const BUSINESS_CONFIG = {
  name: "توتي للهدايا والورد",
  tagline: "لكل مناسبة هدية تحكي حكاية",
  category: "محل هدايا وورد وتنسيقات وقطع ديكور للمناسبات",
  location: "محافظة بني سويف، مصر",
  phone: "01223335050",
  whatsappNumber: "201223335050",
  baseWhatsappUrl: "https://wa.me/201223335050",
  phoneCallUrl: "tel:01223335050",
};

/**
 * Generates a pre-filled, URI-encoded WhatsApp chat link.
 * @param {string} message - Custom message to prefill in the chat.
 * @returns {string} Fully formatted WhatsApp URL.
 */
export function getWhatsAppUrl(message = "") {
  if (!message || message.trim() === "") {
    return BUSINESS_CONFIG.baseWhatsappUrl;
  }
  return `${BUSINESS_CONFIG.baseWhatsappUrl}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Pre-defined contextual message generators for conversion optimization.
 */
export const MESSAGES = {
  // General Inquiry
  general: () => 
    "مرحبًا توتي للهدايا والورد، أود الاستفسار عن الهدايا وباقات الورد المتاحة لديكم.",
  
  // Category Specific
  category: (categoryName) => 
    `مرحبًا توتي للهدايا والورد، مهتم بالاطلاع على خيارات ${categoryName} المتاحة لديكم وأسعارها.`,
  
  // Specific Product Inquiry
  product: (productName) => 
    `مرحبًا توتي للهدايا والورد، أود الاستفسار عن «${productName}» من حيث السعر وتوافرها حاليًا.`,
  
  // Gift Finder Assistance
  giftHelp: (occasion = "...", budget = "...") => 
    `مرحبًا، أبحث عن هدية مناسبة. المناسبة هي: ${occasion} والميزانية التقريبية: ${budget}. هل يمكنكم مساعدتي في معرفة الاختيارات المتاحة؟`,
  
  // Delivery Area Inquiry
  delivery: () => 
    "مرحبًا توتي للهدايا والورد، أود الاستفسار عن إمكانية التوصيل لمنطقتي داخل محافظة بني سويف.",
};
