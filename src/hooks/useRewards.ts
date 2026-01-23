
import { useState, useCallback } from 'react';
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
  const handleSaveReward = useCallback((reward: Reward) => {
    if (rewards.some(r => r.id === reward.id)) {
      setRewards(prev => prev.map(r => r.id === reward.id ? reward : r));
      toast.success('Belöning uppdaterad!');
    } else {
      setRewards(prev => [...prev, reward]);
      toast.success('Ny belöning tillagd!');
    }
  }, [rewards, setRewards]);

  const handleDeleteReward = useCallback((id: string) => {
    setRewards(prev => prev.filter(reward => reward.id !== id));
    toast.success('Belöning borttagen!');
  }, [setRewards]);

  const handleRedeemReward = useCallback((id: string) => {
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
    const rewardAchievement = achievements.find(achievement => achievement.id === '5');
    if (rewardAchievement && !rewardAchievement.completed) {
      const updatedAchievements = achievements.map(achievement =>
        achievement.id === '5' ? { ...achievement, completed: true } : achievement
      );
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
  }, [rewards, user.points, achievements, setUser, setAchievements]);

  return {
    handleSaveReward,
    handleRedeemReward,
    handleDeleteReward
  };
};
