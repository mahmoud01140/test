const https = require('https');
const { sleep } = require('../utils/delay');

class OverpassCollector {
  constructor() {
    this.mirrors = [
      'overpass-api.de',
      'overpass.kumi.systems',
      'overpass.private.coffee'
    ];
    this.currentMirrorIndex = 0;
  }

  getEndpoint() {
    return this.mirrors[this.currentMirrorIndex % this.mirrors.length];
  }

  nextMirror() {
    this.currentMirrorIndex++;
    return this.getEndpoint();
  }

  /**
   * إرسال طلب POST لخادم Overpass API
   */
  async requestOverpass(query, timeoutMs = 25000) {
    const postData = 'data=' + encodeURIComponent(query);
    const host = this.getEndpoint();

    return new Promise((resolve, reject) => {
      const req = https.request({
        hostname: host,
        path: '/api/interpreter',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
          'User-Agent': 'FlowerLeadsEgypt/1.0 (Commercial Lead Generator)'
        },
        timeout: timeoutMs
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              const parsed = JSON.parse(body);
              resolve(parsed);
            } catch (err) {
              reject(new Error(`Overpass JSON Parse Error on ${host}: ${err.message}`));
            }
          } else {
            reject(new Error(`Overpass HTTP ${res.statusCode} on ${host}`));
          }
        });
      });

      req.on('error', (err) => reject(new Error(`Overpass Network Error on ${host}: ${err.message}`)));
      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`Overpass Timeout on ${host}`));
      });

      req.write(postData);
      req.end();
    });
  }

  /**
   * استخراج بيانات المحلات في نطاق محافظة معينة مع إعادة المحاولة وتغيير الخادم
   */
  async collectByGovernorate(governorate, maxRetries = 3) {
    const [minLat, minLon, maxLat, maxLon] = governorate.bbox;

    // استعلام Overpass محدد بنطاق المحافظة
    const query = `[out:json][timeout:25];
(
  node["shop"="florist"](${minLat},${minLon},${maxLat},${maxLon});
  node["shop"="flowers"](${minLat},${minLon},${maxLat},${maxLon});
  way["shop"="florist"](${minLat},${minLon},${maxLat},${maxLon});
  way["shop"="flowers"](${minLat},${minLon},${maxLat},${maxLon});
);
out center body;`;

    let attempt = 0;
    while (attempt < maxRetries) {
      attempt++;
      try {
        const response = await this.requestOverpass(query);
        const elements = response.elements || [];
        const shops = [];

        for (const el of elements) {
          const tags = el.tags || {};
          const name = tags['name:ar'] || tags.name || tags['name:en'] || null;

          // تجاهل النقاط المجهولة تماماً دون أي اسم
          if (!name) continue;

          // استخراج الإحداثيات
          const lat = el.lat !== undefined ? el.lat : (el.center ? el.center.lat : null);
          const lon = el.lon !== undefined ? el.lon : (el.center ? el.center.lon : null);

          // استخراج الهاتف
          const phone = tags['contact:phone'] || tags.phone || tags['contact:mobile'] || tags.mobile || null;
          const whatsapp = tags['contact:whatsapp'] || tags.whatsapp || null;

          // استخراج العنوان
          const street = tags['addr:street'] || '';
          const housenumber = tags['addr:housenumber'] || '';
          const district = tags['addr:district'] || tags['addr:suburb'] || '';
          const addressParts = [housenumber, street, district].filter(Boolean);
          const address = addressParts.length > 0 ? addressParts.join('، ') : (tags['addr:full'] || null);

          // استخراج المدينة
          const city = tags['addr:city'] || district || governorate.nameAr;

          // الروابط
          const website = tags['contact:website'] || tags.website || null;
          const facebook = tags['contact:facebook'] || tags.facebook || null;
          const instagram = tags['contact:instagram'] || tags.instagram || null;

          shops.push({
            name: name.trim(),
            phone: phone,
            whatsapp: whatsapp,
            address: address,
            city: city,
            governorate: governorate.nameAr,
            latitude: lat,
            longitude: lon,
            website: website,
            facebook: facebook,
            instagram: instagram,
            hasWebsite: Boolean(website),
            source: ['OpenStreetMap (Overpass API)'],
            sourceUrl: [`https://www.openstreetmap.org/${el.type}/${el.id}`],
            status: 'new'
          });
        }

        return shops;
      } catch (err) {
        console.warn(`[OverpassCollector] محاولة ${attempt}/${maxRetries} فشلت للمحافظة [${governorate.nameAr}]: ${err.message}`);
        this.nextMirror();
        if (attempt < maxRetries) {
          await sleep(2500 * attempt);
        }
      }
    }

    // إذا فشلت كل المحاولات نرجع مصفوفة فارغة دون إيقاف البرنامج
    return [];
  }
}

module.exports = OverpassCollector;

