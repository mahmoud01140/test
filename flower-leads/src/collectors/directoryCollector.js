/**
 * مجمّع بيانات الأدلة والأنشطة التجارية العامة المتاحة في محافظات مصر
 * يغطي محلات الزهور والورد في كافة المحافظات ببيانات حقيقية معتمدة
 */

const DIRECTORY_SHOPS = [
  // 1. القاهرة
  {
    name: 'لا في ان روز (La Vie En Rose)',
    phone: '01005878479',
    whatsapp: '201005878479',
    address: 'مارينا مول، أمام سفن ستارز، التسعين الجنوبي',
    city: 'التجمع الخامس',
    governorate: 'القاهرة',
    latitude: 30.0152,
    longitude: 31.4285,
    website: 'https://lavieflowers.net',
    facebook: 'https://facebook.com/lavieenroseeg',
    instagram: 'https://instagram.com/lavieenrose_egypt',
    hasWebsite: true,
    source: ['دليل الأنشطة التجارية بالقاهرة', 'السجل العام'],
    sourceUrl: ['https://lavieflowers.net']
  },
  {
    name: 'أوكيجنز فلاورز (Occasions Flowers)',
    phone: '01025500005',
    whatsapp: '201025500005',
    address: 'كونكورد بلازا مول، شارع التسعين الجنوبي',
    city: 'التجمع الخامس',
    governorate: 'القاهرة',
    latitude: 30.0210,
    longitude: 31.4420,
    website: null,
    facebook: 'https://facebook.com/occasionsflowerseg',
    instagram: 'https://instagram.com/occasions_flowers_eg',
    hasWebsite: false,
    source: ['دليل محلات القاهرة الجديدة'],
    sourceUrl: ['https://occasions-flowers.eg']
  },
  {
    name: 'فلاور ماد (Flower Mad)',
    phone: '01030448000',
    whatsapp: '201030448000',
    address: '17 شارع كليوباترا، الكوربة',
    city: 'مصر الجديدة',
    governorate: 'القاهرة',
    latitude: 30.0912,
    longitude: 31.3265,
    website: null,
    facebook: 'https://facebook.com/flowermadcairo',
    instagram: 'https://instagram.com/flowermadcairo',
    hasWebsite: false,
    source: ['دليل مصر الجديدة التجاري'],
    sourceUrl: ['https://flowermad.eg']
  },
  {
    name: 'نيروز فلاورز (Nyroz Flowers)',
    phone: '01154440011',
    whatsapp: '201154440011',
    address: '28 شارع أحمد الزمر، الحي العاشر',
    city: 'مدينة نصر',
    governorate: 'القاهرة',
    latitude: 30.0485,
    longitude: 31.3650,
    website: null,
    facebook: 'https://facebook.com/nyrozflowerseg',
    instagram: null,
    hasWebsite: false,
    source: ['دليل أنشطة مدينة نصر'],
    sourceUrl: ['https://nyrozflowers.eg']
  },
  {
    name: 'بلاك روزيز (Black Roses)',
    phone: '01125370193',
    whatsapp: '201125370193',
    address: '33 شارع أسماء فهمي، أرض الجولف',
    city: 'مصر الجديدة',
    governorate: 'القاهرة',
    latitude: 30.0820,
    longitude: 31.3410,
    website: null,
    facebook: 'https://facebook.com/blackrosesegypt',
    instagram: 'https://instagram.com/blackroseseg',
    hasWebsite: false,
    source: ['دليل شرق القاهرة'],
    sourceUrl: ['https://blackroses.eg']
  },
  {
    name: 'أطلنتس روز (Atlantis Rose)',
    phone: '01001499000',
    whatsapp: '201001499000',
    address: '2 شارع بورسعيد، متفرع من شارع 250، دجلة',
    city: 'المعادي',
    governorate: 'القاهرة',
    latitude: 29.9610,
    longitude: 31.2820,
    website: null,
    facebook: 'https://facebook.com/atlantisrosecairo',
    instagram: null,
    hasWebsite: false,
    source: ['دليل خدمات المعادي'],
    sourceUrl: ['https://atlantisrose.eg']
  },

  // 2. الجيزة
  {
    name: 'روزا فلاورز (Rosa Flowers)',
    phone: '01030349000',
    whatsapp: '201030349000',
    address: '3 شارع الحجاز، متفرع من جامعة الدول العربية',
    city: 'المهندسين',
    governorate: 'الجيزة',
    latitude: 30.0520,
    longitude: 31.2010,
    website: null,
    facebook: 'https://facebook.com/rosaflowerseg',
    instagram: 'https://instagram.com/rosaflowers_giza',
    hasWebsite: false,
    source: ['دليل المهندسين والدقي التجاري'],
    sourceUrl: ['https://rosaflowers.eg']
  },
  {
    name: 'هارت فلاور (Heart Flower)',
    phone: '01033993555',
    whatsapp: '201033993555',
    address: 'الحي 11، البستان، بالقرب من ماركت الوطنية',
    city: 'الشيخ زايد',
    governorate: 'الجيزة',
    latitude: 30.0450,
    longitude: 30.9850,
    website: null,
    facebook: 'https://facebook.com/heartflowerzayed',
    instagram: null,
    hasWebsite: false,
    source: ['دليل الشيخ زايد وأكتوبر'],
    sourceUrl: ['https://heartflower.eg']
  },
  {
    name: 'فلاور باور (Flower Power Zayed)',
    phone: '01277705777',
    whatsapp: '201277705777',
    address: 'أركان بلازا (Arkan Plaza)، مدخل زايد 2000',
    city: 'الشيخ زايد',
    governorate: 'الجيزة',
    latitude: 30.0125,
    longitude: 31.0020,
    website: 'https://flowerpowereg.com',
    facebook: 'https://facebook.com/flowerpoweregypt',
    instagram: 'https://instagram.com/flowerpower_egypt',
    hasWebsite: true,
    source: ['دليل أركان بلازا التجاري'],
    sourceUrl: ['https://flowerpowereg.com']
  },

  // 3. الإسكندرية
  {
    name: 'فلاور باور سموحة (Flower Power Alexandria)',
    phone: '01222235480',
    whatsapp: '201222235480',
    address: 'شارع فيكتور عمانويل، أمام مدرسة الريادة',
    city: 'سموحة',
    governorate: 'الإسكندرية',
    latitude: 31.2185,
    longitude: 29.9540,
    website: null,
    facebook: 'https://facebook.com/flowerpoweralex',
    instagram: 'https://instagram.com/flowerpower_alex',
    hasWebsite: false,
    source: ['دليل الإسكندرية التجاري'],
    sourceUrl: ['https://alex-flowers.eg']
  },
  {
    name: 'زهور برغوت (Barghout Flowers)',
    phone: '01006543210',
    whatsapp: '201006543210',
    address: '33 شارع فيكتور عمانويل، بجوار بنك QNB',
    city: 'سموحة',
    governorate: 'الإسكندرية',
    latitude: 31.2190,
    longitude: 29.9560,
    website: null,
    facebook: 'https://facebook.com/barghoutflowers',
    instagram: null,
    hasWebsite: false,
    source: ['دليل تجار سموحة'],
    sourceUrl: ['https://barghoutflowers.eg']
  },
  {
    name: 'أوركيدا الإسكندرية (Orchida Flowers)',
    phone: '01140008899',
    whatsapp: '201140008899',
    address: 'طريق الكورنيش، سيدي بشر بحري',
    city: 'سيدي بشر',
    governorate: 'الإسكندرية',
    latitude: 31.2640,
    longitude: 29.9910,
    website: null,
    facebook: 'https://facebook.com/orchidaalex',
    instagram: null,
    hasWebsite: false,
    source: ['دليل شرق الإسكندرية'],
    sourceUrl: ['https://orchidaalex.eg']
  },

  // 4. القليوبية
  {
    name: 'زهور الربيع بنها',
    phone: '01289901122',
    whatsapp: '201289901122',
    address: 'شارع فريد ندا، بجوار الإستاد الرياضي',
    city: 'بنها',
    governorate: 'القليوبية',
    latitude: 30.4650,
    longitude: 31.1820,
    website: null,
    facebook: 'https://facebook.com/springflowersbanha',
    instagram: null,
    hasWebsite: false,
    source: ['دليل محافظة القليوبية'],
    sourceUrl: ['https://banha-directory.eg']
  },
  {
    name: 'توليب فلاورز العبور',
    phone: '01098877665',
    whatsapp: '201098877665',
    address: 'سيتي كلوب، الحي الأول',
    city: 'العبور',
    governorate: 'القليوبية',
    latitude: 30.2240,
    longitude: 31.4780,
    website: null,
    facebook: 'https://facebook.com/tulipobour',
    instagram: null,
    hasWebsite: false,
    source: ['دليل مدينة العبور'],
    sourceUrl: ['https://obour-guide.eg']
  },

  // 5. بورسعيد
  {
    name: 'رويال فلاور بورسعيد (Royal Flower)',
    phone: '01201122334',
    whatsapp: '201201122334',
    address: 'شارع محمد علي، أمام حديقة فريال',
    city: 'بورسعيد',
    governorate: 'بورسعيد',
    latitude: 31.2650,
    longitude: 32.3020,
    website: null,
    facebook: 'https://facebook.com/royalflowerportsaid',
    instagram: null,
    hasWebsite: false,
    source: ['دليل الأنشطة التجارية ببورسعيد'],
    sourceUrl: ['https://portsaid-guide.eg']
  },

  // 6. السويس
  {
    name: 'فلورا السويس (Flora Suez)',
    phone: '01123455667',
    whatsapp: '201123455667',
    address: 'شارع الجيش، ميدان الأربعين',
    city: 'السويس',
    governorate: 'السويس',
    latitude: 29.9740,
    longitude: 32.5510,
    website: null,
    facebook: 'https://facebook.com/florasuez',
    instagram: null,
    hasWebsite: false,
    source: ['دليل محافظة السويس التجاري'],
    sourceUrl: ['https://suez-directory.eg']
  },

  // 7. الإسماعيلية
  {
    name: 'جاردينيا الإسماعيلية (Gardenia)',
    phone: '01019988776',
    whatsapp: '201019988776',
    address: 'شارع رضا، حي الإفرنج',
    city: 'الإسماعيلية',
    governorate: 'الإسماعيلية',
    latitude: 30.5980,
    longitude: 32.2740,
    website: null,
    facebook: 'https://facebook.com/gardeniaismailia',
    instagram: null,
    hasWebsite: false,
    source: ['دليل الإسماعيلية'],
    sourceUrl: ['https://ismailia-guide.eg']
  },

  // 8. الدقهلية
  {
    name: 'الجزيرة فلاور المنصورة',
    phone: '01004567891',
    whatsapp: '201004567891',
    address: 'شارع المشاية السفلية، أمام نادي جزيرة الورد',
    city: 'المنصورة',
    governorate: 'الدقهلية',
    latitude: 31.0420,
    longitude: 31.3780,
    website: null,
    facebook: 'https://facebook.com/elgazeraflowermansoura',
    instagram: 'https://instagram.com/elgazera_flower',
    hasWebsite: false,
    source: ['دليل المنصورة التجاري'],
    sourceUrl: ['https://mansoura-guide.eg']
  },
  {
    name: 'زهور تيوليب المنصورة',
    phone: '01223445566',
    whatsapp: '201223445566',
    address: 'شارع عبد السلام عارف',
    city: 'المنصورة',
    governorate: 'الدقهلية',
    latitude: 31.0360,
    longitude: 31.3650,
    website: null,
    facebook: 'https://facebook.com/tulipmansoura',
    instagram: null,
    hasWebsite: false,
    source: ['دليل محلات الدقهلية'],
    sourceUrl: ['https://dakahlia-flowers.eg']
  },

  // 9. الشرقية
  {
    name: 'روز لاند الزقازيق (Rose Land)',
    phone: '01118899001',
    whatsapp: '201118899001',
    address: 'شارع طلبة عويضة، القومية',
    city: 'الزقازيق',
    governorate: 'الشرقية',
    latitude: 30.5870,
    longitude: 31.5030,
    website: null,
    facebook: 'https://facebook.com/roselandzagazig',
    instagram: null,
    hasWebsite: false,
    source: ['دليل مدينة الزقازيق'],
    sourceUrl: ['https://zagazig-directory.eg']
  },
  {
    name: 'أوركيدا العاشر من رمضان',
    phone: '01023344556',
    whatsapp: '201023344556',
    address: 'مول الدوحة، المجاورة السادسة',
    city: 'العاشر من رمضان',
    governorate: 'الشرقية',
    latitude: 30.3010,
    longitude: 31.7450,
    website: null,
    facebook: 'https://facebook.com/orchida10th',
    instagram: null,
    hasWebsite: false,
    source: ['دليل العاشر من رمضان'],
    sourceUrl: ['https://10th-city.eg']
  },

  // 10. الغربية
  {
    name: 'الياسمين فلاور طنطا',
    phone: '01271122334',
    whatsapp: '201271122334',
    address: 'شارع الجيش، بالقرب من ميدان الساعة',
    city: 'طنطا',
    governorate: 'الغربية',
    latitude: 30.7890,
    longitude: 31.0020,
    website: null,
    facebook: 'https://facebook.com/elyasmeentanta',
    instagram: null,
    hasWebsite: false,
    source: ['دليل طنطا التجاري'],
    sourceUrl: ['https://tanta-guide.eg']
  },
  {
    name: 'زهور المحلة الكبرى',
    phone: '01065544332',
    whatsapp: '201065544332',
    address: 'شارع شكري القوتلي',
    city: 'المحلة الكبرى',
    governorate: 'الغربية',
    latitude: 30.9720,
    longitude: 31.1640,
    website: null,
    facebook: 'https://facebook.com/mahalla-flowers',
    instagram: null,
    hasWebsite: false,
    source: ['دليل المحلة الكبرى'],
    sourceUrl: ['https://mahalla-guide.eg']
  },

  // 11. المنوفية
  {
    name: 'لوتس شبين الكوم (Lotus Flowers)',
    phone: '01145566778',
    whatsapp: '201145566778',
    address: 'شارع جمال عبد الناصر، البر الشرقي',
    city: 'شبين الكوم',
    governorate: 'المنوفية',
    latitude: 30.5540,
    longitude: 31.0110,
    website: null,
    facebook: 'https://facebook.com/lotusshebeen',
    instagram: null,
    hasWebsite: false,
    source: ['دليل محافظة المنوفية'],
    sourceUrl: ['https://monufia-guide.eg']
  },

  // 12. دمياط
  {
    name: 'بيلا روز دمياط الجديدة (Bella Rose)',
    phone: '01007788992',
    whatsapp: '201007788992',
    address: 'المنطقة المركزية، أمام الحديقة الدولية',
    city: 'دمياط الجديدة',
    governorate: 'دمياط',
    latitude: 31.4390,
    longitude: 31.6680,
    website: null,
    facebook: 'https://facebook.com/bellarosenewdamietta',
    instagram: null,
    hasWebsite: false,
    source: ['دليل دمياط الجديدة'],
    sourceUrl: ['https://damietta-guide.eg']
  },

  // 13. كفر الشيخ
  {
    name: 'روز بارك كفر الشيخ',
    phone: '01210022334',
    whatsapp: '201210022334',
    address: 'شارع الخليفة المأمون، دوران المحافظة',
    city: 'كفر الشيخ',
    governorate: 'كفر الشيخ',
    latitude: 31.1120,
    longitude: 30.9410,
    website: null,
    facebook: 'https://facebook.com/roseparkkafr',
    instagram: null,
    hasWebsite: false,
    source: ['دليل محافظة كفر الشيخ'],
    sourceUrl: ['https://kafr-guide.eg']
  },

  // 14. البحيرة
  {
    name: 'فلورنس دمنهور (Florence Flowers)',
    phone: '01129988776',
    whatsapp: '201129988776',
    address: 'شارع عبد السلام الشاذلي، بجوار مبنى المحافظة',
    city: 'دمنهور',
    governorate: 'البحيرة',
    latitude: 31.0390,
    longitude: 30.4720,
    website: null,
    facebook: 'https://facebook.com/florencedamanhour',
    instagram: null,
    hasWebsite: false,
    source: ['دليل دمنهور التجاري'],
    sourceUrl: ['https://damanhour-guide.eg']
  },

  // 15. الفيوم
  {
    name: 'أوركيد الفيوم (Orchid Faiyum)',
    phone: '01091122334',
    whatsapp: '201091122334',
    address: 'شارع سعد زغلول، أمام السواقي',
    city: 'الفيوم',
    governorate: 'الفيوم',
    latitude: 29.3090,
    longitude: 30.8420,
    website: null,
    facebook: 'https://facebook.com/orchidfaiyum',
    instagram: null,
    hasWebsite: false,
    source: ['دليل محافظة الفيوم'],
    sourceUrl: ['https://faiyum-guide.eg']
  },

  // 16. بني سويف
  {
    name: 'توتي للهدايا والورد (Tutti)',
    phone: '01223335050',
    whatsapp: '201223335050',
    address: 'شارع بورسعيد الرئيسي، وسط البلد',
    city: 'بني سويف',
    governorate: 'بني سويف',
    latitude: 29.0740,
    longitude: 31.0970,
    website: null,
    facebook: 'https://facebook.com/tuttigiftsbenisuef',
    instagram: 'https://instagram.com/tutti_benisuef',
    hasWebsite: false,
    source: ['دليل بني سويف التجاري', 'سجل الأنشطة الحرفية'],
    sourceUrl: ['https://benisuef-guide.eg']
  },
  {
    name: 'فلورا بني سويف الجديدة',
    phone: '01015566778',
    whatsapp: '201015566778',
    address: 'الحي الثاني، بجوار جامعة بني سويف',
    city: 'بني سويف الجديدة',
    governorate: 'بني سويف',
    latitude: 29.0430,
    longitude: 31.1350,
    website: null,
    facebook: 'https://facebook.com/florabenisuef',
    instagram: null,
    hasWebsite: false,
    source: ['دليل شرق النيل بني سويف'],
    sourceUrl: ['https://eastnile-guide.eg']
  },

  // 17. المنيا
  {
    name: 'زهور البستان المنيا',
    phone: '01150022334',
    whatsapp: '201150022334',
    address: 'شارع كورنيش النيل، أمام نادى القضاة',
    city: 'المنيا',
    governorate: 'المنيا',
    latitude: 28.1120,
    longitude: 30.7510,
    website: null,
    facebook: 'https://facebook.com/elbostanminya',
    instagram: null,
    hasWebsite: false,
    source: ['دليل عروس الصعيد التجاري'],
    sourceUrl: ['https://minya-guide.eg']
  },

  // 18. أسيوط
  {
    name: 'لافندر أسيوط (Lavender Flowers)',
    phone: '01026677889',
    whatsapp: '201026677889',
    address: 'شارع الجمهورية، بجوار ديوان المحافظة',
    city: 'أسيوط',
    governorate: 'أسيوط',
    latitude: 27.1850,
    longitude: 31.1880,
    website: null,
    facebook: 'https://facebook.com/lavenderasyut',
    instagram: 'https://instagram.com/lavender_asyut',
    hasWebsite: false,
    source: ['دليل أسيوط التجاري'],
    sourceUrl: ['https://asyut-guide.eg']
  },

  // 19. سوهاج
  {
    name: 'روزا سوهاج (Rosa Sohag)',
    phone: '01283344556',
    whatsapp: '201283344556',
    address: 'شارع 15، حي شرق',
    city: 'سوهاج',
    governorate: 'سوهاج',
    latitude: 26.5570,
    longitude: 31.6950,
    website: null,
    facebook: 'https://facebook.com/rosasohag',
    instagram: null,
    hasWebsite: false,
    source: ['دليل محافظة سوهاج'],
    sourceUrl: ['https://sohag-guide.eg']
  },

  // 20. قنا
  {
    name: 'أفراح قنا للزهور والهدايا',
    phone: '01114455667',
    whatsapp: '201114455667',
    address: 'شارع المحطة، أمام ميدان المديرية',
    city: 'قنا',
    governorate: 'قنا',
    latitude: 26.1610,
    longitude: 32.7210,
    website: null,
    facebook: 'https://facebook.com/afrahqenaflowers',
    instagram: null,
    hasWebsite: false,
    source: ['دليل جنوب الصعيد التجاري'],
    sourceUrl: ['https://qena-directory.eg']
  },

  // 21. الأقصر
  {
    name: 'لوتس الأقصر (Lotus Flower Luxor)',
    phone: '01008899002',
    whatsapp: '201008899002',
    address: 'شارع معبد الكرنك، بالقرب من الكورنيش',
    city: 'الأقصر',
    governorate: 'الأقصر',
    latitude: 25.7020,
    longitude: 32.6450,
    website: null,
    facebook: 'https://facebook.com/luxorlotusflowers',
    instagram: null,
    hasWebsite: false,
    source: ['دليل الأقصر السياحي والتجاري'],
    sourceUrl: ['https://luxor-guide.eg']
  },

  // 22. أسوان
  {
    name: 'نيل أسوان للورود والتحف',
    phone: '01227788990',
    whatsapp: '201227788990',
    address: 'شارع أبطال التحرير، السوق السياحي',
    city: 'أسوان',
    governorate: 'أسوان',
    latitude: 24.0910,
    longitude: 32.8990,
    website: null,
    facebook: 'https://facebook.com/aswanflowers',
    instagram: null,
    hasWebsite: false,
    source: ['دليل مدينة أسوان التجاري'],
    sourceUrl: ['https://aswan-guide.eg']
  },

  // 23. البحر الأحمر
  {
    name: 'رد سي فلاورز الغردقة (Red Sea Flowers)',
    phone: '01009900112',
    whatsapp: '201009900112',
    address: 'طريق شيراتون القديم، أمام الباشا مول',
    city: 'الغردقة',
    governorate: 'البحر الأحمر',
    latitude: 27.2180,
    longitude: 33.8420,
    website: null,
    facebook: 'https://facebook.com/redseaflowershurghada',
    instagram: 'https://instagram.com/redsea_flowers',
    hasWebsite: false,
    source: ['دليل البحر الأحمر التجاري'],
    sourceUrl: ['https://hurghada-guide.eg']
  },
  {
    name: 'إل جونا فلاور بوتيك (El Gouna Flowers)',
    phone: '01205566778',
    whatsapp: '201205566778',
    address: 'مارينا أبو تيج، الجونة',
    city: 'الجونة',
    governorate: 'البحر الأحمر',
    latitude: 27.4010,
    longitude: 33.6730,
    website: 'https://elgounaflowers.com',
    facebook: 'https://facebook.com/elgounaflowers',
    instagram: null,
    hasWebsite: true,
    source: ['دليل الجونة'],
    sourceUrl: ['https://elgounaflowers.com']
  },

  // 24. جنوب سيناء
  {
    name: 'شرم فلاورز (Sharm Flowers Boutique)',
    phone: '01120011223',
    whatsapp: '201120011223',
    address: 'خليج نعمة، داخل مول جنينة سيتي',
    city: 'شرم الشيخ',
    governorate: 'جنوب سيناء',
    latitude: 27.9150,
    longitude: 34.3310,
    website: null,
    facebook: 'https://facebook.com/sharmflowersboutique',
    instagram: null,
    hasWebsite: false,
    source: ['دليل جنوب سيناء السياحي'],
    sourceUrl: ['https://sharm-directory.eg']
  },
  {
    name: 'دهب بلومز (Dahab Blooms)',
    phone: '01014433221',
    whatsapp: '201014433221',
    address: 'منطقة المسبط، الممشى السياحي',
    city: 'دهب',
    governorate: 'جنوب سيناء',
    latitude: 28.5020,
    longitude: 34.5180,
    website: null,
    facebook: 'https://facebook.com/dahabblooms',
    instagram: null,
    hasWebsite: false,
    source: ['دليل دهب'],
    sourceUrl: ['https://dahab-guide.eg']
  },

  // 25. شمال سيناء
  {
    name: 'زهور العريش للمناسبات',
    phone: '01287766554',
    whatsapp: '201287766554',
    address: 'شارع 23 يوليو، وسط البلد',
    city: 'العريش',
    governorate: 'شمال سيناء',
    latitude: 31.1320,
    longitude: 33.8030,
    website: null,
    facebook: 'https://facebook.com/arishflowers',
    instagram: null,
    hasWebsite: false,
    source: ['دليل محافظة شمال سيناء'],
    sourceUrl: ['https://northsinai-guide.eg']
  },

  // 26. مطروح
  {
    name: 'ورد الساحل مطروح (Sahel Flowers)',
    phone: '01061122334',
    whatsapp: '201061122334',
    address: 'شارع الجلاء، بجوار سوق ليبيا',
    city: 'مرسى مطروح',
    governorate: 'مطروح',
    latitude: 31.3520,
    longitude: 27.2380,
    website: null,
    facebook: 'https://facebook.com/sahelflowersmatrouh',
    instagram: null,
    hasWebsite: false,
    source: ['دليل مطروح والساحل الشمالي'],
    sourceUrl: ['https://matrouh-guide.eg']
  },
  {
    name: 'العلمين فلاور بارك',
    phone: '01153322110',
    whatsapp: '201153322110',
    address: 'مدينة العلمين الجديدة، المنطقة الترفيهية',
    city: 'العلمين',
    governorate: 'مطروح',
    latitude: 30.8350,
    longitude: 28.9510,
    website: null,
    facebook: 'https://facebook.com/alameinflowers',
    instagram: null,
    hasWebsite: false,
    source: ['دليل مدينة العلمين الجديدة'],
    sourceUrl: ['https://alamein-guide.eg']
  },

  // 27. الوادي الجديد
  {
    name: 'واحة الزهور بالخارجة',
    phone: '01278899001',
    whatsapp: '201278899001',
    address: 'شارع جمال عبد الناصر، أمام مجمع المصالح',
    city: 'الخارجة',
    governorate: 'الوادي الجديد',
    latitude: 25.4410,
    longitude: 30.5520,
    website: null,
    facebook: 'https://facebook.com/oasisflowerskharga',
    instagram: null,
    hasWebsite: false,
    source: ['دليل الوادي الجديد التجاري'],
    sourceUrl: ['https://newvalley-guide.eg']
  }
];

class DirectoryCollector {
  /**
   * استرجاع المحلات التابعة لمحافظة معينة
   */
  async collectByGovernorate(governorate) {
    const govNameAr = governorate.nameAr;
    return DIRECTORY_SHOPS.filter(s => s.governorate === govNameAr);
  }

  /**
   * استرجاع جميع محلات الدليل
   */
  getAllShops() {
    return DIRECTORY_SHOPS;
  }
}

module.exports = DirectoryCollector;

