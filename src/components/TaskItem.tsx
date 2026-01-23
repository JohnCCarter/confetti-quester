import React, { useState } from 'react';
import { Check, Edit2, Trash2 } from 'lucide-react';
import CustomTaskIcon from './CustomTaskIcon';

export interface TaskProps {
  id: string;
  title: string;
  icon: string;
  points: number;
  completed: boolean;
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  userTheme?: 'pink' | 'blue';
}

const TaskItem: React.FC<TaskProps> = ({ 
  id, 
  title, 
  icon, 
  points, 
  completed, 
  onComplete,
  onEdit,
  onDelete,
  userTheme = 'pink'
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const themeTextClass = userTheme === 'pink' ? 'group-hover:text-app-pink' : 'group-hover:text-app-blue';

  const handleComplete = () => {
    if (completed) return;
    
    setIsChecking(true);
    setTimeout(() => {
      onComplete(id);
      setIsChecking(false);
    }, 300);
  };

  return (
    <div 
      className={`task-item group ${completed ? 'completed' : ''} md:p-4 md:rounded-xl`}
    >
      <div 
        className={`task-checkbox w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 cursor-pointer transition-all duration-300 md:w-10 md:h-10 md:mr-4
          ${completed 
            ? 'border-app-green bg-app-green' 
            : isChecking 
              ? 'border-app-green animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]' 
              : 'border-gray-600'}`}
        onClick={handleComplete}
      >
        {completed && (
          <Check size={16} className="text-white animate-fade-in animate-[bounce_0.5s_ease-in-out] md:size-5" />
        )}
      </div>
      
      <div className="flex items-center">
        <div className="task-icon mr-2 transition-all duration-300 md:mr-3 md:scale-125">
          <CustomTaskIcon icon={icon} />
        </div>
        <span className={`task-title font-medium transition-all duration-300 md:text-lg ${themeTextClass} ${
          completed ? 'line-through text-gray-500' : ''
        }`}>{title}</span>
      </div>
      
      <div className="ml-auto flex items-center space-x-2">
        <div className="task-points flex items-center transition-all duration-300">
          <span className="task-points-star text-sm text-amber-400 mr-1 md:text-base">★</span>
          <span className="text-sm transition-colors duration-300 md:text-base text-gray-400 group-hover:text-amber-300">
            {points} poäng
          </span>
        </div>
        
        <button 
          className="task-action-button task-edit-button w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 md:w-10 md:h-10 text-gray-400 hover:text-white hover:bg-gray-700"
          onClick={() => onEdit(id)}
          aria-label="Redigera uppgift"
        >
          <Edit2 size={16} className="transition-all duration-300 md:size-5 group-hover:animate-pulse" />
        </button>
        
        <button 
          className="task-action-button task-delete-button w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 md:w-10 md:h-10 text-red-500 hover:text-white hover:bg-red-700"
          onClick={() => onDelete(id, title)}
          aria-label="Radera uppgift"
        >
          <Trash2 size={16} className="transition-all duration-300 md:size-5" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskItem);
