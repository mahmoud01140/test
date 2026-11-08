#!/usr/bin/env node

/**
 * محرك البحث وجمع محلات الزهور في محافظات مصر
 * Flower Leads Egypt - Search & Marketing Message Engine
 */

const path = require('path');
const governorates = require('../src/config/governorates');
const { currentCategory, categories } = require('../src/config/categories');
const OverpassCollector = require('../src/collectors/overpassCollector');
const DirectoryCollector = require('../src/collectors/directoryCollector');
const Deduplicator = require('../src/services/deduplicator');
const StorageService = require('../src/services/storageService');
const { sleep } = require('../src/utils/delay');

async function main() {
  console.log('\n=============================================================');
  console.log('🌸 نظام استخراج بيانات محلات الزهور في محافظات مصر 🌸');
  console.log('Flower Leads Egypt - Search & Marketing Message Generator');
  console.log('=============================================================\n');

  const activeCategory = categories[currentCategory] || categories.flower_shops;
  console.log(`📌 النشاط الحالي: ${activeCategory.categoryAr} (${activeCategory.categoryEn})`);
  console.log(`📌 إجمالي المحافظات المستهدفة: ${governorates.length} محافظة`);

  // تهيئة الخدمات
  const dataPath = path.resolve(__dirname, '../data/flower-shops.json');
  const storage = new StorageService(dataPath);
  const data = storage.load();

  console.log(`📂 ملف البيانات: ${dataPath}`);
  console.log(`📊 المحلات المسجلة مسبقاً: ${data.shops.length}`);
  console.log(`✅ المحافظات المكتملة مسبقاً: ${data.metadata.completedGovernorates.length}`);
  console.log(`⏳ المحافظات المتبقية: ${data.metadata.pendingGovernorates.length}\n`);

  const deduplicator = new Deduplicator(data.shops);
  const overpassCollector = new OverpassCollector();
  const directoryCollector = new DirectoryCollector();

  // تفعيل الاستئناف التلقائي من آخر نقطة توقف
  const completedSet = new Set(data.metadata.completedGovernorates);
  const remainingGovernorates = governorates.filter(g => !completedSet.has(g.id));

  if (remainingGovernorates.length === 0) {
    console.log('🎉 جميع المحافظات مكتملة بالفعل! إذا أردت إعادة الفحص بالكامل، افرغ completedGovernorates في ملف JSON.\n');
    printSummary(data);
    return;
  }

  console.log(`🚀 بدء فحص ${remainingGovernorates.length} محافظة على دفعات متتالية...\n`);

  let sessionNewShops = 0;
  let sessionMergedShops = 0;
  let sessionDuplicates = 0;

  // معالجة كل محافظة على حدة
  for (let i = 0; i < remainingGovernorates.length; i++) {
    const gov = remainingGovernorates[i];
    const progress = `[${i + 1}/${remainingGovernorates.length}]`;
    console.log(`-------------------------------------------------------------`);
    console.log(`${progress} 📍 جاري فحص محافظة: ${gov.nameAr} (${gov.nameEn})...`);

    let govNewCount = 0;
    let govMergedCount = 0;
    let govDupCount = 0;
    let govIncompleteCount = 0;

    try {
      // 1. استخراج محلات الأدلة والأنشطة العامة المعتمدة
      const dirShops = await directoryCollector.collectByGovernorate(gov);
      console.log(`   ↳ عثر في الأدلة العامة على: ${dirShops.length} محل`);

      for (const candidate of dirShops) {
        const result = deduplicator.processCandidate(candidate);
        if (result.isNew) {
          govNewCount++;
          sessionNewShops++;
        } else if (result.wasMerged) {
          govMergedCount++;
          sessionMergedShops++;
        } else {
          govDupCount++;
          sessionDuplicates++;
        }

        if (!result.shop.phone) {
          govIncompleteCount++;
        }
      }

      // 2. استخراج محلات OpenStreetMap عبر Overpass API
      console.log(`   ↳ جاري استعلام OpenStreetMap للمحافظة...`);
      const osmShops = await overpassCollector.collectByGovernorate(gov);
      console.log(`   ↳ عثر في OpenStreetMap على: ${osmShops.length} محل مسمى`);

      for (const candidate of osmShops) {
        const result = deduplicator.processCandidate(candidate);
        if (result.isNew) {
          govNewCount++;
          sessionNewShops++;
        } else if (result.wasMerged) {
          govMergedCount++;
          sessionMergedShops++;
        } else {
          govDupCount++;
          sessionDuplicates++;
        }

        if (!result.shop.phone) {
          govIncompleteCount++;
        }
      }

      // تحديث قائمة المحلات بالملف وحفظ الدفعة فوراً
      data.shops = deduplicator.shops;
      storage.markGovernorateCompleted(data, gov.id);

      console.log(`   ✅ تم اكتمال ${gov.nameAr} بنجاح:`);
      console.log(`      • محلات جديدة: ${govNewCount}`);
      console.log(`      • بيانات مدمجة: ${govMergedCount}`);
      console.log(`      • محلات مكررة: ${govDupCount}`);
      console.log(`      • إجمالي قاعدة البيانات الحالي: ${data.shops.length}`);

      // تأخير مناسب بين المحافظات لتجنب الضغط على خوادم Overpass العامة
      if (i < remainingGovernorates.length - 1) {
        await sleep(1500);
      }
    } catch (err) {
      console.error(`   ❌ حدث خطأ أثناء معالجة محافظة ${gov.nameAr}:`, err.message);
      console.log(`   ⚠️ تم حفظ ما تم جمعه حتى الآن بأمان، وسيتم استكمال المحافظة في التشغيل القادم.`);
      // لا نفقد البيانات؛ نحفظ الموجود ونستمر
      data.shops = deduplicator.shops;
      storage.save(data);
    }
  }

  console.log('\n=============================================================');
  console.log('🎉 اكتملت عملية البحث والجمع لجميع المحافظات بنجاح!');
  console.log('=============================================================\n');

  console.log(`📊 إحصائيات الجلسة الحالية:`);
  console.log(`   • محلات جديدة تمت إضافتها: ${sessionNewShops}`);
  console.log(`   • محلات تم دمج وتحديث بياناتها: ${sessionMergedShops}`);
  console.log(`   • محاولات إضافة مكررة تم منعها: ${sessionDuplicates}`);

  printSummary(data);
}

