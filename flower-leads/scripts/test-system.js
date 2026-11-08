/**
 * اختبارات تحقق شاملة للوحدات ومنع التكرار
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { normalizePhone } = require('../src/utils/phoneNormalizer');
const { normalizeText, textSimilarity } = require('../src/utils/textNormalizer');
const { calculateDistanceMeters } = require('../src/utils/geoDistance');
const Deduplicator = require('../src/services/deduplicator');
const StorageService = require('../src/services/storageService');
const { generateMarketingMessage } = require('../src/services/messageGenerator');

console.log('🧪 بدء اختبارات وحدات نظام flower-leads...\n');

// 1. اختبار توحيد أرقام الهواتف المصرية
console.log('1. اختبار phoneNormalizer:');
assert.strictEqual(normalizePhone('+20 100 587 8479').phone, '01005878479');
assert.strictEqual(normalizePhone('+20 100 587 8479').whatsapp, '201005878479');
assert.strictEqual(normalizePhone('00201154440011').phone, '01154440011');
assert.strictEqual(normalizePhone('00201154440011').whatsapp, '201154440011');
assert.strictEqual(normalizePhone('0224732122').phone, '0224732122');
assert.strictEqual(normalizePhone('0224732122').whatsapp, null); // أرضي
assert.strictEqual(normalizePhone(null).phone, null);
console.log('   ✅ نجح اختبار توحيد أرقام الهواتف بنجاح.');

// 2. اختبار تطبيع النصوص والأسماء العربية
console.log('2. اختبار textNormalizer:');
assert.strictEqual(normalizeText('أزهار الـرَّبِيع'), 'ازهار الربيع');
assert.strictEqual(normalizeText('محل زهرة اللوتس'), 'محل زهره اللوتس');
assert.strictEqual(normalizeText('Florist & Gifts!'), 'florist gifts');
assert(textSimilarity('زهور المحبة', 'محل زهور المحبه') > 0.6);
console.log('   ✅ نجح اختبار تطبيع النصوص والتشابه.');

// 3. اختبار المسافات الجغرافية
console.log('3. اختبار geoDistance:');
const d = calculateDistanceMeters(30.0152, 31.4285, 30.0154, 31.4286);
assert(d !== null && d < 40);
console.log(`   ✅ المسافة المحسوبة لنقطتين متقاربتين: ${d} متر (أقل من 60م).`);

// 4. اختبار منع التكرار والدمج الذكي
console.log('4. اختبار Deduplicator:');
const deduplicator = new Deduplicator([]);

const shop1 = {
  name: 'توليب للزهور',
  phone: '01012345678',
  governorate: 'القاهرة',
  source: ['مصدر 1'],
  sourceUrl: ['https://source1.eg']
};

const res1 = deduplicator.processCandidate(shop1);
assert.strictEqual(res1.isNew, true);
assert.strictEqual(deduplicator.shops.length, 1);

// نفس المحل برقم دولي ومصدر جديد
const shop1DupPhone = {
  name: 'توليب فلاورز',
  phone: '+20 10 1234 5678',
  address: 'شارع التحرير',
  source: ['مصدر 2'],
  sourceUrl: ['https://source2.eg']
};
const res2 = deduplicator.processCandidate(shop1DupPhone);
assert.strictEqual(res2.isNew, false);
assert.strictEqual(deduplicator.shops.length, 1, 'يجب ألا يزيد عدد المحلات عند إضافة مكرر');
assert.strictEqual(res2.shop.address, 'شارع التحرير', 'يجب دمج العنوان الناقص');
assert(res2.shop.source.includes('مصدر 1') && res2.shop.source.includes('مصدر 2'), 'يجب دمج المصادر');
console.log('   ✅ نجح اختبار منع التكرار ودمج البيانات الناقصة.');

// 5. اختبار توليد الرسائل التسويقية
console.log('5. اختبار messageGenerator:');
const msg = generateMarketingMessage({
  name: 'روزا بيلا',
  city: 'مدينة نصر',
  governorate: 'القاهرة',
  hasWebsite: false
});
assert(msg.includes('روزا بيلا'));
assert(msg.includes('مدينة نصر'));
assert(msg.includes('نموذج تجريبي'));
console.log('   ✅ نجح اختبار صياغة الرسالة التسويقية.');

// 6. اختبار التخزين الذري
console.log('6. اختبار StorageService:');
const testDataPath = path.resolve(__dirname, '../data/test-shops.json');
if (fs.existsSync(testDataPath)) fs.unlinkSync(testDataPath);

const storage = new StorageService(testDataPath);
const testData = storage.load();
assert.strictEqual(testData.shops.length, 0);

testData.shops.push({ name: 'محل تجريبي', phone: '01000000000' });
storage.markGovernorateCompleted(testData, 'cairo');

const reloaded = storage.load();
assert.strictEqual(reloaded.shops.length, 1);
assert(reloaded.metadata.completedGovernorates.includes('cairo'));
assert(!reloaded.metadata.pendingGovernorates.includes('cairo'));

fs.unlinkSync(testDataPath);
console.log('   ✅ نجح اختبار الحفظ الذري والاستئناف.');

console.log('\n🎉 جميع الاختبارات الـ 6 اجتازت بنجاح 100%!\n');

