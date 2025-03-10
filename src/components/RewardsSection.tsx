
import React from 'react';
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
  userTheme: 'pink' | 'blue';
}

const RewardsSection: React.FC<RewardsSectionProps> = ({
  rewards,
  userPoints,
  onAddReward,
  onRedeemReward,
  onEditReward,
  userTheme
}) => {
  const buttonBgClass = userTheme === 'pink' ? 'bg-app-pink' : 'bg-app-blue';

  return (
    <div className="mb-8">
      <SectionHeader 
        icon={<Gift size={20} />} 
        title="Belöningar" 
        userTheme={userTheme}
      >
        <div className="space-y-2">
          {rewards.length > 0 ? (
            rewards.map((reward) => (
              <RewardItem 
                key={reward.id} 
                reward={reward} 
                onRedeem={onRedeemReward}
                onEdit={onEditReward}
                userPoints={userPoints}
                userTheme={userTheme}
              />
            ))
          ) : (
            <div className="glass-card p-4 text-center text-gray-400">
              Inga belöningar än. Lägg till din första belöning!
            </div>
          )}
          
          <button
            onClick={onAddReward}
            className={`w-full mt-4 ${buttonBgClass} text-white py-2 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity`}
          >
            <Plus size={18} className="mr-1" />
            Lägg till belöning
          </button>
        </div>
      </SectionHeader>
    </div>
  );
};

export default RewardsSection;
