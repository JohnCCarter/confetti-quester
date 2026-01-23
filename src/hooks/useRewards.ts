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
    if (rewards.some(existingReward => existingReward.id === reward.id)) {
      setRewards(prev => prev.map(existingReward => existingReward.id === reward.id ? reward : existingReward));
      toast.success('Belöning uppdaterad!');
    } else {
      setRewards(prev => [...prev, reward]);
      toast.success('Ny belöning tillagd!');
    }
  }, [rewards, setRewards]);

  const deleteReward = useCallback((id: string) => {
    setRewards(prev => prev.filter(reward => reward.id !== id));
    toast.success('Belöning borttagen!');
  }, [setRewards]);

  const redeemReward = useCallback((id: string) => {
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
    const rewardAchievementIndex = achievements.findIndex(
      achievement => achievement.id === '5'
    );
    if (
      rewardAchievementIndex >= 0 &&
      !achievements[rewardAchievementIndex].completed
    ) {
      const updatedAchievements = achievements.map((achievement, index) =>
        index === rewardAchievementIndex
          ? { ...achievement, completed: true }
          : achievement
      );
      setAchievements(updatedAchievements);
      
      // Update user stars count
      const completedCount = updatedAchievements.filter(achievement => achievement.completed).length;
      setUser(prev => ({
        ...prev,
        stars: completedCount
      }));
      
      toast.success('Ny prestation upplåst!', {
        duration: 3000
      });
    }
    
    toast.success(`Du har löst in "${rewardToRedeem.title}"!`);
  }, [rewards, user.points, achievements, setUser, setAchievements]);

  return {
    saveReward,
    redeemReward,
    deleteReward
  };
};
