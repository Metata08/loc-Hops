import React from 'react';
import type { Language, Destination } from './types';
import HeartIcon from './components/icons/HeartIcon';
import BabyIcon from './components/icons/BabyIcon';
import BoneIcon from './components/icons/BoneIcon';
import EmergencyIcon from './components/icons/EmergencyIcon';
import LabIcon from './components/icons/LabIcon';
import PharmacyIcon from './components/icons/PharmacyIcon';

type TranslationSet = {
  [key in Language]: {
    welcome: string;
    whereToGo: string;
    searchPlaceholder: string;
    back: string;
    mainServices: string;
    youAreHere: string;
    building: string;
    floor: string;
    estimatedTime: string;
    scanForMap: string;
    printMap: string;
    newSearch: string;
    finish: string;
    yourRouteTo: string;
    mobileViewTitle: string;
    zoomPan: string;
    returnToKiosk: string;
  }
};

export const translations: TranslationSet = {
  fr: {
    welcome: "Bienvenue",
    whereToGo: "Où souhaitez-vous aller ?",
    searchPlaceholder: "Chercher un service ou un médecin...",
    back: "Retour",
    mainServices: "Services principaux",
    youAreHere: "VOUS ÊTES ICI",
    building: "Bâtiment",
    floor: "étage",
    estimatedTime: "Temps de marche estimé",
    scanForMap: "Scannez pour obtenir le plan sur votre téléphone",
    printMap: "Imprimer le plan",
    newSearch: "Nouvelle recherche",
    finish: "Terminer",
    yourRouteTo: "Votre itinéraire vers",
    mobileViewTitle: "Votre Itinéraire sur Mobile",
    zoomPan: "Vous pouvez zoomer et déplacer le plan.",
    returnToKiosk: "Retourner à la borne",
  },
  wo: {
    welcome: "Nanga Def",
    whereToGo: "Foo bëgg dem ?",
    searchPlaceholder: "Wër saafara walla doktoor...",
    back: "Dellu",
    mainServices: "Saafara yu mag yi",
    youAreHere: "YANGI FII",
    building: "Nek",
    floor: "Toll",
    estimatedTime: "Tukki bi di na yàgg",
    scanForMap: "Skanneel ngir am plan bi ci sa telefon",
    printMap: "Mool plan bi",
    newSearch: "Wër leneen",
    finish: "Jéxal",
    yourRouteTo: "Sa yoon jëm",
    mobileViewTitle: "Sa Yoon ci Telefon",
    zoomPan: "Mën nga yokk ak wàññi plan bi.",
    returnToKiosk: "Dellu ci terminal bi",
  },
  ar: {
    welcome: "مرحبًا",
    whereToGo: "أين تريد أن تذهب؟",
    searchPlaceholder: "ابحث عن قسم أو طبيب...",
    back: "رجوع",
    mainServices: "الخدمات الرئيسية",
    youAreHere: "أنت هنا",
    building: "مبنى",
    floor: "طابق",
    estimatedTime: "الوقت المقدر للمشي",
    scanForMap: "امسح الرمز للحصول على الخريطة على هاتفك",
    printMap: "اطبع الخريطة",
    newSearch: "بحث جديد",
    finish: "إنهاء",
    yourRouteTo: "مسارك إلى",
    mobileViewTitle: "مسارك على الجوال",
    zoomPan: "يمكنك تكبير وتحريك الخريطة.",
    returnToKiosk: "العودة إلى الكشك",
  }
};

type DestinationSet = {
  [key in Language]: Destination[]
};

const floorInstructions = {
  cardiology: { fr: "Prendre l'ascenseur : 2ème étage", wo: "Jël asaasër bi : ñaareelu toll", ar: "خذ المصعد : الطابق الثاني" },
  maternity: { fr: "Prendre l'ascenseur : 1er étage", wo: "Jël asaasër bi : benneelu toll", ar: "خذ المصعد : الطابق الأول" },
  laboratory: { fr: "Prendre l'ascenseur : Sous-sol", wo: "Jël asaasër bi : Suusool", ar: "خذ المصعد : الطابق السفلي" },
}

