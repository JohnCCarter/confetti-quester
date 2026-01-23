import React from 'react';
import { User, Trophy, Edit2 } from 'lucide-react';

interface UserCardProps {
  name: string;
  points: number;
  completedTasks: number;
  stars: number;
  onEdit?: () => void;
  userTheme?: 'pink' | 'blue';
}

const UserCard: React.FC<UserCardProps> = ({ 
  name, 
  points, 
  completedTasks, 
  stars,
  onEdit,
  userTheme = 'pink'
}) => {
  const bgColorClass = userTheme === 'pink' ? 'bg-app-pink' : 'bg-app-blue';
  const starColorClass = userTheme === 'pink' ? 'text-app-pink' : 'text-app-blue';
  const hoverTextClass = userTheme === 'pink' ? 'group-hover:text-app-pink' : 'group-hover:text-app-blue';

  return (
    <div 
      className="user-card group glass-card p-4 mb-6 relative transition-all duration-300 hover:shadow-lg animate-fade-in"
    >
      <div 
        className="user-edit-icon absolute right-4 top-4 cursor-pointer transition-opacity duration-200 opacity-60 hover:opacity-100" 
        onClick={onEdit}
      >
        <Edit2 size={18} className="text-gray-400" />
      </div>
      
      <div className="flex items-center mb-4">
        <div className={`user-avatar w-12 h-12 rounded-full ${bgColorClass} flex items-center justify-center transition-transform duration-300`}>
          <User size={24} className="text-white" />
        </div>
        <div className="ml-3 flex flex-col">
          <h2 className={`font-semibold text-lg ${hoverTextClass}`}>{name}</h2>
          <div className="text-sm text-gray-400">Samla fler för belöningar</div>
        </div>
        <div className="ml-auto">
          <div className={`user-badge badge-point animate-pulse-scale transition-transform duration-300 ${userTheme === 'blue' ? 'bg-app-blue' : ''}`}>
            {points}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-start">
        <Trophy size={16} className={`${starColorClass} mr-1 transition-transform duration-300 user-star`} />
        <div className="flex space-x-1">
          {[...Array(5)].map((_, starIndex) => (
            <span 
              key={starIndex} 
              className={`user-star text-xl transition-transform duration-300 ${
                starIndex < stars 
                  ? starColorClass 
                  : 'text-gray-600'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserCard);
