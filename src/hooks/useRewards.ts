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
    // Use a ref-like variable to track the reward across state updates
    let rewardPoints = 0;
    let rewardTitle = '';
    let hasEnoughPoints = false;
    
    // First, check if user has enough points and get reward info
    setUser(prevUser => {
      setRewards(prevRewards => {
        const rewardToRedeem = prevRewards.find(reward => reward.id === id);
        
        if (!rewardToRedeem) {
          toast.error('Belöning hittades inte!');
          return prevRewards;
        }
        
        rewardPoints = rewardToRedeem.points;
        rewardTitle = rewardToRedeem.title;
        hasEnoughPoints = prevUser.points >= rewardPoints;
        
        return prevRewards;
      });
      
      if (!hasEnoughPoints) {
        toast.error('Inte tillräckligt med poäng!');
        return prevUser;
      }
      
      return {
        ...prevUser,
        points: prevUser.points - rewardPoints
      };
    });
    
    // Early return if validation failed
    if (!hasEnoughPoints) {
      return;
    }
    
    // Mark "Belönad" achievement as completed if it's the first time
    setAchievements(prevAchievements => {
      const rewardAchievementIndex = prevAchievements.findIndex(
        achievement => achievement.id === '5'
      );
      
      if (
        rewardAchievementIndex >= 0 &&
        !prevAchievements[rewardAchievementIndex].completed
      ) {
        const updatedAchievements = prevAchievements.map((achievement, index) =>
          index === rewardAchievementIndex
            ? { ...achievement, completed: true }
            : achievement
        );
        
        // Update user stars count based on completed achievements
        const completedCount = updatedAchievements.filter(achievement => achievement.completed).length;
        setUser(prevUser => ({
          ...prevUser,
          stars: completedCount
        }));
        
        toast.success('Ny prestation upplåst!', {
          duration: 3000
        });
        
        return updatedAchievements;
      }
      
      return prevAchievements;
    });
    
    toast.success(`Du har löst in "${rewardTitle}"!`);
  }, [setRewards, setUser, setAchievements]);

  return {
    saveReward,
    redeemReward,
    deleteReward
  };
};