export const destinations: DestinationSet = {
  fr: [
    { key: 'cardiology', name: 'Cardiologie', location: 'Bâtiment B, 2ème étage', walkTime: 'Environ 4 minutes', icon: HeartIcon, floorChangeInstruction: floorInstructions.cardiology },
    { key: 'maternity', name: 'Maternité', location: 'Bâtiment C, 1er étage', walkTime: 'Environ 5 minutes', icon: BabyIcon, floorChangeInstruction: floorInstructions.maternity },
    { key: 'radiology', name: 'Radiologie', location: 'Bâtiment A, Rez-de-chaussée', walkTime: 'Environ 2 minutes', icon: BoneIcon },
    { key: 'emergencies', name: 'Urgences', location: 'Entrée principale', walkTime: 'Environ 1 minute', icon: EmergencyIcon },
    { key: 'laboratory', name: 'Laboratoire', location: 'Bâtiment A, Sous-sol', walkTime: 'Environ 3 minutes', icon: LabIcon, floorChangeInstruction: floorInstructions.laboratory },
    { key: 'pharmacy', name: 'Pharmacie', location: 'Bâtiment C, Rez-de-chaussée', walkTime: 'Environ 4 minutes', icon: PharmacyIcon },
  ],
  wo: [
    { key: 'cardiology', name: 'Xol', location: 'Nek B, Toll 2', walkTime: 'Lu tollu ci 4 minut', icon: HeartIcon, floorChangeInstruction: floorInstructions.cardiology },
    { key: 'maternity', name: 'Limu', location: 'Nek C, Toll 1', walkTime: 'Lu tollu ci 5 minut', icon: BabyIcon, floorChangeInstruction: floorInstructions.maternity },
    { key: 'radiology', name: 'Radyoloji', location: 'Nek A, Rez-de-chaussée', walkTime: 'Lu tollu ci 2 minut', icon: BoneIcon },
    { key: 'emergencies', name: 'Urjaas', location: 'Bunt bi', walkTime: 'Lu tollu ci 1 minut', icon: EmergencyIcon },
    { key: 'laboratory', name: 'Laboratoor', location: 'Nek A, Sous-sol', walkTime: 'Lu tollu ci 3 minut', icon: LabIcon, floorChangeInstruction: floorInstructions.laboratory },
    { key: 'pharmacy', name: 'Farmasi', location: 'Nek C, Rez-de-chaussée', walkTime: 'Lu tollu ci 4 minut', icon: PharmacyIcon },
  ],
  ar: [
    { key: 'cardiology', name: 'أمراض القلب', location: 'مبنى ب، الطابق الثاني', walkTime: 'حوالي 4 دقائق', icon: HeartIcon, floorChangeInstruction: floorInstructions.cardiology },
    { key: 'maternity', name: 'الأمومة', location: 'مبنى ج، الطابق الأول', walkTime: 'حوالي 5 دقائق', icon: BabyIcon, floorChangeInstruction: floorInstructions.maternity },
    { key: 'radiology', name: 'الأشعة', location: 'مبنى أ، الطابق الأرضي', walkTime: 'حوالي دقيقتين', icon: BoneIcon },
    { key: 'emergencies', name: 'الطوارئ', location: 'المدخل الرئيسي', walkTime: 'حوالي دقيقة واحدة', icon: EmergencyIcon },
    { key: 'laboratory', name: 'المختبر', location: 'مبنى أ، الطابق السفلي', walkTime: 'حوالي 3 دقائق', icon: LabIcon, floorChangeInstruction: floorInstructions.laboratory },
    { key: 'pharmacy', name: 'الصيدلية', location: 'مبنى ج، الطابق الأرضي', walkTime: 'حوالي 4 دقائق', icon: PharmacyIcon },
  ]
};
