const { normalizePhone } = require('../utils/phoneNormalizer');
const { normalizeText, textSimilarity } = require('../utils/textNormalizer');
const { calculateDistanceMeters } = require('../utils/geoDistance');
const { generateMarketingMessage } = require('./messageGenerator');

/**
 * فحص وتطبيق منع التكرار الذكي ودمج البيانات الناقصة
 */
class Deduplicator {
  constructor(existingShops = []) {
    this.shops = existingShops;
    this.phoneIndex = new Map();
    this.nameGovIndex = new Map();

    this.rebuildIndex();
  }

  rebuildIndex() {
    this.phoneIndex.clear();
    this.nameGovIndex.clear();

    for (const shop of this.shops) {
      if (shop.phone) {
        const { phone } = normalizePhone(shop.phone);
        if (phone) this.phoneIndex.set(phone, shop);
      }

      if (shop.name && shop.governorate) {
        const key = `${normalizeText(shop.name)}|||${normalizeText(shop.governorate)}`;
        this.nameGovIndex.set(key, shop);
      }
    }
  }

  /**
   * فحص ما إذا كان المحل مكرراً وإرجاع الكائن الموجود إن وجد
   */
  findDuplicate(candidate) {
    // 1. الفحص برقم الهاتف أولاً (الأكثر موثوقية)
    if (candidate.phone) {
      const { phone } = normalizePhone(candidate.phone);
      if (phone && this.phoneIndex.has(phone)) {
        return { match: this.phoneIndex.get(phone), reason: 'phone_match' };
      }
    }

    // 2. الفحص بالاسم والمحافظة
    if (candidate.name && candidate.governorate) {
      const key = `${normalizeText(candidate.name)}|||${normalizeText(candidate.governorate)}`;
      if (this.nameGovIndex.has(key)) {
        return { match: this.nameGovIndex.get(key), reason: 'name_gov_exact_match' };
      }
    }

    // 3. الفحص بالإحداثيات الجغرافية (إذا توفرت) مع تقارب الاسم
    if (candidate.latitude !== null && candidate.longitude !== null && candidate.name) {
      for (const shop of this.shops) {
        if (shop.latitude !== null && shop.longitude !== null) {
          const dist = calculateDistanceMeters(
            candidate.latitude,
            candidate.longitude,
            shop.latitude,
            shop.longitude
          );

          // إذا كانت المسافة أقل من 60 متراً وهناك تشابه بالاسم
          if (dist !== null && dist <= 60) {
            const sim = textSimilarity(candidate.name, shop.name);
            if (sim >= 0.5) {
              return { match: shop, reason: `geo_proximity_${dist}m_sim_${sim.toFixed(2)}` };
            }
          }
        }
      }
    }

    // 4. فحص تشابه الأسماء العالي داخل نفس المحافظة والمدينة
    if (candidate.name && candidate.governorate) {
      const candNormName = normalizeText(candidate.name);
      for (const shop of this.shops) {
        if (
          shop.governorate &&
          normalizeText(shop.governorate) === normalizeText(candidate.governorate)
        ) {
          const sim = textSimilarity(candNormName, shop.name);
          // لا نكتفي بتشابه الاسم فقط: يجب أن يكون التشابه مرتفعاً جداً ويتطابق في العنوان أو المدينة
          if (sim >= 0.85) {
            if (
              (candidate.city && shop.city && normalizeText(candidate.city) === normalizeText(shop.city)) ||
              (candidate.address && shop.address && textSimilarity(candidate.address, shop.address) > 0.4)
            ) {
              return { match: shop, reason: `high_name_similarity_${sim.toFixed(2)}` };
            }
          }
        }
      }
    }

    return null;
  }

