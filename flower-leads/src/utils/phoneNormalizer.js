/**
 * توحيد صيغ أرقام الهواتف المصرية واستخراج رقم الواتساب الموثوق
 */

function normalizePhone(rawPhone) {
  if (!rawPhone || typeof rawPhone !== 'string') {
    return { phone: null, whatsapp: null };
  }

  // إزالة أي فواصل أو مسافات أو أحرف خاصة
  let cleaned = rawPhone.replace(/[^\d+]/g, '');

  if (!cleaned) {
    return { phone: null, whatsapp: null };
  }

  // تحويل البادئات الدولية
  if (cleaned.startsWith('0020')) {
    cleaned = cleaned.substring(4);
  } else if (cleaned.startsWith('+20')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('20') && cleaned.length > 10) {
    cleaned = cleaned.substring(2);
  }

  // إذا لم يبدأ بـ 0، أضف 0 محلي
  if (!cleaned.startsWith('0') && cleaned.length >= 8) {
    cleaned = '0' + cleaned;
  }

  // التحقق من كونه رقم محمول مصري (010, 011, 012, 015) مكون من 11 رقماً
  const mobileRegex = /^0(10|11|12|15)\d{8}$/;
  if (mobileRegex.test(cleaned)) {
    return {
      phone: cleaned,
      whatsapp: '20' + cleaned.substring(1) // الصيغة الدولية للواتساب 201xxxxxxxxx
    };
  }

  // أرقام أرضية داخل مصر (مثل 02xxxxxxx أو 03xxxxxxx أو 082xxxxxxx)
  const landlineRegex = /^0[2-9]\d{7,8}$/;
  if (landlineRegex.test(cleaned)) {
    return {
      phone: cleaned,
      whatsapp: null // الأرقام الأرضية ليست حسابات واتساب هاتفية افتراضية
    };
  }

  // إذا كان الرقم بصيغة أخرى صالحة
  if (cleaned.length >= 7 && cleaned.length <= 15) {
    return {
      phone: cleaned,
      whatsapp: null
    };
  }

  return { phone: null, whatsapp: null };
}

module.exports = {
  normalizePhone
};

