
import React, { useState, useMemo } from 'react';
import { Gift, Plus } from 'lucide-react';
import { Reward } from './RewardsDialog';
import SectionHeader from './SectionHeader';
import RewardItem from './RewardItem';

interface RewardsSectionProps {
  rewards: Reward[];
  userPoints: number;
  onAddReward: () => void;
  onRedeemReward: (id: string) => void;
  onEditReward: (id: string) => void;
  onDeleteReward: (id: string, title: string) => void;
  userTheme: 'pink' | 'blue';
}

// Create a cache of precomputed animation styles for common indices (0-99)
// This avoids creating new style objects on every render
const ANIMATION_STYLE_CACHE = new Map<number, React.CSSProperties>();
for (let i = 0; i < 100; i++) {
  ANIMATION_STYLE_CACHE.set(i, {
    animationDelay: `${i * 100}ms`,
    animation: 'fade-in 0.5s ease-out forwards'
  });
}

const getAnimationStyle = (index: number): React.CSSProperties => {
  // Use cached style if available, otherwise create new one
  const cached = ANIMATION_STYLE_CACHE.get(index);
  if (cached) return cached;
  
  return {
    animationDelay: `${index * 100}ms`,
    animation: 'fade-in 0.5s ease-out forwards'
  };
};

const RewardsSection: React.FC<RewardsSectionProps> = ({
  rewards,
  userPoints,
  onAddReward,
  onRedeemReward,
  onEditReward,
  onDeleteReward,
  userTheme
}) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // Memoize button background class to avoid recalculation
  const buttonBgClass = useMemo(() => 
    userTheme === 'pink' ? 'bg-app-pink' : 'bg-app-blue',
    [userTheme]
  );

  return (
    <div className="mb-8">
      <SectionHeader 
        icon={<Gift size={20} className="animate-pulse-scale" />} 
        title="Belöningar" 
        userTheme={userTheme}
      >
        <div className="space-y-2">
          {rewards.length > 0 ? (
            rewards.map((reward, index) => (
              <div 
                key={reward.id}
                className="transition-all duration-300"
                style={getAnimationStyle(index)}
              >
                <RewardItem 
                  reward={reward} 
                  onRedeem={onRedeemReward}
                  onEdit={onEditReward}
                  onDelete={onDeleteReward}
                  userPoints={userPoints}
                  userTheme={userTheme}
                />
              </div>
            ))
          ) : (
            <div className="glass-card p-4 text-center text-gray-400 hover:shadow-lg transition-all duration-300">
              Inga belöningar än. Lägg till din första belöning!
            </div>
          )}
          
          <button
            onClick={onAddReward}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className={`w-full mt-4 ${buttonBgClass} text-white py-2 rounded-md flex items-center justify-center transition-all duration-300 ${
              isButtonHovered ? 'transform scale-[1.02] shadow-md' : 'hover:opacity-90'
            }`}
          >
            <Plus size={18} className={`mr-1 transition-transform duration-300 ${isButtonHovered ? 'rotate-90' : ''}`} />
            Lägg till belöning
          </button>
        </div>
      </SectionHeader>
    </div>
  );
};

export default React.memo(RewardsSection);
