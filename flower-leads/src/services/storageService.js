const fs = require('fs');
const path = require('path');
const governoratesList = require('../config/governorates');
const { currentCategory, categories } = require('../config/categories');

class StorageService {
  constructor(dataFilePath) {
    this.filePath = dataFilePath || path.resolve(__dirname, '../../data/flower-shops.json');
    this.dirPath = path.dirname(this.filePath);

    if (!fs.existsSync(this.dirPath)) {
      fs.mkdirSync(this.dirPath, { recursive: true });
    }
  }

  /**
   * تهيئة الهيكل الأولي للبيانات إذا لم يكن الملف موجوداً
   */
  getDefaultData() {
    const activeCat = categories[currentCategory] || categories.flower_shops;
    const allGovIds = governoratesList.map(g => g.id);

    return {
      metadata: {
        country: 'Egypt',
        category: activeCat.categoryEn,
        lastUpdated: null,
        totalShops: 0,
        completedGovernorates: [],
        pendingGovernorates: allGovIds
      },
      shops: []
    };
  }

  /**
   * قراءة البيانات الحالية من الملف بأمان
   */
  load() {
    if (!fs.existsSync(this.filePath)) {
      const initial = this.getDefaultData();
      this.save(initial);
      return initial;
    }

    try {
      const raw = fs.readFileSync(this.filePath, 'utf8');
      const data = JSON.parse(raw);

      // التأكد من اكتمال الهيكل
      if (!data.metadata) data.metadata = {};
      if (!Array.isArray(data.shops)) data.shops = [];
      if (!Array.isArray(data.metadata.completedGovernorates)) data.metadata.completedGovernorates = [];

      // تحديث قائمة المحافظات المتبقية (pending) ديناميكياً
      const completedSet = new Set(data.metadata.completedGovernorates);
      data.metadata.pendingGovernorates = governoratesList
        .map(g => g.id)
        .filter(id => !completedSet.has(id));

      data.metadata.totalShops = data.shops.length;

      return data;
    } catch (err) {
      console.error(`[StorageService] خطأ في قراءة ${this.filePath}، جاري إنشاء نسخة احتياطية:`, err.message);
      const backupPath = `${this.filePath}.corrupt.${Date.now()}`;
      try {
        fs.copyFileSync(this.filePath, backupPath);
      } catch (_) {}
      const fallback = this.getDefaultData();
      this.save(fallback);
      return fallback;
    }
  }

  /**
   * الحفظ الذري (Atomic Save) لمنع تلف البيانات عند انقطاع العملية أو الكهرباء
   */
  save(data) {
    data.metadata.lastUpdated = new Date().toISOString();
    data.metadata.totalShops = Array.isArray(data.shops) ? data.shops.length : 0;

    const tempPath = `${this.filePath}.tmp`;
    const jsonString = JSON.stringify(data, null, 2);

    fs.writeFileSync(tempPath, jsonString, 'utf8');
    fs.renameSync(tempPath, this.filePath);
  }

  /**
   * تسجيل إتمام محافظة معينة
   */
  markGovernorateCompleted(data, govId) {
    if (!data.metadata.completedGovernorates.includes(govId)) {
      data.metadata.completedGovernorates.push(govId);
    }
    data.metadata.pendingGovernorates = data.metadata.pendingGovernorates.filter(id => id !== govId);
    this.save(data);
  }
}

module.exports = StorageService;

