import React from 'react';
import { Lock } from 'lucide-react';
import { CustomTaskIcon } from './icons';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon?: React.ReactNode;
  iconType?: string;
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
  
  const titleColorClass = achievement.completed 
    ? (userTheme === 'pink' ? 'text-app-pink' : 'text-app-blue')
    : '';
  
  // Determine which icon to show based on the achievement title
  const getAchievementIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'morgonmästare':
        return 'morning-master';
      case 'kvällsprinsessan':
        return 'evening-princess';
      case 'kvällsprinsen':
        return 'evening-prince';
      case 'på gång!':
        return 'on-track';
      case 'superstjärna':
        return 'superstar';
      case 'belönad':
        return 'rewarded';
      default:
        return achievement.iconType || 'morning-master';
    }
  };

  const iconType = getAchievementIcon(achievement.title);
  
  return (
    <div 
      className="achievement-item group glass-card p-4 mb-3 relative transition-all duration-300 shadow hover:shadow-lg animate-fade-in"
    >
      <div className="flex items-start">
        <div className={`achievement-icon w-10 h-10 rounded-full ${bgColor} flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300`}>
          {achievement.completed ? (
            achievement.icon || <CustomTaskIcon icon={iconType} size={20} />
          ) : (
            <Lock size={20} className="text-white opacity-50 group-hover:animate-[pulse_1.5s_ease-in-out_infinite]" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className={`achievement-title font-semibold text-base transition-all duration-300 ${titleColorClass}`}>
            {achievement.title}
          </h3>
          <p className="achievement-description text-sm text-gray-400 mt-1 transition-all duration-300">
            {achievement.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AchievementItem);
