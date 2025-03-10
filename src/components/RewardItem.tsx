
import React, { useState } from 'react';
import { Award, Gift, Gem, Ribbon, Star, Trophy, Edit2 } from 'lucide-react';
import { Reward } from './RewardsDialog';

interface RewardItemProps {
  reward: Reward;
  onRedeem: (id: string) => void;
  onEdit: (id: string) => void;
  userPoints: number;
  userTheme: 'pink' | 'blue';
}

const RewardItem: React.FC<RewardItemProps> = ({ 
  reward, 
  onRedeem, 
  onEdit,
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
      className: `text-white transition-all duration-300 ${isHovered ? 'scale-110' : ''}` 
    };
    
    switch (reward.icon) {
      case 'gift':
        return <Gift {...iconProps} />;
      case 'trophy':
        return <Trophy {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      case 'award':
        return <Award {...iconProps} />;
      case 'gem':
        return <Gem {...iconProps} />;
      case 'ribbon':
        return <Ribbon {...iconProps} />;
      default:
        return <Gift {...iconProps} />;
    }
  };

  return (
    <div 
      className={`glass-card p-4 mb-3 relative transition-all duration-300 ${
        isHovered ? 'shadow-lg transform translate-y-[-2px]' : 'hover:shadow-lg'
      } animate-fade-in`} 
      id={`reward-${reward.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`absolute right-3 top-3 cursor-pointer transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-60 hover:opacity-100'
        }`} 
        onClick={() => onEdit(reward.id)}
      >
        <Edit2 size={18} className={`text-gray-400 ${isHovered ? 'animate-pulse' : ''}`} />
      </div>
      
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-full ${bgColorClass} flex items-center justify-center mr-3 flex-shrink-0 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
          {renderIcon()}
        </div>
        
        <div className="flex-1">
          <h3 className={`font-semibold text-base ${isHovered ? textColorClass : ''}`}>{reward.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{reward.description}</p>
          
          <div className="flex justify-between items-center mt-3">
            <div className={`text-sm font-medium transition-all duration-200 ${isHovered ? 'scale-105' : ''}`}>
              <span className={`${textColorClass}`}>{reward.points}</span> poäng
            </div>
            
            <button
              onClick={() => canRedeem && onRedeem(reward.id)}
              className={`text-sm px-3 py-1 rounded-md transition-all duration-300 ${
                canRedeem 
                  ? `${bgColorClass} text-white hover:opacity-90 ${isHovered ? 'transform scale-105' : ''}`
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
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