function printSummary(data) {
  const total = data.shops.length;
  const withPhone = data.shops.filter(s => s.phone).length;
  const withWhatsapp = data.shops.filter(s => s.whatsapp).length;
  const withWebsite = data.shops.filter(s => s.hasWebsite).length;
  const withoutWebsite = data.shops.filter(s => s.hasWebsite === false).length;

  console.log(`\n📋 ملخص قاعدة البيانات النهائية (${data.metadata.country}):`);
  console.log(`   • إجمالي المحلات: ${total}`);
  console.log(`   • تمتلك رقم هاتف: ${withPhone} (${Math.round((withPhone / (total || 1)) * 100)}%)`);
  console.log(`   • تمتلك رقم واتساب موثوق: ${withWhatsapp} (${Math.round((withWhatsapp / (total || 1)) * 100)}%)`);
  console.log(`   • تمتلك موقعاً إلكترونياً بالفعل: ${withWebsite}`);
  console.log(`   • لا تمتلك موقعاً (فرص ذهبية): ${withoutWebsite}`);
  console.log(`   • المحافظات المكتملة: ${data.metadata.completedGovernorates.length} / 27`);
  console.log(`\n💾 تم حفظ وتحديث الملف بنجاح في: data/flower-shops.json`);

  if (data.shops.length > 0) {
    const sample = data.shops.find(s => s.whatsapp) || data.shops[0];
    console.log(`\n✨ نموذج لرسالة واتساب مخصصة (${sample.name} - ${sample.governorate}):`);
    console.log('-------------------------------------------------------------');
    console.log(sample.message);
    console.log('-------------------------------------------------------------\n');
  }
}

// معالجة الإيقاف اليدوي بأمان (Ctrl+C)
process.on('SIGINT', () => {
  console.log('\n\n⚠️ تم استلام إشارة إيقاف (SIGINT). جاري حفظ البيانات قبل الخروج...');
  process.exit(0);
});

main().catch(err => {
  console.error('\n❌ خطأ غير متوقع:', err);
  process.exit(1);
});

