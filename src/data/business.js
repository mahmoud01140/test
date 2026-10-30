/**
 * Business Configuration and WhatsApp Helper Functions
 * Central source of truth for business contact details and context-aware messaging.
 */

export const BUSINESS_CONFIG = {
  name: "فلورا للهدايا والورد",
  tagline: "لكل مناسبة هدية وباقة تحكي حكاية",
  category: "متجر هدايا وباقات ورد وقطع ديكور لجميع المناسبات",
  location: "خدمة التوصيل السريع لجميع المناطق",
  phone: "012345678974",
  whatsappNumber: "2012345678974",
  baseWhatsappUrl: "https://wa.me/2012345678974",
  phoneCallUrl: "tel:012345678974",
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
    "مرحبًا فلورا للهدايا والورد، أود الاستفسار عن باقات الورد والهدايا المتاحة لديكم.",
  
  // Category Specific
  category: (categoryName) => 
    `مرحبًا فلورا للهدايا والورد، مهتم بالاطلاع على خيارات ${categoryName} المتاحة لديكم وأسعارها.`,
  
  // Specific Product Inquiry
  product: (productName) => 
    `مرحبًا فلورا للهدايا والورد، أود الاستفسار عن «${productName}» من حيث السعر وتوافرها حاليًا.`,
  
  // Gift Finder Assistance
  giftHelp: (occasion = "...", budget = "...") => 
    `مرحبًا، أبحث عن هدية مناسبة. المناسبة هي: ${occasion} والميزانية التقريبية: ${budget}. هل يمكنكم مساعدتي في معرفة الاختيارات المتاحة؟`,
  
  // Delivery Area Inquiry
  delivery: () => 
    "مرحبًا فلورا للهدايا والورد، أود الاستفسار عن إمكانية ومواعيد التوصيل لمنطقتي.",
};
