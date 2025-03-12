
import React, { useState } from 'react';
import { Check, Edit2 } from 'lucide-react';
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

  return (
    <div 
      className={`task-item ${completed ? 'completed' : ''} transform transition-all duration-300 ${
        isHovered ? 'scale-[1.02] shadow-md' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 cursor-pointer transition-all duration-300 
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
          <Check size={16} className="text-white animate-fade-in animate-[bounce_0.5s_ease-in-out]" />
        )}
      </div>
      
      <div className="flex items-center">
        <div className={`mr-2 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
          <CustomTaskIcon icon={icon} isHovered={isHovered} />
        </div>
        <span className={`font-medium transition-all duration-300 ${
          completed 
            ? 'line-through text-gray-500' 
            : isHovered 
              ? userTheme === 'pink' ? 'text-app-pink scale-105' : 'text-app-blue scale-105' 
              : ''
        }`}>{title}</span>
      </div>
      
      <div className="ml-auto flex items-center space-x-3">
        <div className={`flex items-center transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
          <span className={`text-sm text-amber-400 mr-1 ${isHovered ? 'animate-pulse' : ''}`}>★</span>
          <span className={`text-sm transition-colors duration-300 ${isHovered ? 'text-amber-300' : 'text-gray-400'}`}>
            {points} poäng
          </span>
        </div>
        
        <button 
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered 
              ? 'text-white bg-gray-700 scale-110' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => onEdit(id)}
        >
          <Edit2 size={16} className={`transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
