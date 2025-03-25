
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
    try {
      if (rewards.some(r => r.id === reward.id)) {
        setRewards(prev => prev.map(r => r.id === reward.id ? reward : r));
        toast.success('Belöning uppdaterad!');
      } else {
        setRewards(prev => [...prev, reward]);
        toast.success('Ny belöning tillagd!');
      }
    } catch (error) {
      console.error('Error in handleSaveReward:', error);
      toast.error('Ett fel uppstod när belöningen skulle sparas');
    }
  };

  const handleDeleteReward = (id: string) => {
    try {
      if (!id) {
        console.warn('Attempted to delete reward with undefined id');
        return;
      }
      
      const rewardExists = rewards.some(reward => reward.id === id);
      if (!rewardExists) {
        console.warn(`No reward found with id: ${id}`);
        return;
      }
      
      setRewards(prev => prev.filter(reward => reward.id !== id));
      toast.success('Belöning borttagen!');
    } catch (error) {
      console.error('Error in handleDeleteReward:', error);
      toast.error('Ett fel uppstod när belöningen skulle raderas');
    }
  };

  const handleRedeemReward = (id: string) => {
    try {
      const rewardToRedeem = rewards.find(reward => reward.id === id);
      
      if (!rewardToRedeem) {
        console.warn(`No reward found with id: ${id}`);
        toast.error('Belöningen hittades inte');
        return;
      }
      
      if (user.points < rewardToRedeem.points) {
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
    } catch (error) {
      console.error('Error in handleRedeemReward:', error);
      toast.error('Ett fel uppstod när belöningen skulle lösas in');
    }
  };

  return {
    handleSaveReward,
    handleRedeemReward,
    handleDeleteReward
  };
};
