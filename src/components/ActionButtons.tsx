
import React, { useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';

interface ActionButtonsProps {
  onReset: () => void;
  onAddTask: () => void;
  userTheme?: 'pink' | 'blue';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onReset, onAddTask, userTheme = 'pink' }) => {
  const [resetHovered, setResetHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  
  const buttonColorClass = userTheme === 'pink' ? 'bg-app-pink hover:bg-pink-600' : 'bg-app-blue hover:bg-blue-600';

  return (
    <div className="flex justify-between mt-4 md:mt-6 md:max-w-lg md:mx-auto">
      <button 
        className={`bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center transition-all duration-300 md:px-6 md:py-3 md:text-lg
          ${resetHovered ? 'transform scale-105 shadow-md' : ''}`}
        onClick={onReset}
        onMouseEnter={() => setResetHovered(true)}
        onMouseLeave={() => setResetHovered(false)}
      >
        <RotateCcw size={16} className={`mr-2 transition-transform duration-300 md:size-5 ${resetHovered ? 'rotate-180' : ''}`} />
        Återställ
      </button>
      
      <button 
        className={`${buttonColorClass} text-white px-4 py-2 rounded-md flex items-center transition-all duration-300 md:px-6 md:py-3 md:text-lg
          ${addHovered ? 'transform scale-105 shadow-md' : ''}`}
        onClick={onAddTask}
        onMouseEnter={() => setAddHovered(true)}
        onMouseLeave={() => setAddHovered(false)}
      >
        <Plus size={16} className={`mr-2 transition-transform duration-300 md:size-5 ${addHovered ? 'rotate-90' : ''}`} />
        Lägg till uppgift
      </button>
    </div>
  );
};

export default ActionButtons;
