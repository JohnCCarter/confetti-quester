
import React, { useState } from 'react';
import { Award, Gift, Gem, Ribbon, Star, Trophy, Edit2, Trash2 } from 'lucide-react';
import { Reward } from './RewardsDialog';

interface RewardItemProps {
  reward: Reward;
  onRedeem: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  userPoints: number;
  userTheme: 'pink' | 'blue';
}

const RewardItem: React.FC<RewardItemProps> = ({ 
  reward, 
  onRedeem, 
  onEdit,
  onDelete,
  userPoints,
  userTheme
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const canRedeem = userPoints >= reward.points;
  const textColorClass = userTheme === 'pink' ? 'text-app-pink' : 'text-app-blue';
  const bgColorClass = userTheme === 'pink' ? 'bg-app-pink' : 'bg-app-blue';

  const renderIcon = () => {
    const iconProps = { 
      size: 20, 
      className: `text-white transition-all duration-300 ${isHovered ? 'scale-125' : ''}` 
    };
    
    switch (reward.icon) {
      case 'gift':
        return (
          <div className="relative">
            <Gift {...iconProps} className={isHovered ? 'animate-bounce' : ''} />
            <span className={`absolute -top-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-pulse' : ''}`}>🎁</span>
          </div>
        );
      case 'trophy':
        return (
          <div className="relative">
            <Trophy {...iconProps} className={isHovered ? 'animate-pulse' : ''} />
            <span className={`absolute -top-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>🏆</span>
          </div>
        );
      case 'star':
        return (
          <div className="relative">
            <Star {...iconProps} className={isHovered ? 'rotate-45 transition-transform duration-700' : ''} />
            <span className={`absolute -top-1 -right-1 text-yellow-400 text-xs transition-all duration-300 ${isHovered ? 'scale-125 animate-pulse' : ''}`}>✨</span>
          </div>
        );
      case 'award':
        return (
          <div className="relative">
            <Award {...iconProps} className={isHovered ? 'animate-pulse' : ''} />
            <span className={`absolute -bottom-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>🍦</span>
          </div>
        );
      case 'gem':
        return (
          <div className="relative">
            <Gem {...iconProps} className={isHovered ? 'animate-pulse' : ''} />
            <span className={`absolute -top-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-pulse' : ''}`}>💎</span>
          </div>
        );
      case 'ribbon':
        return (
          <div className="relative">
            <Ribbon {...iconProps} className={isHovered ? 'rotate-6 transition-transform duration-300' : ''} />
            <span className={`absolute -top-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>🎀</span>
          </div>
        );
      default:
        return (
          <div className="relative">
            <Gift {...iconProps} className={isHovered ? 'animate-bounce' : ''} />
            <span className={`absolute -top-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-pulse' : ''}`}>🎁</span>
          </div>
        );
    }
  };

  return (
    <div 
      className={`glass-card p-4 mb-3 relative transition-all duration-300 ${
        isHovered ? 'shadow-lg transform translate-y-[-4px] scale-[1.02]' : 'hover:shadow-lg'
      } animate-fade-in`} 
      id={`reward-${reward.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute right-3 top-3 flex gap-2">
        <button 
          className={`cursor-pointer transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-60 hover:opacity-100'
          }`} 
          onClick={() => onEdit(reward.id)}
          aria-label="Redigera belöning"
        >
          <Edit2 size={18} className={`text-gray-400 transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
        </button>
        <button 
          className={`cursor-pointer transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-60 hover:opacity-100'
          }`} 
          onClick={() => onDelete(reward.id, reward.title)}
          aria-label="Radera belöning"
        >
          <Trash2 size={18} className="text-red-500 hover:text-red-600 transition-all duration-300" />
        </button>
      </div>
      
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-full ${bgColorClass} flex items-center justify-center mr-3 flex-shrink-0 transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
          {renderIcon()}
        </div>
        
        <div className="flex-1">
          <h3 className={`font-semibold text-base transition-all duration-300 ${isHovered ? `${textColorClass} scale-105` : ''}`}>
            {reward.title}
          </h3>
          <p className={`text-sm mt-1 transition-all duration-300 ${isHovered ? 'text-gray-300' : 'text-gray-400'}`}>
            {reward.description}
          </p>
          
          <div className="flex justify-between items-center mt-3">
            <div className={`text-sm font-medium transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
              <span className={`${textColorClass} ${isHovered ? 'animate-pulse' : ''}`}>{reward.points}</span> poäng
            </div>
            
            <button
              onClick={() => canRedeem && onRedeem(reward.id)}
              className={`text-sm px-3 py-1 rounded-md transition-all duration-300 ${
                canRedeem 
                  ? `${bgColorClass} text-white hover:opacity-90 ${isHovered ? 'transform scale-110 shadow-md' : ''}`
                  : `bg-gray-700 text-gray-400 cursor-not-allowed ${isHovered ? 'shake' : ''}`
              }`}
              disabled={!canRedeem}
            >
              {canRedeem ? 'Lös in' : 'Inte tillräckligt med poäng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardItem;
