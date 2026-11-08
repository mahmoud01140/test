/**
 * تطبيع النصوص والأسماء العربية والإنجليزية للمقارنة ومنع التكرار
 */

function normalizeText(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  let normalized = text.trim().toLowerCase();

  // إزالة التشكيل العربي
  normalized = normalized.replace(/[\u064B-\u065F\u0670]/g, '');

  // إزالة التطويل (ـ)
  normalized = normalized.replace(/\u0640/g, '');

  // توحيد الألف
  normalized = normalized.replace(/[أإآٱ]/g, 'ا');

  // توحيد الياء والتاء المربوطة
  normalized = normalized.replace(/ة/g, 'ه');
  normalized = normalized.replace(/ى/g, 'ي');

  // توحيد الهمزات
  normalized = normalized.replace(/[ؤئ]/g, 'ء');

  // إزالة الرموز الخاصة وعلامات الترقيم
  normalized = normalized.replace(/[^\w\s\u0600-\u06FF]/g, ' ');

  // توحيد المسافات المتعددة
  normalized = normalized.replace(/\s+/g, ' ').trim();

  return normalized;
}

/**
 * حساب درجة التشابه النصي البسيطة (Jaccard similarity on tokens)
 */
function textSimilarity(a, b) {
  const normA = normalizeText(a);
  const normB = normalizeText(b);

  if (normA === normB) return 1.0;
  if (!normA || !normB) return 0.0;

  const tokensA = new Set(normA.split(' '));
  const tokensB = new Set(normB.split(' '));

  const intersection = new Set([...tokensA].filter(x => tokensB.has(x)));
  const union = new Set([...tokensA, ...tokensB]);

  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

module.exports = {
  normalizeText,
  textSimilarity
};

