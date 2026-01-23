
import React, { useState, useMemo } from 'react';
import { Gift, Plus } from 'lucide-react';
import { Reward } from './RewardsDialog';
import SectionHeader from './SectionHeader';
import RewardItem from './RewardItem';
import { createAnimationStyleCache } from '@/lib/animationUtils';

interface RewardsSectionProps {
  rewards: Reward[];
  userPoints: number;
  onAddReward: () => void;
  onRedeemReward: (id: string) => void;
  onEditReward: (id: string) => void;
  onDeleteReward: (id: string, title: string) => void;
  userTheme: 'pink' | 'blue';
}

// Create cached animation style getter for reward list animations (100ms delay, 0.5s duration)
const getAnimationStyle = createAnimationStyleCache(100, '0.5s');

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
