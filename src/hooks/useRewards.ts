
import { useState } from 'react';
import { User } from '@/components/UserDialog';
import { Reward } from '@/components/RewardsDialog';
import { toast } from 'sonner';

export const useRewards = (
  rewards: Reward[],
  setRewards: React.Dispatch<React.SetStateAction<Reward[]>>,
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  achievements: any[],
  setAchievements: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const handleSaveReward = (reward: Reward) => {
    if (rewards.some(r => r.id === reward.id)) {
      setRewards(prev => prev.map(r => r.id === reward.id ? reward : r));
      toast.success('Belöning uppdaterad!');
    } else {
      setRewards(prev => [...prev, reward]);
      toast.success('Ny belöning tillagd!');
    }
  };

  const handleRedeemReward = (id: string) => {
    const rewardToRedeem = rewards.find(reward => reward.id === id);
    
    if (!rewardToRedeem || user.points < rewardToRedeem.points) {
      toast.error('Inte tillräckligt med poäng!');
      return;
    }
    
    setUser(prev => ({
      ...prev,
      points: prev.points - rewardToRedeem.points
    }));
    
    // Mark "Belönad" achievement as completed if it's the first time
    if (!achievements[4].completed) {
      const updatedAchievements = [...achievements];
      updatedAchievements[4].completed = true;
      setAchievements(updatedAchievements);
      
      // Update user stars count
      const completedCount = updatedAchievements.filter(a => a.completed).length;
      setUser(prev => ({
        ...prev,
        stars: completedCount
      }));
      
      toast.success('Ny prestation upplåst!', {
        duration: 3000
      });
    }
    
    toast.success(`Du har löst in "${rewardToRedeem.title}"!`);
  };

  return {
    handleSaveReward,
    handleRedeemReward
  };
};
