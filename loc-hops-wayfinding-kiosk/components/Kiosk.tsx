import React, { useState, useEffect } from 'react';
import { 
  Mic, MicOff, MapPin, Search, QrCode, 
  ThermometerSun, Accessibility, Moon, Sun, 
  Type, HeartPulse, Stethoscope, Activity, Siren,
  ChevronRight, ArrowLeft
} from 'lucide-react';

// --- PALETTE DE COULEURS & DESIGN TOKENS ---
const THEME = {
  colors: {
    primary: '#006064',    // Deep Teal
    secondary: '#F8FAFC',  // Gris Vapeur
    accent: '#10B981',     // Vert Menthe
    alert: '#EF4444',      // Rouge Doux
    text: '#1E293B',       // Gris Foncé (Lisibilité)
  },
  radius: 'rounded-[24px]', // Super arrondi
  shadow: 'shadow-xl shadow-slate-200/50',
  glass: 'bg-white/80 backdrop-blur-md border border-white/50',
};

// --- COMPOSANTS UI ---

const Header = () => (
  <header className={`flex justify-between items-center p-8 ${THEME.glass} fixed top-0 w-full z-50`}>
    <div className="text-4xl font-bold text-slate-800 tracking-tighter">
      12:00
    </div>
    <div className="flex items-center gap-4 text-slate-600 text-xl font-medium">
      <span>01/12/2025</span>
      <span className="h-6 w-px bg-slate-300 mx-2"></span>
      <div className="flex items-center gap-2">
        <ThermometerSun className="text-orange-400" size={28} />
        <span>Dakar, 28°C</span>
      </div>
    </div>
  </header>
);

const ServiceCard = ({ icon: Icon, title, status, color = "bg-white", isUrgent = false }) => (
  <div className={`
    p-6 flex flex-col justify-between transition-all duration-300 transform active:scale-95
    ${THEME.radius} ${THEME.shadow} 
    ${isUrgent ? 'col-span-2 bg-red-50 border-l-8 border-red-500' : 'bg-white border-l-8 border-transparent hover:border-[#006064]'}
  `}>
    <div className="flex justify-between items-start">
      <div className={`p-4 rounded-full ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-teal-50 text-[#006064]'}`}>
        <Icon size={32} />
      </div>
      {status === 'open' && (
        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          OUVERT
        </span>
      )}
    </div>
    <div>
      <h3 className={`text-2xl font-bold mt-4 ${isUrgent ? 'text-red-700' : 'text-slate-800'}`}>{title}</h3>
      <p className="text-slate-500 mt-1 text-lg">
        {isUrgent ? 'Accès immédiat • Porte A' : 'File d\'attente: ~5 min'}
      </p>
    </div>
  </div>
);

// --- ÉCRANS PRINCIPAUX ---

