/**
 * خدمة إرسال رسائل الواتساب باستخدام Playwright
 * WhatsApp Web Automation Service
 */

const path = require('path');
const { chromium } = require('playwright');
const { sleep } = require('../utils/delay');

class WhatsAppSender {
  constructor(options = {}) {
    this.sessionDir = options.sessionDir || path.resolve(__dirname, '../../.whatsapp-session');
    this.headless = options.headless || false; // الوضع المرئي مطلوب لمسح QR Code
    this.browserContext = null;
    this.page = null;
    this.isLoggedIn = false;
  }

  /**
   * تشغيل المتصفح مع حفظ الجلسة (Persistent Context)
   */
  async initBrowser() {
    console.log('🌐 جاري تشغيل المتصفح وتهيئة جلسة WhatsApp Web...');

    this.browserContext = await chromium.launchPersistentContext(this.sessionDir, {
      channel: 'msedge',
      headless: this.headless,
      viewport: { width: 1280, height: 800 },
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });

    this.page = this.browserContext.pages().length > 0
      ? this.browserContext.pages()[0]
      : await this.browserContext.newPage();

    // محاكاة مستخدم حقيقي
    await this.page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
  }

  /**
   * فتح واتساب ويب والتأكد من تسجيل الدخول (أو انتظار مسح QR Code)
   */
  async ensureLoggedIn(timeoutMs = 120000) {
    if (this.isLoggedIn) return true;

    console.log('📲 جاري فتح https://web.whatsapp.com ...');
    await this.page.goto('https://web.whatsapp.com', { waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log('⏳ جاري التحقق من تسجيل الدخول...');
    console.log('💡 إذا ظهر رمز QR على الشاشة، يُرجى مسحه الآن من تطبيق واتساب على هاتفك (الأجهزة المرتبطة).');

    const chatListSelector = '#pane-side, div[aria-label="Chat list"], div[aria-label="قائمة الدردشات"], div[id="side"]';

    try {
      // انتظار ظهور قائمة الدردشات (يدل على اكتمال تسجيل الدخول)
      await this.page.waitForSelector(chatListSelector, { timeout: timeoutMs });
      this.isLoggedIn = true;
      console.log('✅ تم تسجيل الدخول بنجاح إلى WhatsApp Web!\n');
      return true;
    } catch (err) {
      console.error('❌ انتهت مهلة انتظار تسجيل الدخول أو مسح رمز QR.');
      return false;
    }
  }

  /**
   * إرسال رسالة إلى محل معين
   * @param {object} shop
   * @returns {Promise<{ success: boolean, reason?: string }>}
   */
  async sendMessage(shop) {
    if (!this.isLoggedIn) {
      throw new Error('يجب تسجيل الدخول أولاً قبل إرسال الرسائل');
    }

    const whatsappNumber = shop.whatsapp || shop.phone;
    if (!whatsappNumber) {
      return { success: false, reason: 'لا يوجد رقم هاتف أو واتساب' };
    }

    const message = shop.message;
    if (!message) {
      return { success: false, reason: 'نص الرسالة التسويقية فارغ' };
    }

    // تنظيف رقم الواتساب ليكون بصيغة دولية (مثل 201xxxxxxxxx)
    let cleanNumber = String(whatsappNumber).replace(/[^\d]/g, '');
    if (cleanNumber.startsWith('01') && cleanNumber.length === 11) {
      cleanNumber = '20' + cleanNumber.substring(1);
    }

    const targetUrl = `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;

    console.log(`➡️  جاري فتح محادثة [${shop.name}] (${cleanNumber})...`);

    try {
      await this.page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });

      // محددات مربع إدخال النص
      const inputSelector = 'footer div[contenteditable="true"], div[data-tab="10"][contenteditable="true"], div[role="textbox"][contenteditable="true"]';
      // محددات رسالة خطأ الرقم غير صحيح
      const invalidNumberModal = 'div[data-animate-modal-popup="true"], div[role="alert"], button:has-text("OK"), button:has-text("موافق")';

      // انتظار ظهور إما مربع الكتابة أو رسالة الخطأ
      const found = await Promise.race([
        this.page.waitForSelector(inputSelector, { timeout: 35000 }).then(() => 'input'),
        this.page.waitForSelector(invalidNumberModal, { timeout: 35000 }).then(() => 'invalid').catch(() => null)
      ]);

      if (found === 'invalid') {
        console.warn(`   ⚠️ الرقم ${cleanNumber} غير مسجل على واتساب أو غير صالح.`);
        // إغلاق النافذة المنبثقة إن وجدت
        try {
          const okBtn = await this.page.$('button:has-text("OK"), button:has-text("موافق")');
          if (okBtn) await okBtn.click();
        } catch (_) {}
        return { success: false, reason: 'invalid_number' };
      }

      if (!found || found !== 'input') {
        console.warn(`   ⚠️ تعذر تحميل المحادثة للمحل ${shop.name}.`);
        return { success: false, reason: 'chat_load_timeout' };
      }

      // إعطاء مهلة بسيطة لتحميل النص المعبأ مسبقاً
      await sleep(1500);

      // محاولة النقر على زر الإرسال
      const sendButtonSelector = 'button span[data-icon="send"], button[aria-label="Send"], button[aria-label="إرسال"], span[data-icon="send"]';
      const sendButton = await this.page.$(sendButtonSelector);

      if (sendButton) {
        await sendButton.click();
      } else {
        // بديل: الضغط على Enter داخل حقل الكتابة
        await this.page.focus(inputSelector);
        await this.page.keyboard.press('Enter');
      }

      console.log(`   📨 تم إرسال الرسالة بنجاح إلى [${shop.name}]!`);

      // انتظار 3 ثوانٍ للتأكد من خروج الرسالة من المتصفح
      await sleep(3000);

      return { success: true };
    } catch (err) {
      console.error(`   ❌ خطأ أثناء الإرسال لـ [${shop.name}]:`, err.message);
      return { success: false, reason: err.message };
    }
  }

  /**
   * إغلاق المتصفح بأمان
   */
  async close() {
    if (this.browserContext) {
      console.log('🔒 جاري إغلاق المتصفح وحفظ الجلسة...');
      await this.browserContext.close();
      this.browserContext = null;
      this.page = null;
      this.isLoggedIn = false;
    }
  }
}

module.exports = WhatsAppSender;

