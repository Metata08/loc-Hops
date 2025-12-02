
import React from 'react';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onClose: () => void;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress, onClose }) => {
  const keys = 'AZERTYUIOPQSDFGHJKLMWXCVBN'.split('');

  return (
    <div className="bg-gray-300 p-4 rounded-lg shadow-lg">
      <div className="flex justify-end mb-2">
         <button onClick={onClose} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
            X
         </button>
      </div>
      <div className="grid grid-cols-10 gap-2 text-xl">
        {keys.map(key => (
          <button
            key={key}
            onClick={() => onKeyPress(key.toLowerCase())}
            className="bg-white rounded-md p-4 font-semibold text-brand-text shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            {key}
          </button>
        ))}
        <button
          onClick={() => onKeyPress('space')}
          className="col-span-8 bg-white rounded-md p-4 font-semibold text-brand-text shadow hover:bg-gray-100"
        >
          Espace
        </button>
        <button
          onClick={() => onKeyPress('backspace')}
          className="col-span-2 bg-gray-400 text-white rounded-md p-4 font-semibold shadow hover:bg-gray-500"
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
