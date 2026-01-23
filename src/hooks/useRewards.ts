import { useState, useCallback } from 'react';
import { User } from '@/components/UserDialog';
import { Reward } from '@/components/RewardsDialog';
import { Achievement } from '@/components/AchievementItem';
import { toast } from 'sonner';

export const useRewards = (
  rewards: Reward[],
  setRewards: React.Dispatch<React.SetStateAction<Reward[]>>,
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  achievements: Achievement[],
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>
) => {
  const saveReward = useCallback((reward: Reward) => {
    setRewards(prev => {
      const rewardExists = prev.some(existingReward => existingReward.id === reward.id);
      if (rewardExists) {
        toast.success('Belöning uppdaterad!');
        return prev.map(existingReward => existingReward.id === reward.id ? reward : existingReward);
      } else {
        toast.success('Ny belöning tillagd!');
        return [...prev, reward];
      }
    });
  }, [setRewards]);

  const deleteReward = useCallback((id: string) => {
    setRewards(prev => prev.filter(reward => reward.id !== id));
    toast.success('Belöning borttagen!');
  }, [setRewards]);

  const redeemReward = useCallback((id: string) => {
    // Track reward data across batched state updates
    // React 18 batches these updates, so they happen synchronously
    let rewardPoints = 0;
    let rewardTitle = '';
    let hasEnoughPoints = false;
    
    // Validate user has enough points and get reward info
    setUser(prevUser => {
      setRewards(prevRewards => {
        const rewardToRedeem = prevRewards.find(reward => reward.id === id);
        
        if (!rewardToRedeem) {
          toast.error('Belöning hittades inte!');
          return prevRewards;
        }
        
        // Store reward data for later use
        rewardPoints = rewardToRedeem.points;
        rewardTitle = rewardToRedeem.title;
        hasEnoughPoints = prevUser.points >= rewardPoints;
        
        return prevRewards;
      });
      
      // Deduct points if validation passed
      if (!hasEnoughPoints) {
        toast.error('Inte tillräckligt med poäng!');
        return prevUser;
      }
      
      return {
        ...prevUser,
        points: prevUser.points - rewardPoints
      };
    });
    
    // Exit early if validation failed
    if (!hasEnoughPoints) {
      return;
    }
    
    // Update "Belönad" achievement if this is the first redemption
    setAchievements(prevAchievements => {
      const rewardAchievementIndex = prevAchievements.findIndex(
        achievement => achievement.id === '5'
      );
      
      // Early return if achievement doesn't exist or is already completed
      if (rewardAchievementIndex < 0 || prevAchievements[rewardAchievementIndex].completed) {
        return prevAchievements;
      }
      
      // Mark achievement as completed
      const updatedAchievements = prevAchievements.map((achievement, index) =>
        index === rewardAchievementIndex
          ? { ...achievement, completed: true }
          : achievement
      );
      
      // Update user stars based on total completed achievements
      const completedCount = updatedAchievements.filter(achievement => achievement.completed).length;
      setUser(prevUser => ({
        ...prevUser,
        stars: completedCount
      }));
      
      toast.success('Ny prestation upplåst!', {
        duration: 3000
      });
      
      return updatedAchievements;
    });
    
    toast.success(`Du har löst in "${rewardTitle}"!`);
  }, [setRewards, setUser, setAchievements]);

  return {
    saveReward,
    redeemReward,
    deleteReward
  };
};
