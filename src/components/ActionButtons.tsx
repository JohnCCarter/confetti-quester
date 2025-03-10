
import React from 'react';
import { RotateCcw, Plus } from 'lucide-react';

interface ActionButtonsProps {
  onReset: () => void;
  onAddTask: () => void;
  userTheme?: 'pink' | 'blue';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onReset, onAddTask, userTheme = 'pink' }) => {
  const buttonColorClass = userTheme === 'pink' ? 'bg-app-pink hover:bg-pink-600' : 'bg-app-blue hover:bg-blue-600';

  return (
    <div className="flex justify-between mt-4">
      <button 
        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
        onClick={onReset}
      >
        <RotateCcw size={16} className="mr-2" />
        Återställ
      </button>
      
      <button 
        className={`${buttonColorClass} text-white px-4 py-2 rounded-md flex items-center transition-colors`}
        onClick={onAddTask}
      >
        <Plus size={16} className="mr-2" />
        Lägg till uppgift
      </button>
    </div>
  );
};

export default ActionButtons;
