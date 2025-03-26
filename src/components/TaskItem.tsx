
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
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
  const [isHovered, setIsHovered] = useState(false);

  const handleComplete = () => {
    if (completed) return;
    
    setIsChecking(true);
    setTimeout(() => {
      onComplete(id);
      setIsChecking(false);
    }, 300);
  };

  const handleEdit = () => {
    onEdit(id);
  };

  return (
    <div 
      className={`task-item ${completed ? 'completed' : ''} transform transition-all duration-300 md:p-4 md:rounded-xl
        ${isHovered ? 'scale-[1.02] shadow-md' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`task-${id}`}
    >
      <div 
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 cursor-pointer transition-all duration-300 md:w-10 md:h-10 md:mr-4
          ${completed 
            ? 'border-app-green bg-app-green' 
            : isChecking 
              ? 'border-app-green animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]' 
              : isHovered
                ? 'border-gray-400 scale-125 rotate-3'
                : 'border-gray-600'}`}
        onClick={handleComplete}
      >
        {completed && (
          <Check size={16} className="text-white animate-fade-in animate-[bounce_0.5s_ease-in-out] md:size-5" />
        )}
      </div>
      
      <div className="flex items-center">
        <div className={`mr-2 transition-all duration-300 md:mr-3 md:scale-125 ${isHovered ? 'scale-110' : ''}`}>
          <CustomTaskIcon icon={icon} isHovered={isHovered} />
        </div>
        <span className={`font-medium transition-all duration-300 md:text-lg ${
          completed 
            ? 'line-through text-gray-500' 
            : isHovered 
              ? userTheme === 'pink' ? 'text-app-pink scale-105' : 'text-app-blue scale-105' 
              : ''
        }`}>{title}</span>
      </div>
      
      <div className="ml-auto flex items-center space-x-2">
        <div className={`flex items-center transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
          <span className={`text-sm text-amber-400 mr-1 md:text-base ${isHovered ? 'animate-pulse' : ''}`}>★</span>
          <span className={`text-sm transition-colors duration-300 md:text-base ${isHovered ? 'text-amber-300' : 'text-gray-400'}`}>
            {points} poäng
          </span>
        </div>
        
        <button 
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 md:w-10 md:h-10 ${
            isHovered 
              ? 'text-white bg-gray-700 scale-110' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={handleEdit}
          aria-label="Redigera uppgift"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:size-5">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
