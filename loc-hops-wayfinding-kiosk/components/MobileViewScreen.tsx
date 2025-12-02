import React from 'react';
import HospitalMap from './HospitalMap';
import type { Destination, Language } from '../types';
import BackIcon from './icons/BackIcon';

interface MobileViewScreenProps {
    T: any;
    destination: Destination;
    onBack: () => void;
    language: Language;
}

const MobileViewScreen: React.FC<MobileViewScreenProps> = ({ T, destination, onBack, language }) => {
    return (
        <div className="bg-gray-800 w-full h-full max-w-md mx-auto rounded-3xl shadow-2xl p-4 flex flex-col overflow-hidden border-8 border-gray-900">
            <div className="w-full h-8 bg-gray-900 rounded-t-2xl flex justify-center items-center">
                <div className="w-20 h-4 bg-gray-800 rounded-full"></div>
            </div>
            <header className="text-center py-4 bg-gray-700 text-white">
                <h1 className="text-xl font-bold">{T.mobileViewTitle}</h1>
                <p className="text-sm">{T.yourRouteTo} {destination.name}</p>
            </header>
            <main className="flex-grow bg-white overflow-auto">
                <HospitalMap 
                    destinationKey={destination.key} 
                    youAreHereText={T.youAreHere} 
                    isMobile={true} 
                    language={language}
                />
            </main>
            <footer className="text-center py-3 bg-gray-700 text-white">
                <p className="text-xs">{T.zoomPan}</p>
                 <button onClick={onBack} className="mt-2 flex items-center justify-center gap-2 text-white bg-brand-secondary text-lg font-bold py-2 px-6 rounded-full shadow-lg">
                    <BackIcon className="w-5 h-5" />
                    <span>{T.returnToKiosk}</span>
                </button>
            </footer>
        </div>
    );
};

export default MobileViewScreen;