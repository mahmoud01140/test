#!/usr/bin/env node

/**
 * أداة إرسال رسائل الواتساب التسويقية لمحلات الزهور باستخدام Playwright
 * WhatsApp Marketing Dispatcher (Human-in-the-loop & Safe Automation)
 */

const path = require('path');
const readline = require('readline');
const governorates = require('../src/config/governorates');
const StorageService = require('../src/services/storageService');
const WhatsAppSender = require('../src/services/whatsappSender');
const { sleep } = require('../src/utils/delay');

// معالجة وسائط سطر الأوامر (CLI Arguments)
const args = process.argv.slice(2);
const isAuto = args.includes('--auto');
const isDryRun = args.includes('--dry-run');

let limit = 5; // الحد الأقصى الافتراضي للحماية وتجنب الحظر
const limitIndex = args.indexOf('--limit');
if (limitIndex !== -1 && args[limitIndex + 1]) {
  limit = parseInt(args[limitIndex + 1], 10) || 5;
}

let targetGov = null;
const govIndex = args.indexOf('--governorate');
if (govIndex !== -1 && args[govIndex + 1]) {
  targetGov = args[govIndex + 1].trim().toLowerCase();
}

// مطابقة اسم المحافظة بالعربية والإنجليزية
let matchedGov = null;
if (targetGov) {
  matchedGov = governorates.find(g =>
    g.id.toLowerCase() === targetGov ||
    g.nameEn.toLowerCase() === targetGov ||
    g.nameAr.includes(targetGov)
  );
}

// دالة لإنشاء واجهة قراءة المدخلات في الوضع التفاعلي
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans.trim().toLowerCase());
  }));
}

