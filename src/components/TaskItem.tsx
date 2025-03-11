
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
      className={`task-item ${completed ? 'completed' : ''} transform transition-transform duration-200 ${isHovered ? 'scale-[1.01]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 cursor-pointer transition-all duration-300 
          ${completed 
            ? 'border-app-green bg-app-green' 
            : isChecking 
              ? 'border-app-green animate-pulse' 
              : isHovered
                ? 'border-gray-400 scale-110'
                : 'border-gray-600'}`}
        onClick={handleComplete}
      >
        {completed && <Check size={16} className="text-white animate-fade-in" />}
      </div>
      
      <div className="flex items-center">
        <div className="mr-2">
          <CustomTaskIcon icon={icon} isHovered={isHovered} />
        </div>
        <span className={`font-medium transition-all duration-200 ${completed ? 'line-through text-gray-500' : isHovered ? userTheme === 'pink' ? 'text-app-pink' : 'text-app-blue' : ''}`}>{title}</span>
      </div>
      
      <div className="ml-auto flex items-center space-x-3">
        <div className={`flex items-center transition-all duration-200 ${isHovered ? 'scale-110' : ''}`}>
          <span className="text-sm text-amber-400 mr-1">★</span>
          <span className="text-sm text-gray-400">{points} poäng</span>
        </div>
        
        <button 
          className={`w-8 h-8 rounded-full flex items-center justify-center text-gray-400 transition-colors duration-200 ${
            isHovered ? 'text-white bg-gray-700' : 'hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => onEdit(id)}
        >
          <Edit2 size={16} className={isHovered ? 'animate-pulse' : ''} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
