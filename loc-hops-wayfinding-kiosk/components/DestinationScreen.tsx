
import React, { useState } from 'react';
import { destinations } from '../constants';
import type { Language } from '../types';
import VirtualKeyboard from './VirtualKeyboard';
import SearchIcon from './icons/SearchIcon';
import BackIcon from './icons/BackIcon';

interface DestinationScreenProps {
  T: any;
  language: Language;
  onDestinationSelect: (destinationKey: string) => void;
  onBack: () => void;
}

const DestinationScreen: React.FC<DestinationScreenProps> = ({ T, language, onDestinationSelect, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const serviceList = destinations[language];

  const filteredServices = serviceList.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setSearchQuery(q => q.slice(0, -1));
    } else if (key === 'space') {
      setSearchQuery(q => q + ' ');
    } else {
      setSearchQuery(q => q + key);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
       <header className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-brand-secondary text-2xl font-bold p-4 rounded-lg hover:bg-blue-100">
           <BackIcon className="w-8 h-8"/>
           <span>{T.back}</span>
        </button>
        <h1 className="text-5xl font-bold text-brand-secondary">{T.whereToGo}</h1>
        <div className="w-40"></div>
      </header>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          <SearchIcon className="w-8 h-8 text-gray-500" />
        </div>
        <input
          type="search"
          value={searchQuery}
          onFocus={() => setShowKeyboard(true)}
          readOnly
          placeholder={T.searchPlaceholder}
          className="w-full p-6 ps-16 text-2xl border-2 border-gray-300 rounded-full bg-white focus:ring-brand-accent focus:border-brand-accent"
        />
      </div>

      <main className="flex-grow">
        <h2 className="text-3xl font-bold text-gray-600 mb-4 text-center">{T.mainServices}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredServices.map(service => {
            const Icon = service.icon;
            return (
              <button
                key={service.key}
                onClick={() => onDestinationSelect(service.key)}
                className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 text-center hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-accent transition-transform transform hover:scale-105"
              >
                <Icon className="w-20 h-20 text-brand-secondary" />
                <span className="text-3xl font-bold text-brand-text">{service.name}</span>
              </button>
            );
          })}
        </div>
      </main>

      {showKeyboard && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-4 shadow-2xl-top z-50">
           <VirtualKeyboard onKeyPress={handleKeyPress} onClose={() => setShowKeyboard(false)} />
        </div>
      )}
    </div>
  );
};

export default DestinationScreen;