async function main() {
  console.log('\n=============================================================');
  console.log('📲 مرسل رسائل الواتساب التسويقية (Playwright WhatsApp Sender)');
  console.log('=============================================================\n');

  console.log(`⚙️  وضع التشغيل: ${isDryRun ? 'تجربة وهمية (Dry Run)' : isAuto ? 'تلقائي مع تأخير آمن (Auto Mode)' : 'تفاعلي - يتطلب موافقتك لكل رسالة (Interactive Mode)'}`);
  console.log(`🎯 الحد الأقصى لهذه الجلسة: ${limit} محلات`);
  if (targetGov) console.log(`📍 فلترة المحافظة: ${targetGov}`);

  // تحميل البيانات
  const dataPath = path.resolve(__dirname, '../data/flower-shops.json');
  const storage = new StorageService(dataPath);
  const data = storage.load();

  // تصفية المحلات المؤهلة للإرسال:
  // 1. لديها رقم هاتف أو واتساب
  // 2. لم يتم التواصل معها مسبقاً (status !== 'contacted')
  let eligibleShops = data.shops.filter(s => {
    const hasPhone = Boolean(s.whatsapp || s.phone);
    const notContacted = s.status !== 'contacted' && s.status !== 'invalid_number';
    if (!hasPhone || !notContacted) return false;

    if (targetGov) {
      if (matchedGov) {
        return s.governorate === matchedGov.nameAr;
      }
      const matchAr = s.governorate && s.governorate.toLowerCase().includes(targetGov);
      const matchCity = s.city && s.city.toLowerCase().includes(targetGov);
      return matchAr || matchCity;
    }
    return true;
  });

  console.log(`\n📋 إجمالي المحلات المسجلة: ${data.shops.length}`);
  console.log(`✅ محلات مؤهلة للإرسال (لم يتم مراسلتها بعد): ${eligibleShops.length}`);

  if (eligibleShops.length === 0) {
    console.log('\n🎉 تم مراسلة جميع المحلات المؤهلة بالفعل أو لا توجد محلات تنطبق عليها الشروط.\n');
    return;
  }

  // أخذ الدفعة المحددة
  const batch = eligibleShops.slice(0, limit);
  console.log(`🚀 جاري معالجة دفعة مكونة من ${batch.length} محلات...\n`);

  if (isDryRun) {
    console.log('🔍 [Dry Run] استعراض المحلات التي سيتم مراسلتها دون فتح المتصفح:\n');
    batch.forEach((shop, idx) => {
      console.log(`[${idx + 1}] ${shop.name} | ${shop.governorate || ''} (${shop.city || ''}) | هاتف: ${shop.whatsapp || shop.phone}`);
      console.log(`    الرسالة:\n${shop.message}\n-----------------------------------`);
    });
    return;
  }

  // تنبيه الحماية من الحظر
  console.log('⚠️  تنبيه هام للسلامة وحماية حساب الواتساب:');
  console.log('   • لا ترسل رسائل متتالية بسرعة فائقة لتجنب كشف النشاط الآلي من واتساب.');
  console.log('   • يُنصح بمراسلة 5 إلى 10 محلات يومياً كحد أقصى.');
  console.log('   • في أول مرة، سيفتح المتصفح لتسجيل الدخول بمسح رمز QR.\n');

  // تهيئة خدمة واتساب
  const sender = new WhatsAppSender({
    sessionDir: path.resolve(__dirname, '../.whatsapp-session'),
    headless: false
  });

  await sender.initBrowser();

  const loggedIn = await sender.ensureLoggedIn();
  if (!loggedIn) {
    await sender.close();
    console.error('❌ تعذر المتابعة بدون تسجيل الدخول إلى WhatsApp Web.');
    return;
  }

  let sentCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < batch.length; i++) {
    const shop = batch[i];
    const phone = shop.whatsapp || shop.phone;

    console.log(`\n-------------------------------------------------------------`);
    console.log(`[${i + 1}/${batch.length}] 🏢 المحل: ${shop.name}`);
    console.log(`📍 الموقع: ${shop.governorate || ''} - ${shop.city || ''}`);
    console.log(`📞 رقم الواتساب: ${phone}`);
    console.log(`-------------------------------------------------------------`);

    // في الوضع التفاعلي: نطلب موافقة المستخدم
    if (!isAuto) {
      console.log('📝 نص الرسالة المقترحة:');
      console.log(shop.message);
      console.log('-------------------------------------------------------------');

      const ans = await askQuestion('هل تريد إرسال هذه الرسالة للمحل الآن؟ [y: إرسال / n: تخطي / q: خروج]: ');

      if (ans === 'q') {
        console.log('\n🛑 تم إنهاء الإرسال بناءً على طلبك.');
        break;
      }

      if (ans !== 'y' && ans !== 'yes' && ans !== 'نعم') {
        console.log('⏭️  تم تخطي هذا المحل.');
        skippedCount++;
        continue;
      }
    }

    // إرسال الرسالة عبر المتصفح
    const result = await sender.sendMessage(shop);

    if (result.success) {
      sentCount++;
      shop.status = 'contacted';
      shop.contactedAt = new Date().toISOString();
      storage.save(data);
      console.log(`💾 تم تحديث حالة [${shop.name}] إلى "contacted" وحفظها في JSON.`);

      // تأخير آمن بين الرسائل
      if (i < batch.length - 1) {
        const delaySeconds = isAuto
          ? Math.floor(Math.random() * 15) + 20 // بين 20 و 35 ثانية عشوائياً في الوضع التلقائي
          : 5; // 5 ثوانٍ في الوضع التفاعلي
        console.log(`⏳ انتظار أمان لمدة ${delaySeconds} ثانية قبل المحل التالي لتفادي قيود واتساب...`);
        await sleep(delaySeconds * 1000);
      }
    } else {
      failedCount++;
      if (result.reason === 'invalid_number') {
        shop.status = 'invalid_number';
        storage.save(data);
      }
    }
  }

  await sender.close();

  console.log('\n=============================================================');
  console.log('📊 ملخص نتائج جلسة الإرسال:');
  console.log(`   • تم الإرسال بنجاح: ${sentCount}`);
  console.log(`   • تم التخطي: ${skippedCount}`);
  console.log(`   • فشل / رقم غير مسجل: ${failedCount}`);
  console.log(`   • متبقي محلات غير مراسلة: ${eligibleShops.length - sentCount}`);
  console.log('=============================================================\n');
}

main().catch(err => {
  console.error('\n❌ خطأ غير متوقع أثناء التشغيل:', err);
  process.exit(1);
});
