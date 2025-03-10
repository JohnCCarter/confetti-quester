
import React from 'react';
import { Lock, Check } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon?: React.ReactNode;
}

interface AchievementItemProps {
  achievement: Achievement;
  userTheme: 'pink' | 'blue';
}

const AchievementItem: React.FC<AchievementItemProps> = ({ 
  achievement,
  userTheme
}) => {
  const bgColor = achievement.completed 
    ? userTheme === 'pink' ? 'bg-app-pink' : 'bg-app-blue' 
    : 'bg-gray-700';
  
  return (
    <div className="glass-card p-4 mb-3 relative hover:shadow-lg transition-shadow animate-fade-in">
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center mr-3 flex-shrink-0`}>
          {achievement.completed ? (
            achievement.icon || <Check size={20} className="text-white" />
          ) : (
            <Lock size={20} className="text-white opacity-50" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-base">{achievement.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementItem;
