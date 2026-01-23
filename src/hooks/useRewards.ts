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
    setRewards(prev => {
      const rewardToRedeem = prev.find(reward => reward.id === id);
      
      if (!rewardToRedeem) {
        toast.error('Belöning hittades inte!');
        return prev;
      }
      
      // Check if user has enough points using the current user state
      setUser(prevUser => {
        if (prevUser.points < rewardToRedeem.points) {
          toast.error('Inte tillräckligt med poäng!');
          return prevUser;
        }
        
        // Deduct points
        const updatedUser = {
          ...prevUser,
          points: prevUser.points - rewardToRedeem.points
        };
        
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
            
            // Update user stars count
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
        
        toast.success(`Du har löst in "${rewardToRedeem.title}"!`);
        return updatedUser;
      });
      
      return prev;
    });
  }, [setRewards, setUser, setAchievements]);

  return {
    saveReward,
    redeemReward,
    deleteReward
  };
};
