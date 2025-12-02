import { Sparkles, User } from 'lucide-react';
import React from 'react';

interface ChatBubbleProps {
  role: 'user' | 'model';
  text: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, text }) => {
  const isModel = role === 'model';

  return (
    <div className={`flex w-full ${isModel ? 'justify-start' : 'justify-end'} mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>

        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm
          ${isModel ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : 'bg-slate-200 text-slate-600'}
        `}>
          {isModel ? <Sparkles size={20} /> : <User size={20} />}
        </div>

        {/* Message */}
        <div className={`
          px-6 py-4 rounded-2xl text-lg leading-relaxed shadow-sm backdrop-blur-sm
          ${isModel
            ? 'bg-white/80 text-slate-800 rounded-tl-none border border-white/50'
            : 'bg-indigo-600 text-white rounded-tr-none shadow-md'}
        `}>
          {text}
        </div>
      </div>
    </div>
  );
};