  /**
   * دمج بيانات محل جديد مع محل موجود دون فقد أي معلومات
   */
  mergeShop(existing, candidate) {
    let updated = false;

    // دمج الحقول الفردية الناقصة
    const fieldsToFill = [
      'phone', 'whatsapp', 'address', 'city', 'governorate',
      'latitude', 'longitude', 'website', 'facebook', 'instagram', 'hasWebsite'
    ];

    for (const f of fieldsToFill) {
      if ((existing[f] === null || existing[f] === undefined || existing[f] === '') && candidate[f]) {
        if (f === 'whatsapp') {
          const norm = normalizePhone(candidate[f]);
          existing[f] = norm.whatsapp || norm.phone || candidate[f];
        } else if (f === 'phone') {
          const norm = normalizePhone(candidate[f]);
          existing[f] = norm.phone || candidate[f];
          if (!existing.whatsapp && norm.whatsapp) {
            existing.whatsapp = norm.whatsapp;
          }
        } else {
          existing[f] = candidate[f];
        }
        updated = true;
      }
    }

    // دمج المصادر والروابط
    if (Array.isArray(candidate.source)) {
      for (const s of candidate.source) {
        if (!existing.source.includes(s)) {
          existing.source.push(s);
          updated = true;
        }
      }
    } else if (typeof candidate.source === 'string' && !existing.source.includes(candidate.source)) {
      existing.source.push(candidate.source);
      updated = true;
    }

    if (Array.isArray(candidate.sourceUrl)) {
      for (const u of candidate.sourceUrl) {
        if (u && !existing.sourceUrl.includes(u)) {
          existing.sourceUrl.push(u);
          updated = true;
        }
      }
    } else if (typeof candidate.sourceUrl === 'string' && candidate.sourceUrl && !existing.sourceUrl.includes(candidate.sourceUrl)) {
      existing.sourceUrl.push(candidate.sourceUrl);
      updated = true;
    }

    // تحديث الرسالة التسويقية بالبيانات الأحدث إن تم تحديث المدينة أو الموقع
    if (updated) {
      existing.message = generateMarketingMessage(existing);
      this.rebuildIndex();
    }

    return updated;
  }

  /**
   * معالجة إضافة أو دمج محل مرشح
   * @returns {{ isNew: boolean, wasMerged: boolean, shop: object }}
   */
  processCandidate(candidate) {
    const dupResult = this.findDuplicate(candidate);

    if (dupResult) {
      const wasMerged = this.mergeShop(dupResult.match, candidate);
      return { isNew: false, wasMerged, shop: dupResult.match, reason: dupResult.reason };
    }

    // محل جديد بالكامل
    const { phone, whatsapp } = normalizePhone(candidate.phone);
    const candidateWa = candidate.whatsapp ? normalizePhone(candidate.whatsapp).whatsapp : null;

    const newShop = {
      id: candidate.id || `shop_eg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: candidate.name ? candidate.name.trim() : 'محل زهور',
      phone: phone,
      whatsapp: candidateWa || whatsapp,
      address: candidate.address || null,
      city: candidate.city || null,
      governorate: candidate.governorate || null,
      latitude: typeof candidate.latitude === 'number' ? candidate.latitude : null,
      longitude: typeof candidate.longitude === 'number' ? candidate.longitude : null,
      website: candidate.website || null,
      facebook: candidate.facebook || null,
      instagram: candidate.instagram || null,
      hasWebsite: typeof candidate.hasWebsite === 'boolean'
        ? candidate.hasWebsite
        : candidate.website ? true : false,
      source: Array.isArray(candidate.source)
        ? candidate.source
        : candidate.source ? [candidate.source] : [],
      sourceUrl: Array.isArray(candidate.sourceUrl)
        ? candidate.sourceUrl
        : candidate.sourceUrl ? [candidate.sourceUrl] : [],
      status: candidate.status || 'new',
      message: candidate.message || null,
      createdAt: candidate.createdAt || new Date().toISOString()
    };

    if (!newShop.message) {
      newShop.message = generateMarketingMessage(newShop);
    }

    this.shops.push(newShop);
    this.rebuildIndex();

    return { isNew: true, wasMerged: false, shop: newShop };
  }
}

module.exports = Deduplicator;
