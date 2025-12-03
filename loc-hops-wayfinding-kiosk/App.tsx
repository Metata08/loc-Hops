import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MapPin, Search, QrCode, ThermometerSun, 
  Accessibility, Moon, Type, HeartPulse, Stethoscope, 
  Activity, Siren, ArrowLeft, Navigation, X
} from 'lucide-react';

// --- TYPES ---
type Screen = 'home' | 'services' | 'assistant';
type Language = 'fr' | 'wl' | 'ar' | 'en';

// --- DONNÉES SIMULÉES ---
const SERVICES = [
  { id: 'urgences', title: 'URGENCES', icon: Siren, isUrgent: true, status: 'Immédiat' },
  { id: 'cardio', title: 'Cardiologie', icon: HeartPulse, isUrgent: false, status: '5 min' },
  { id: 'pediatrie', title: 'Pédiatrie', icon: Stethoscope, isUrgent: false, status: '15 min' },
  { id: 'radio', title: 'Radiologie', icon: Activity, isUrgent: false, status: 'Sur RDV' },
];

export default function App() {
  // --- ÉTATS (STATE) ---
  const [screen, setScreen] = useState<Screen>('home');
  const [lang, setLang] = useState<Language>('fr');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [botResponse, setBotResponse] = useState("");
  
  // Accessibilité & Paramètres
  const [handicapMode, setHandicapMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Horloge
  const [time, setTime] = useState(new Date());

  // Animation Audio
  const [waveHeights, setWaveHeights] = useState([10, 15, 10]);

  // --- EFFETS ---

  // 1. Horloge en temps réel
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Animation des ondes sonores quand ça écoute
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setWaveHeights([
          Math.random() * 40 + 10,
          Math.random() * 50 + 20,
          Math.random() * 40 + 10
        ]);
      }, 150);
      return () => clearInterval(interval);
    } else {
      setWaveHeights([10, 15, 10]);
    }
  }, [isListening]);

  // --- LOGIQUE MÉTIER ---

  const handleLanguageSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    setScreen('services');
  };

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      setTranscript("");
      setBotResponse("");
      
      // Simulation de la reconnaissance vocale (Web Speech API fictive ici)
      setTimeout(() => {
        setTranscript("Je cherche le service de radiologie...");
        
        // Simulation réponse Backend après 2s
        setTimeout(() => {
          setIsListening(false);
          setBotResponse("La radiologie se trouve au sous-sol (-1). Prenez l'ascenseur B juste derrière vous.");
          speak("La radiologie se trouve au sous-sol moins un. Prenez l'ascenseur B juste derrière vous.");
        }, 2000);
      }, 1500);
    } else {
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  // --- COMPOSANTS UI INTERNES ---

  const Header = () => (
    <header className="absolute top-0 w-full flex justify-between items-center p-8 z-40 bg-white/60 backdrop-blur-md border-b border-white/20">
      <div className="text-4xl font-bold text-primary tracking-tighter">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="flex items-center gap-6 text-slate-600 text-xl font-medium">
        <span className="uppercase tracking-widest text-sm font-bold bg-white px-3 py-1 rounded-full shadow-sm">
          {lang}
        </span>
        <span>{time.toLocaleDateString()}</span>
        <div className="flex items-center gap-2 text-orange-500">
          <ThermometerSun size={28} />
          <span>28°C</span>
        </div>
      </div>
    </header>
  );

  const SettingsOverlay = () => {
    if (!showSettings) return null;
    return (
      <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-start items-end p-12">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 animate-in slide-in-from-bottom-10 fade-in border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-primary">Paramètres</h3>
            <button onClick={() => setShowSettings(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => setHandicapMode(!handicapMode)} 
              className={`w-full p-6 rounded-2xl flex items-center gap-4 text-xl font-bold transition-all ${handicapMode ? 'bg-primary text-white shadow-lg shadow-teal-900/20' : 'bg-slate-50 text-slate-600'}`}
            >
              <Accessibility size={28} /> Mode Fauteuil
            </button>
            
            <button className="w-full p-6 rounded-2xl flex items-center gap-4 text-xl font-bold bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
              <Moon size={28} /> Contraste Élevé
            </button>
            
            <div className="flex gap-3">
               <button className="flex-1 p-6 bg-slate-50 rounded-2xl flex justify-center hover:bg-slate-100"><Type size={20}/></button>
               <button className="flex-1 p-6 bg-slate-50 rounded-2xl flex justify-center hover:bg-slate-100"><Type size={32}/></button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- RENDU DES ÉCRANS ---

  // 1. Écran d'Accueil
  if (screen === 'home') {
    return (
      <div className={`h-screen w-full relative flex flex-col ${handicapMode ? 'justify-end pb-32' : 'justify-center'} transition-all duration-500`}>
        <Header />
        
        <div className="flex flex-col items-center z-10 mb-12">
          <div className="w-28 h-28 bg-primary rounded-[2rem] flex items-center justify-center shadow-xl shadow-teal-900/10 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
            <HeartPulse size={56} className="text-white" />
          </div>
          <h1 className="text-6xl font-extrabold text-primary tracking-tight">Loc-Hops</h1>
          <p className="text-2xl text-slate-400 mt-3 font-medium">Hôpital Saint-Savoir</p>
        </div>

        {/* Grille Langues */}
        <div className="grid grid-cols-4 gap-6 px-16 z-10 max-w-6xl mx-auto w-full">
          {[
            { code: 'fr', label: 'Français', flag: '🇫🇷' },
            { code: 'wl', label: 'Wolof', flag: '🇸🇳' },
            { code: 'ar', label: 'العربية', flag: '🇸🇦' },
            { code: 'en', label: 'English', flag: '🇬🇧' }
          ].map((item) => (
            <button 
              key={item.code}
              onClick={() => handleLanguageSelect(item.code as Language)}
              className="group h-72 flex flex-col items-center justify-center gap-6 bg-white border border-slate-100 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30 transition-all duration-300"
            >
              <span className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{item.flag}</span>
              <span className="text-2xl font-bold text-slate-700 group-hover:text-primary">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Boutons Flottants */}
        <div className={`absolute bottom-12 w-full px-12 flex justify-between items-center ${handicapMode ? 'translate-y-0' : ''}`}>
          <button 
            onClick={() => setShowSettings(true)} 
            className="p-6 bg-white rounded-full text-slate-400 shadow-lg hover:text-primary hover:shadow-xl transition-all"
          >
            <Accessibility size={40} />
          </button>
          
          <button 
            onClick={() => setScreen('assistant')}
            className="flex items-center gap-4 pl-8 pr-4 py-4 bg-primary rounded-full text-white shadow-2xl shadow-teal-900/30 hover:scale-105 transition-transform"
          >
            <span className="text-xl font-bold">Assistant IA</span>
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center animate-pulse">
              <Mic size={32} />
            </div>
          </button>
        </div>
        <SettingsOverlay />
      </div>
    );
  }

  // 2. Écran Services (Dashboard)
  if (screen === 'services') {
    return (
      <div className={`h-screen w-full bg-secondary p-8 pt-32 flex flex-col ${handicapMode ? 'justify-end' : ''}`}>
        <Header />
        
        <div className="flex items-center gap-6 mb-8 px-2">
          <button 
            onClick={() => setScreen('home')} 
            className="p-5 bg-white rounded-2xl shadow-md text-slate-500 hover:text-primary hover:scale-105 transition-all"
          >
            <ArrowLeft size={32}/>
          </button>
          <h2 className="text-4xl font-bold text-primary">Services Disponibles</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 h-full pb-8 overflow-y-auto">
          {SERVICES.map((srv) => (
            <button 
              key={srv.id}
              className={`
                relative p-8 flex flex-col justify-between text-left transition-all duration-300 hover:scale-[1.02]
                rounded-3xl shadow-lg border-l-[12px] group
                ${srv.isUrgent 
                  ? 'col-span-2 bg-red-50 border-alert hover:shadow-red-200' 
                  : 'bg-white border-transparent hover:border-primary hover:shadow-teal-100'}
              `}
            >
              <div className="flex justify-between items-start w-full">
                <div className={`p-5 rounded-2xl ${srv.isUrgent ? 'bg-red-100 text-alert' : 'bg-teal-50 text-primary'}`}>
                  <srv.icon size={40} />
                </div>
                {!srv.isUrgent && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 text-lg font-bold rounded-full flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    OUVERT
                  </span>
                )}
              </div>
              <div className="mt-6">
                <h3 className={`text-3xl font-bold ${srv.isUrgent ? 'text-red-800' : 'text-slate-800'}`}>{srv.title}</h3>
                <p className="text-slate-500 mt-2 text-xl font-medium flex items-center gap-2">
                  <Navigation size={20} />
                  {srv.isUrgent ? 'Accès Immédiat • Aile Nord' : `Attente estimée : ${srv.status}`}
                </p>
              </div>
              {/* Effet déco */}
              <div className="absolute right-0 bottom-0 opacity-5 transform translate-y-4 translate-x-4">
                <srv.icon size={180} />
              </div>
            </button>
          ))}
          
          {/* Carte Interactive Placeholder */}
          <div className="bg-slate-200 rounded-3xl relative overflow-hidden group col-span-2 min-h-[250px] shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
            
            {/* Fake path animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M 100 200 Q 250 100 400 200 T 700 150" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="10 10" className="animate-[dash_20s_linear_infinite]" />
              <circle cx="100" cy="200" r="8" fill="#006064" />
              <MapPin x="685" y="125" size={40} className="text-alert animate-bounce" />
            </svg>

            <div className="absolute bottom-8 right-8 flex gap-4">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <QrCode size={64} className="text-primary"/>
              </div>
              <button className="px-8 bg-primary text-white text-xl font-bold rounded-2xl shadow-lg hover:bg-teal-800 transition-colors flex flex-col justify-center">
                <span>Scanner pour</span>
                <span>Itinéraire Mobile</span>
              </button>
            </div>
            
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-6 py-3 rounded-xl shadow-sm border border-slate-200">
               <span className="font-bold text-slate-700 flex items-center gap-2">
                 <MapPin size={20} className="text-alert" /> Vous êtes ici (Hall A)
               </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Écran Assistant (Chat)
  if (screen === 'assistant') {
    return (
      <div className="h-screen w-full bg-white flex flex-col relative overflow-hidden">
        <Header />
        
        {/* Bouton Retour discret */}
        <button 
          onClick={() => setScreen('home')} 
          className="absolute top-32 left-8 p-4 bg-slate-50 hover:bg-slate-100 rounded-full z-50 transition-colors"
        >
          <ArrowLeft size={32} className="text-slate-400" />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center z-10">
          
          {/* Avatar IA Animé */}
          <div className="relative w-80 h-80 mb-16 flex items-center justify-center">
             {/* Cercles de respiration */}
             <div className={`absolute inset-0 bg-teal-500 rounded-full opacity-10 blur-xl transition-all duration-700 ${isListening ? 'scale-150' : 'scale-100'}`}></div>
             <div className={`absolute inset-0 bg-teal-400 rounded-full opacity-20 transition-all duration-1000 ${isListening ? 'animate-ping' : ''}`}></div>
             
             {/* Coeur de l'Avatar */}
             <div className="relative w-64 h-64 bg-gradient-to-br from-primary to-teal-500 rounded-full shadow-2xl shadow-teal-500/30 flex items-center justify-center overflow-hidden border-4 border-white">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                {isListening ? (
                  <div className="flex gap-3 items-center h-24">
                    {/* Visualizer Barres */}
                    <div className="w-4 bg-white rounded-full transition-all duration-150" style={{height: `${waveHeights[0]}px`}}></div>
                    <div className="w-4 bg-white rounded-full transition-all duration-150" style={{height: `${waveHeights[1]}px`}}></div>
                    <div className="w-4 bg-white rounded-full transition-all duration-150" style={{height: `${waveHeights[2]}px`}}></div>
                    <div className="w-4 bg-white rounded-full transition-all duration-150" style={{height: `${waveHeights[1]}px`}}></div>
                    <div className="w-4 bg-white rounded-full transition-all duration-150" style={{height: `${waveHeights[0]}px`}}></div>
                  </div>
                ) : (
                   <Mic size={80} className="text-white opacity-90" />
                )}
             </div>
          </div>

          {/* Zone de Dialogue */}
          <div className="w-full max-w-3xl min-h-[200px] flex flex-col items-center justify-start gap-6">
            
            {/* Message Bot */}
            <div className="bg-white border-2 border-slate-100 p-8 rounded-[40px] rounded-tl-none shadow-xl w-full text-left transition-all">
              <p className="text-3xl text-slate-700 leading-relaxed font-medium">
                {botResponse || (
                  <>
                    Bonjour. Je suis l'assistant virtuel. <br/>
                    <span className="text-primary font-bold">Touchez le bouton pour poser votre question.</span>
                  </>
                )}
              </p>
            </div>

            {/* Message User (Transcript) */}
            {transcript && (
              <div className="self-end bg-primary text-white p-6 rounded-[30px] rounded-tr-none shadow-lg max-w-2xl animate-in slide-in-from-bottom-5 fade-in">
                <p className="text-2xl font-light">"{transcript}"</p>
              </div>
            )}
          </div>

          {/* Contrôle Principal */}
          <div className="mt-auto mb-12">
            <button 
              onClick={toggleListening}
              className={`
                group relative flex items-center justify-center gap-4 px-12 py-8 rounded-full transition-all duration-500
                ${isListening 
                  ? 'bg-alert text-white shadow-red-500/30 shadow-2xl scale-105' 
                  : 'bg-primary text-white shadow-teal-500/30 shadow-2xl hover:scale-105'}
              `}
            >
              <div className={`p-4 rounded-full bg-white/20 backdrop-blur-sm transition-transform ${isListening ? 'animate-pulse' : ''}`}>
                 {isListening ? <mic-off size={40} /> : <Mic size={40} />}
              </div>
              <span className="text-3xl font-bold tracking-wide">
                {isListening ? 'ARRÊTER' : 'APPUYER POUR PARLER'}
              </span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return null;
}