import React from 'react';
import type { Destination, Language } from '../types';
import PrinterIcon from './icons/PrinterIcon';
import HospitalMap from './HospitalMap';

interface RouteScreenProps {
  T: any;
  destination: Destination;
  onNewSearch: () => void;
  onFinish: () => void;
  onShowMobileView: () => void;
  language: Language;
}

const RouteScreen: React.FC<RouteScreenProps> = ({ T, destination, onNewSearch, onFinish, onShowMobileView, language }) => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.href)}`;
  
  return (
    <div className="w-full h-full flex flex-col">
      <header className="text-center mb-6">
        <h1 className="text-5xl font-bold text-brand-secondary">
            {T.yourRouteTo} <span className="text-brand-accent">{destination.name}</span>
        </h1>
      </header>
      <div className="flex-grow flex flex-col md:flex-row gap-8">
        {/* Left side: Map */}
        <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-lg p-4 flex flex-col overflow-hidden">
           <HospitalMap 
              destinationKey={destination.key} 
              youAreHereText={T.youAreHere} 
              language={language}
            />
        </div>

        {/* Right side: Info and Actions */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex-grow text-center flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-brand-secondary mb-4">{destination.name}</h2>
            {/* FIX: Removed problematic string replacement. The destination.location from constants is already correctly translated and formatted. The original code had a TypeScript error due to an impossible condition and also had a logical bug in the replacement logic for French ordinals. */}
            <p className="text-3xl text-brand-text mb-2">{destination.location}</p>
            <p className="text-2xl text-gray-600">{destination.walkTime}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex-grow text-center flex flex-col items-center justify-center">
             <h3 className="text-2xl font-bold text-brand-text mb-4">{T.scanForMap}</h3>
             <img src={qrCodeUrl} alt="QR Code for map" className="rounded-lg mb-4" />
             <button onClick={onShowMobileView} className="text-sm text-gray-500 underline">
                (Simulate Scan)
             </button>
          </div>
          <button className="bg-white text-brand-secondary text-2xl font-bold py-6 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-4 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-brand-accent transition-all">
            <PrinterIcon className="w-10 h-10"/>
            <span>{T.printMap}</span>
          </button>
        </div>
      </div>
       <footer className="mt-6 flex justify-between items-center w-full">
         <button onClick={onNewSearch} className="text-white bg-brand-secondary text-2xl font-bold py-6 px-12 rounded-full shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-brand-accent-dark transition-all">
           {T.newSearch}
         </button>
         <button onClick={onFinish} className="text-brand-secondary text-2xl font-bold py-6 px-12">
           {T.finish}
         </button>
       </footer>
    </div>
  );
};

export default RouteScreen;