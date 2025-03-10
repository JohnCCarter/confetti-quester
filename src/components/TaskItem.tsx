
import React, { useState } from 'react';
import { Check, Edit2, Shirt, Bed, Coffee, Droplet, Home, Book, Heart, Pencil, Moon, Scissors, Utensils, Smile } from 'lucide-react';
import { toast } from 'sonner';

export interface TaskProps {
  id: string;
  title: string;
  icon: 'shirt' | 'bed' | 'coffee' | 'droplet' | 'home' | 'book' | 'heart' | 'pencil' | 'moon' | 'scissors' | 'utensils' | 'smile' | string;
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

  const handleComplete = () => {
    if (completed) return;
    
    setIsChecking(true);
    setTimeout(() => {
      onComplete(id);
      setIsChecking(false);
    }, 300);
  };

  const getIcon = () => {
    switch (icon) {
      case 'shirt':
        return <Shirt size={20} className="text-blue-400" />;
      case 'bed':
        return <Bed size={20} className="text-indigo-400" />;
      case 'coffee':
        return <Coffee size={20} className="text-amber-400" />;
      case 'droplet':
        return <Droplet size={20} className="text-blue-400" />;
      case 'home':
        return <Home size={20} className="text-green-400" />;
      case 'book':
        return <Book size={20} className="text-purple-400" />;
      case 'heart':
        return <Heart size={20} className="text-red-400" />;
      case 'pencil':
        return <Pencil size={20} className="text-yellow-400" />;
      case 'moon':
        return <Moon size={20} className="text-indigo-400" />;
      case 'scissors':
        return <Scissors size={20} className="text-purple-400" />;
      case 'utensils':
        return <Utensils size={20} className="text-orange-400" />;
      case 'smile':
        return <Smile size={20} className="text-yellow-400" />;
      default:
        return <Coffee size={20} className="text-amber-400" />;
    }
  };

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <div 
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 cursor-pointer transition-all duration-300 
          ${completed 
            ? 'border-app-green bg-app-green' 
            : isChecking 
              ? 'border-app-green' 
              : 'border-gray-600 hover:border-gray-400'}`}
        onClick={handleComplete}
      >
        {completed && <Check size={16} className="text-white" />}
      </div>
      
      <div className="flex items-center">
        <div className="mr-2">{getIcon()}</div>
        <span className={`font-medium ${completed ? 'line-through text-gray-500' : ''}`}>{title}</span>
      </div>
      
      <div className="ml-auto flex items-center space-x-3">
        <div className="flex items-center">
          <span className="text-sm text-amber-400 mr-1">★</span>
          <span className="text-sm text-gray-400">{points} poäng</span>
        </div>
        
        <button 
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          onClick={() => onEdit(id)}
        >
          <Edit2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