export default function HospitalKiosk() {
  const [screen, setScreen] = useState('home'); // home, services, assistant
  const [lang, setLang] = useState('fr');
  const [isListening, setIsListening] = useState(false);
  const [handicapMode, setHandicapMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Simulation d'onde sonore
  const [waveHeight, setWaveHeight] = useState([10, 20, 15]);
  useEffect(() => {
    if(isListening) {
      const interval = setInterval(() => {
        setWaveHeight([Math.random()*40, Math.random()*40, Math.random()*40]);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  // -- ÉCRAN 1: ACCUEIL --
  if (screen === 'home') {
    return (
      <div className={`h-screen w-full bg-[#F8FAFC] font-sans overflow-hidden flex flex-col relative ${handicapMode ? 'justify-end pb-20' : 'justify-center'}`}>
        <Header />
        
        {/* Logo Central */}
        <div className={`flex flex-col items-center z-10 transition-all duration-500 ${handicapMode ? 'mb-8' : 'mb-16'}`}>
          <div className="w-24 h-24 bg-[#006064] rounded-3xl flex items-center justify-center shadow-2xl mb-6">
            <HeartPulse size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-[#006064] tracking-tight">Loc-Hops</h1>
          <p className="text-2xl text-slate-500 mt-2 font-light">Bienvenue à l'Hôpital Saint-Savoir</p>
        </div>

        {/* Cartes Langues */}
        <div className="grid grid-cols-4 gap-4 px-12 z-10">
          {['FR', 'WL', 'AR', 'EN'].map((l) => (
            <button 
              key={l}
              onClick={() => { setLang(l.toLowerCase()); setScreen('services'); }}
              className={`
                h-64 flex flex-col items-center justify-center gap-4 transition-all duration-300
                ${THEME.radius} border-2 
                ${lang === l.toLowerCase() ? 'bg-white border-[#006064] shadow-2xl scale-105' : 'bg-white/50 border-transparent hover:bg-white hover:shadow-lg'}
              `}
            >
              <span className="text-6xl">{l === 'FR' ? '🇫🇷' : l === 'WL' ? '🇸🇳' : l === 'AR' ? '🇸🇦' : '🇬🇧'}</span>
              <span className="text-2xl font-bold text-slate-700">{l === 'FR' ? 'Français' : l === 'WL' ? 'Wolof' : l === 'AR' ? 'العربية' : 'English'}</span>
            </button>
          ))}
        </div>

        {/* Floating AI Button */}
        <button 
          onClick={() => setScreen('assistant')}
          className="absolute bottom-12 right-12 w-24 h-24 bg-[#006064] rounded-full shadow-2xl flex items-center justify-center animate-bounce cursor-pointer z-20 hover:scale-110 transition-transform"
        >
           <Mic className="text-white" size={40} />
           <span className="absolute -top-2 -right-2 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-teal-500"></span>
          </span>
        </button>

        {/* Bouton Settings */}
        <button onClick={() => setShowSettings(!showSettings)} className="absolute bottom-12 left-12 p-4 bg-slate-200 rounded-full text-slate-600">
           <Accessibility size={32} />
        </button>

        {/* Overlay Settings */}
        {showSettings && (
           <div className={`absolute bottom-32 left-12 w-80 bg-white p-6 ${THEME.radius} shadow-2xl z-50 border border-slate-100`}>
              <h3 className="text-xl font-bold text-[#006064] mb-4">Accessibilité</h3>
              <div className="space-y-4">
                <button onClick={() => setHandicapMode(!handicapMode)} className={`w-full p-4 rounded-xl flex items-center gap-3 ${handicapMode ? 'bg-[#006064] text-white' : 'bg-slate-100 text-slate-700'}`}>
                  <Accessibility /> Mode Fauteuil
                </button>
                <button className="w-full p-4 rounded-xl flex items-center gap-3 bg-slate-100 text-slate-700">
                  <Moon /> Contraste Élevé
                </button>
                <div className="flex gap-2">
                   <button className="flex-1 p-4 bg-slate-100 rounded-xl flex justify-center"><Type size={16}/></button>
                   <button className="flex-1 p-4 bg-slate-100 rounded-xl flex justify-center"><Type size={24}/></button>
                </div>
              </div>
           </div>
        )}
      </div>
    );
  }

  // -- ÉCRAN 2: SERVICES (DASHBOARD) --
  if (screen === 'services') {
    return (
      <div className={`h-screen w-full bg-[#F8FAFC] p-8 pt-32 font-sans flex flex-col ${handicapMode ? 'justify-end' : ''}`}>
        <Header />
        
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setScreen('home')} className="p-4 bg-white rounded-full shadow-md text-slate-600">
            <ArrowLeft size={24}/>
          </button>
          <h2 className="text-4xl font-bold text-[#006064]">Services Disponibles</h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 gap-6 h-full pb-24 overflow-y-auto">
          {/* Urgences */}
          <ServiceCard icon={Siren} title="URGENCES" status="open" isUrgent={true} />
          
          {/* Autres Services */}
          <ServiceCard icon={HeartPulse} title="Cardiologie" status="open" />
          <ServiceCard icon={Stethoscope} title="Pédiatrie" status="open" />
          <ServiceCard icon={Activity} title="Radiologie" status="open" />
          
          {/* Carte Interactive Placeholder */}
          <div className={`bg-slate-200 ${THEME.radius} relative overflow-hidden group col-span-1 min-h-[200px]`}>
            {/* Fake Map Image */}
            <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/isometric-map-city-streets-park_1284-21958.jpg')] bg-cover opacity-50 mix-blend-multiply"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <button className="w-full py-4 bg-[#006064] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-[#004D40]">
                <QrCode /> Itinéraire Mobile
              </button>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg">
               <MapPin className="text-red-500" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -- ÉCRAN 3: ASSISTANT IA --
  if (screen === 'assistant') {
    return (
      <div className="h-screen w-full bg-white flex flex-col font-sans relative">
         <Header />
         
         <button onClick={() => setScreen('home')} className="absolute top-32 left-8 p-4 bg-slate-100 rounded-full z-50">
            <ArrowLeft />
         </button>

         <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            
            {/* Visualisation de l'Avatar IA */}
            <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
               {/* Cercles animés style 'Siri' */}
               <div className={`absolute inset-0 bg-teal-200 rounded-full opacity-30 ${isListening ? 'animate-ping' : ''}`}></div>
               <div className={`absolute w-56 h-56 bg-teal-100 rounded-full opacity-50 ${isListening ? 'animate-pulse' : ''}`}></div>
               <div className="absolute w-48 h-48 bg-gradient-to-br from-[#006064] to-[#10B981] rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                  <div className="text-white text-9xl font-light opacity-20">AI</div>
               </div>
            </div>

            {/* Bulle de dialogue */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[30px] rounded-tl-none shadow-lg max-w-2xl mb-12 text-left">
              <p className="text-3xl text-slate-700 leading-relaxed font-medium">
                Bonjour. Je suis l'assistant de l'Hôpital Saint-Savoir. 
                <span className="text-[#006064] block mt-2 font-bold">Comment puis-je vous aider aujourd'hui ?</span>
              </p>
            </div>

            {/* Transcription Temps Réel */}
            <div className="h-20 flex items-end justify-center mb-8">
               {isListening ? (
                 <p className="text-2xl text-slate-400 font-light italic">"Où se trouve la radiologie..."</p>
               ) : (
                 <p className="text-lg text-slate-300">Touchez le micro pour parler</p>
               )}
            </div>

            {/* Bouton Micro Géant */}
            <button 
              onClick={() => setIsListening(!isListening)}
              className={`
                w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300
                ${isListening ? 'bg-red-500 shadow-red-200 shadow-2xl scale-110' : 'bg-[#006064] shadow-teal-200 shadow-2xl hover:scale-105'}
              `}
            >
               {isListening ? (
                 <div className="flex gap-2 items-center">
                   <div className="w-2 bg-white rounded-full animate-[bounce_1s_infinite]" style={{height: `${waveHeight[0]}px`}}></div>
                   <div className="w-2 bg-white rounded-full animate-[bounce_1.2s_infinite]" style={{height: `${waveHeight[1]}px`}}></div>
                   <div className="w-2 bg-white rounded-full animate-[bounce_0.8s_infinite]" style={{height: `${waveHeight[2]}px`}}></div>
                 </div>
               ) : (
                 <Mic size={48} className="text-white" />
               )}
            </button>
            <p className="mt-6 text-slate-400 font-medium tracking-wide uppercase text-sm">
              {isListening ? 'Écoute en cours...' : 'Appuyez pour parler'}
            </p>

         </div>
      </div>
    );
  }
}