
import React from 'react';
import type { Language } from '../types';

interface WelcomeScreenProps {
  onLanguageSelect: (language: Language) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLanguageSelect }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full w-full max-w-4xl">
      <h1 className="text-6xl font-bold text-brand-secondary mb-8">Loc-Hops</h1>
      <div className="space-y-4 mb-16">
        <p className="text-4xl font-bold text-brand-text">Bienvenue</p>
        <p className="text-4xl font-bold text-brand-text">Nanga Def</p>
        <p className="text-4xl font-bold text-brand-text font-arabic">مرحبًا</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <button
          onClick={() => onLanguageSelect('fr')}
          className="bg-brand-secondary text-white text-3xl font-bold py-12 px-8 rounded-2xl shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-brand-accent transition-transform transform hover:scale-105"
        >
          Français
        </button>
        <button
          onClick={() => onLanguageSelect('wo')}
          className="bg-brand-secondary text-white text-3xl font-bold py-12 px-8 rounded-2xl shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-brand-accent transition-transform transform hover:scale-105"
        >
          Wolof
        </button>
        <button
          onClick={() => onLanguageSelect('ar')}
          className="bg-brand-secondary text-white text-3xl font-bold py-12 px-8 rounded-2xl shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-brand-accent transition-transform transform hover:scale-105 font-arabic"
        >
          العربية
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
