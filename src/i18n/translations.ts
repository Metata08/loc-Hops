export type Language = "fr" | "wo" | "ar" | "en";

export const translations = {
  fr: {
    // Welcome Screen
    appName: "Loc-Hops",
    tagline: "Bienvenue à l'Hôpital Régional de Saint-Louis",
    chooseLanguage: "Choisir votre langue",
    start: "Commencer",
    aiAssistant: "Assistant IA",
    
    // Common
    back: "Retour",
    close: "Fermer",
    next: "Suivant",
    cancel: "Annuler",
    confirm: "Confirmer",
    
    // AI Assistant
    aiTitle: "Assistant IA",
    aiOnline: "En ligne",
    aiGreeting: "Bonjour ! Je suis votre assistant Loc-Hops. Comment puis-je vous aider aujourd'hui ?",
    typeQuestion: "Tapez votre question...",
    speak: "Parler",
    stop: "Arrêter",
    quickSuggestions: "Suggestions rapides :",
    whereIsRadiology: "Où se trouve la radiologie ?",
    imLost: "Je suis perdu",
    wantMaternity: "Je veux aller à la maternité",
    haveAppointment: "J'ai un rendez-vous",
    aiResponse: "Je vous aide à trouver {service}. Voulez-vous voir l'itinéraire ?",
    
    // Service Directory
    hospitalServices: "Services de l'hôpital",
    searchService: "Rechercher un service...",
    askAI: "Demander à l'IA",
    noServiceFound: "Aucun service trouvé",
    askAIAssistant: "Demander à l'assistant IA",
    
    // Services
    emergency: "Urgences",
    radiology: "Radiologie",
    cardiology: "Cardiologie",
    maternity: "Maternité",
    consultation: "Consultations",
    pharmacy: "Pharmacie",
    laboratory: "Laboratoire",
    surgery: "Chirurgie",
    reception: "Accueil",
    
    // Buildings & Floors
    building: "Bâtiment",
    buildingA: "Bâtiment A",
    buildingB: "Bâtiment B",
    buildingC: "Bâtiment C",
    buildingD: "Bâtiment D",
    groundFloor: "RDC",
    floor1: "1er étage",
    floor2: "2ème étage",
    floor3: "3ème étage",
    floor4: "4ème étage",
    
    // Map View
    actions: "Actions",
    generateQR: "Générer QR Code",
    printRoute: "Imprimer le trajet",
    audioGuide: "Guide audio",
    voiceInstructions: "Instructions vocales",
    youAreHere: "Vous êtes ici",
    destination: "Destination",
    distance: "Distance",
    changeDestination: "Changer de destination",
    startingPoint: "Point de départ",
    
    // Instructions
    instruction1: "Sortez du hall et tournez à droite",
    instruction2: "Prenez le couloir principal",
    instruction3: "Montez au {floor} par l'ascenseur B",
    instruction4: "Le service est sur votre gauche",
    
    // QR Code Screen
    qrNavigation: "QR Code de navigation",
    scanQR: "Scannez pour voir l'itinéraire",
    scanMessage: "Scannez ce code QR avec votre smartphone pour accéder à l'itinéraire détaillé et suivre le chemin en temps réel.",
    share: "Partager",
    download: "Télécharger",
    print: "Imprimer",
    newSearch: "Nouvelle recherche",
    
    // Session
    sessionEnded: "Session terminée",
    backToHome: "Retour à l'écran d'accueil",
    
    // Durations
    duration2min: "2 min",
    duration3min: "3 min",
    duration5min: "5 min",
    duration8min: "8 min",
  },
  
  wo: {
    // Welcome Screen
    appName: "Loc-Hops",
    tagline: "Dalal jàmm ci Opital bu Régyonal bu Saint-Louis",
    chooseLanguage: "Tànnal sa làkk",
    start: "Tàmbalee",
    aiAssistant: "Ndimbal IA",
    
    // Common
    back: "Dellu ginnaaw",
    close: "Tëj",
    next: "Jëm kanam",
    cancel: "Neenal",
    confirm: "Dëggal",
    
    // AI Assistant
    aiTitle: "Ndimbal IA",
    aiOnline: "Nekk ci ligne",
    aiGreeting: "Dalal jàmm! Maa ngi la ndimbali. Lan mën naa def ngir la?",
    typeQuestion: "Bind sa laaj...",
    speak: "Wax",
    stop: "Taxaw",
    quickSuggestions: "Yéenekaay:",
    whereIsRadiology: "Fan la radiologie nekk?",
    imLost: "Réér naa",
    wantMaternity: "Bëgg naa dem maternité",
    haveAppointment: "Am naa rendez-vous",
    aiResponse: "Dinaa la dimbal ngir gis {service}. Bëgg ngaa gis yoon wi?",
    
    // Service Directory
    hospitalServices: "Serwis yi ci opital bi",
    searchService: "Seet ab serwis...",
    askAI: "Laaj IA",
    noServiceFound: "Amul serwis bu am",
    askAIAssistant: "Laaj ndimbal IA",
    
    // Services
    emergency: "Urgences",
    radiology: "Radiologie",
    cardiology: "Cardiologie",
    maternity: "Maternité",
    consultation: "Consultations",
    pharmacy: "Farmasii",
    laboratory: "Laboratoire",
    surgery: "Chirurgie",
    reception: "Jëkkër",
    
    // Buildings & Floors
    building: "Kër",
    buildingA: "Kër A",
    buildingB: "Kër B",
    buildingC: "Kër C",
    buildingD: "Kër D",
    groundFloor: "Suuf",
    floor1: "Etaas 1",
    floor2: "Etaas 2",
    floor3: "Etaas 3",
    floor4: "Etaas 4",
    
    // Map View
    actions: "Jëf yi",
    generateQR: "Def QR Code",
    printRoute: "Móol yoon wi",
    audioGuide: "Ndimbal bu xam-xam",
    voiceInstructions: "Yéenekaay bu baat",
    youAreHere: "Fii ngay nekk",
    destination: "Fu ngay jëm",
    distance: "Bàyyi",
    changeDestination: "Soppi destination",
    startingPoint: "Fu ngay tàmbalee",
    
    // Instructions
    instruction1: "Génn ci hall bi te wëlbati ci ndijoor",
    instruction2: "Jël yoon bu mag bi",
    instruction3: "Yéeg ci {floor} ak ascenseur B",
    instruction4: "Serwis bi nekk ci sa càmmoñ",
    
    // QR Code Screen
    qrNavigation: "QR Code bu yoon",
    scanQR: "Scan ngir gis yoon wi",
    scanMessage: "Scan QR code bii ak sa telefon ngir gis yoon wi te toppatoo ko.",
    share: "Séddoo",
    download: "Wàcce",
    print: "Móol",
    newSearch: "Seet bu bees",
    
    // Session
    sessionEnded: "Seyaas bi jeex na",
    backToHome: "Dellu ci jëkkër bi",
    
    // Durations
    duration2min: "2 simili",
    duration3min: "3 simili",
    duration5min: "5 simili",
    duration8min: "8 simili",
  },
  
  ar: {
    // Welcome Screen
    appName: "Loc-Hops",
    tagline: "مرحباً بكم في المستشفى الإقليمي سان لويس",
    chooseLanguage: "اختر لغتك",
    start: "ابدأ",
    aiAssistant: "المساعد الذكي",
    
    // Common
    back: "رجوع",
    close: "إغلاق",
    next: "التالي",
    cancel: "إلغاء",
    confirm: "تأكيد",
    
    // AI Assistant
    aiTitle: "المساعد الذكي",
    aiOnline: "متصل",
    aiGreeting: "مرحباً! أنا مساعدك في Loc-Hops. كيف يمكنني مساعدتك اليوم؟",
    typeQuestion: "اكتب سؤالك...",
    speak: "تحدث",
    stop: "توقف",
    quickSuggestions: "اقتراحات سريعة:",
    whereIsRadiology: "أين قسم الأشعة؟",
    imLost: "أنا تائه",
    wantMaternity: "أريد الذهاب إلى قسم الولادة",
    haveAppointment: "لدي موعد",
    aiResponse: "سأساعدك في العثور على {service}. هل تريد رؤية المسار؟",
    
    // Service Directory
    hospitalServices: "خدمات المستشفى",
    searchService: "البحث عن خدمة...",
    askAI: "اسأل الذكاء الاصطناعي",
    noServiceFound: "لم يتم العثور على خدمة",
    askAIAssistant: "اسأل المساعد الذكي",
    
    // Services
    emergency: "الطوارئ",
    radiology: "الأشعة",
    cardiology: "أمراض القلب",
    maternity: "الولادة",
    consultation: "الاستشارات",
    pharmacy: "الصيدلية",
    laboratory: "المختبر",
    surgery: "الجراحة",
    reception: "الاستقبال",
    
    // Buildings & Floors
    building: "المبنى",
    buildingA: "المبنى أ",
    buildingB: "المبنى ب",
    buildingC: "المبنى ج",
    buildingD: "المبنى د",
    groundFloor: "الطابق الأرضي",
    floor1: "الطابق الأول",
    floor2: "الطابق الثاني",
    floor3: "الطابق الثالث",
    floor4: "الطابق الرابع",
    
    // Map View
    actions: "الإجراءات",
    generateQR: "إنشاء رمز QR",
    printRoute: "طباعة المسار",
    audioGuide: "الدليل الصوتي",
    voiceInstructions: "التعليمات الصوتية",
    youAreHere: "أنت هنا",
    destination: "الوجهة",
    distance: "المسافة",
    changeDestination: "تغيير الوجهة",
    startingPoint: "نقطة البداية",
    
    // Instructions
    instruction1: "اخرج من القاعة واتجه يميناً",
    instruction2: "اسلك الممر الرئيسي",
    instruction3: "اصعد إلى {floor} باستخدام المصعد ب",
    instruction4: "القسم على يسارك",
    
    // QR Code Screen
    qrNavigation: "رمز QR للتنقل",
    scanQR: "امسح لرؤية المسار",
    scanMessage: "امسح رمز QR هذا بهاتفك للوصول إلى المسار التفصيلي ومتابعة الطريق في الوقت الفعلي.",
    share: "مشاركة",
    download: "تحميل",
    print: "طباعة",
    newSearch: "بحث جديد",
    
    // Session
    sessionEnded: "انتهت الجلسة",
    backToHome: "العودة للشاشة الرئيسية",
    
    // Durations
    duration2min: "2 دقيقة",
    duration3min: "3 دقائق",
    duration5min: "5 دقائق",
    duration8min: "8 دقائق",
  },
  
  en: {
    // Welcome Screen
    appName: "Loc-Hops",
    tagline: "Welcome to Saint-Louis Regional Hospital",
    chooseLanguage: "Choose your language",
    start: "Start",
    aiAssistant: "AI Assistant",
    
    // Common
    back: "Back",
    close: "Close",
    next: "Next",
    cancel: "Cancel",
    confirm: "Confirm",
    
    // AI Assistant
    aiTitle: "AI Assistant",
    aiOnline: "Online",
    aiGreeting: "Hello! I'm your Loc-Hops assistant. How can I help you today?",
    typeQuestion: "Type your question...",
    speak: "Speak",
    stop: "Stop",
    quickSuggestions: "Quick suggestions:",
    whereIsRadiology: "Where is radiology?",
    imLost: "I'm lost",
    wantMaternity: "I want to go to maternity",
    haveAppointment: "I have an appointment",
    aiResponse: "I'll help you find {service}. Would you like to see the route?",
    
    // Service Directory
    hospitalServices: "Hospital Services",
    searchService: "Search for a service...",
    askAI: "Ask AI",
    noServiceFound: "No service found",
    askAIAssistant: "Ask AI Assistant",
    
    // Services
    emergency: "Emergency",
    radiology: "Radiology",
    cardiology: "Cardiology",
    maternity: "Maternity",
    consultation: "Consultations",
    pharmacy: "Pharmacy",
    laboratory: "Laboratory",
    surgery: "Surgery",
    reception: "Reception",
    
    // Buildings & Floors
    building: "Building",
    buildingA: "Building A",
    buildingB: "Building B",
    buildingC: "Building C",
    buildingD: "Building D",
    groundFloor: "Ground Floor",
    floor1: "1st Floor",
    floor2: "2nd Floor",
    floor3: "3rd Floor",
    floor4: "4th Floor",
    
    // Map View
    actions: "Actions",
    generateQR: "Generate QR Code",
    printRoute: "Print Route",
    audioGuide: "Audio Guide",
    voiceInstructions: "Voice Instructions",
    youAreHere: "You are here",
    destination: "Destination",
    distance: "Distance",
    changeDestination: "Change Destination",
    startingPoint: "Starting Point",
    
    // Instructions
    instruction1: "Exit the hall and turn right",
    instruction2: "Take the main corridor",
    instruction3: "Go up to {floor} using elevator B",
    instruction4: "The service is on your left",
    
    // QR Code Screen
    qrNavigation: "Navigation QR Code",
    scanQR: "Scan to see the route",
    scanMessage: "Scan this QR code with your smartphone to access the detailed route and follow the path in real-time.",
    share: "Share",
    download: "Download",
    print: "Print",
    newSearch: "New Search",
    
    // Session
    sessionEnded: "Session Ended",
    backToHome: "Back to Home Screen",
    
    // Durations
    duration2min: "2 min",
    duration3min: "3 min",
    duration5min: "5 min",
    duration8min: "8 min",
  },
};

import frFlag from "@/assets/flags/fr.svg";
import snFlag from "@/assets/flags/sn.svg";
import saFlag from "@/assets/flags/sa.svg";
import gbFlag from "@/assets/flags/gb.svg";

export const languageNames: Record<Language, { name: string; flag: string }> = {
  fr: { name: "Français", flag: frFlag },
  wo: { name: "Wolof", flag: snFlag },
  ar: { name: "العربية", flag: saFlag },
  en: { name: "English", flag: gbFlag },
};

export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
};
