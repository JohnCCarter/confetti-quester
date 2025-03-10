
import React from 'react';
import { User, Trophy, Edit2 } from 'lucide-react';

interface UserCardProps {
  name: string;
  points: number;
  completedTasks: number;
  stars: number;
  onEdit?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  name, 
  points, 
  completedTasks, 
  stars,
  onEdit 
}) => {
  return (
    <div className="glass-card p-4 mb-6 relative animate-fade-in">
      <div className="absolute right-4 top-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={onEdit}>
        <Edit2 size={18} className="text-gray-400" />
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-app-pink flex items-center justify-center">
          <User size={24} className="text-white" />
        </div>
        <div className="ml-3 flex flex-col">
          <h2 className="font-semibold text-lg">{name}</h2>
          <div className="text-sm text-gray-400">Samla fler för belöningar</div>
        </div>
        <div className="ml-auto">
          <div className="badge-point animate-pulse-scale">
            {points}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-start">
        <Trophy size={16} className="text-app-pink mr-1" />
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xl ${i < stars ? 'text-app-pink' : 'text-gray-600'}`}>
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
