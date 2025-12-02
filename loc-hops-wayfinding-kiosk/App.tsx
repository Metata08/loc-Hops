import React, { useState, useCallback, useMemo } from 'react';
import { Screen, Language, Destination } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import DestinationScreen from './components/DestinationScreen';
import RouteScreen from './components/RouteScreen';
import MobileViewScreen from './components/MobileViewScreen';
import { translations, destinations } from './constants';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.Welcome);
  const [language, setLanguage] = useState<Language>('fr');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const handleLanguageSelect = useCallback((lang: Language) => {
    setLanguage(lang);
    setScreen(Screen.Destination);
  }, []);

  const handleDestinationSelect = useCallback((destinationKey: string) => {
    const destinationData = destinations[language].find(d => d.key === destinationKey);
    if (destinationData) {
      setSelectedDestination(destinationData);
      setScreen(Screen.Route);
    }
  }, [language]);
  
  const handleBack = useCallback(() => {
    if (screen === Screen.Destination) {
      setScreen(Screen.Welcome);
    } else if (screen === Screen.Route) {
      setScreen(Screen.Destination);
      setSelectedDestination(null);
    } else if (screen === Screen.MobileView) {
      setScreen(Screen.Route);
    }
  }, [screen]);

  const handleNewSearch = useCallback(() => {
    setSelectedDestination(null);
    setScreen(Screen.Destination);
  }, []);

  const handleFinish = useCallback(() => {
    setSelectedDestination(null);
    setScreen(Screen.Welcome);
  }, []);

  const handleShowMobileView = useCallback(() => {
    setScreen(Screen.MobileView);
  }, []);
  
  const T = useMemo(() => translations[language], [language]);

  const renderScreen = () => {
    switch (screen) {
      case Screen.Welcome:
        return <WelcomeScreen onLanguageSelect={handleLanguageSelect} />;
      case Screen.Destination:
        return (
          <DestinationScreen
            T={T}
            language={language}
            onDestinationSelect={handleDestinationSelect}
            onBack={handleBack}
          />
        );
      case Screen.Route:
        return selectedDestination ? (
          <RouteScreen
            T={T}
            destination={selectedDestination}
            onNewSearch={handleNewSearch}
            onFinish={handleFinish}
            onShowMobileView={handleShowMobileView}
            language={language}
          />
        ) : null;
      case Screen.MobileView:
        return selectedDestination ? (
            <MobileViewScreen 
                T={T}
                destination={selectedDestination} 
                onBack={handleBack}
                language={language}
            />
        ) : null;
      default:
        return <WelcomeScreen onLanguageSelect={handleLanguageSelect} />;
    }
  };

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={direction} className={`h-screen w-screen bg-brand-primary-bg text-brand-text ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <div className="container mx-auto h-full p-4 md:p-8 flex flex-col items-center justify-center">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
