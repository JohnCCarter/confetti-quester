
import React, { useState, useEffect } from 'react';
import RewardsDialog, { Reward } from '@/components/RewardsDialog';

interface RewardManagerProps {
  onSaveReward: (reward: Reward) => void;
}

// Static methods for opening dialogs from anywhere
let openAddRewardDialogFn: () => void = () => {};
let openEditRewardDialogFn: (id: string, rewards: Reward[]) => void = () => {};

const RewardManager: React.FC<RewardManagerProps> = ({ onSaveReward }) => {
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | undefined>(undefined);
  
  // Register the static methods
  useEffect(() => {
    RewardManager.openAddRewardDialog = () => {
      setCurrentReward(undefined);
      setRewardDialogOpen(true);
    };
    
    RewardManager.openEditRewardDialog = (id: string, rewards: Reward[]) => {
      const rewardToEdit = rewards.find(reward => reward.id === id);
      if (rewardToEdit) {
        setCurrentReward(rewardToEdit);
        setRewardDialogOpen(true);
      }
    };
    
    return () => {
      RewardManager.openAddRewardDialog = () => {};
      RewardManager.openEditRewardDialog = () => {};
    };
  }, []);
  
  return (
    <RewardsDialog
      open={rewardDialogOpen}
      onClose={() => setRewardDialogOpen(false)}
      onSave={onSaveReward}
      reward={currentReward}
      isEditing={!!currentReward}
    />
  );
};

// Static methods
RewardManager.openAddRewardDialog = () => openAddRewardDialogFn();
RewardManager.openEditRewardDialog = (id: string, rewards: Reward[]) => openEditRewardDialogFn(id, rewards);

export default RewardManager;
