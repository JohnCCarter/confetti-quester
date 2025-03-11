
import React, { useState, useEffect } from 'react';
import RewardsDialog, { Reward } from '@/components/RewardsDialog';

interface RewardManagerProps {
  onSaveReward: (reward: Reward) => void;
}

// Skapa en typ som inkluderar statiska egenskaper
interface RewardManagerComponent extends React.FC<RewardManagerProps> {
  openAddRewardDialog: () => void;
  openEditRewardDialog: (id: string, rewards: Reward[]) => void;
}

// Static methods for opening dialogs from anywhere
let openAddRewardDialogFn: () => void = () => {};
let openEditRewardDialogFn: (id: string, rewards: Reward[]) => void = () => {};

const RewardManager: React.FC<RewardManagerProps> = ({ onSaveReward }) => {
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | undefined>(undefined);
  
  // Register the static methods
  useEffect(() => {
    openAddRewardDialogFn = () => {
      setCurrentReward(undefined);
      setRewardDialogOpen(true);
    };
    
    openEditRewardDialogFn = (id: string, rewards: Reward[]) => {
      const rewardToEdit = rewards.find(reward => reward.id === id);
      if (rewardToEdit) {
        setCurrentReward(rewardToEdit);
        setRewardDialogOpen(true);
      }
    };
    
    return () => {
      openAddRewardDialogFn = () => {};
      openEditRewardDialogFn = () => {};
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

// Definiera statiska metoder
(RewardManager as RewardManagerComponent).openAddRewardDialog = () => openAddRewardDialogFn();
(RewardManager as RewardManagerComponent).openEditRewardDialog = (id: string, rewards: Reward[]) => openEditRewardDialogFn(id, rewards);

export default RewardManager as RewardManagerComponent;
