import React, { ReactNode } from 'react';

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-3 p-4 rounded-2xl transition-all duration-200
        ${active 
          ? 'bg-teal-100 text-teal-800 ring-2 ring-teal-500 shadow-inner' 
          : 'bg-white text-slate-600 hover:bg-slate-50 hover:shadow-md border border-slate-200'}
      `}
    >
      <div className={active ? 'text-teal-600' : 'text-slate-400'}>
        {icon}
      </div>
      <span className="font-semibold text-sm uppercase tracking-wide">{label}</span>
    </button>
  );
};