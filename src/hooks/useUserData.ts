
import { useState, useEffect } from 'react';
import { User } from '@/components/UserDialog';
import { Task } from '@/components/TaskDialog';
import { Achievement } from '@/components/AchievementItem';
import { Reward } from '@/components/RewardsDialog';
import { toast } from 'sonner';
import { useLocalStorage } from './useLocalStorage';
import { isabelTasks, zozoTasks } from '@/data/tasks';
import { defaultIsabelAchievements, defaultZozoAchievements, defaultUser, alternateUser } from './useUserConstants';
import { defaultRewards } from './useUserConstants';

export const useUserData = () => {
  const [user, setUser] = useLocalStorage<User>('user', defaultUser);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', isabelTasks);
  const [rewards, setRewards] = useLocalStorage<Reward[]>('rewards', defaultRewards);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('achievements', defaultIsabelAchievements);

  const handleSaveUser = (updatedUser: User) => {
    setUser(updatedUser);
    toast.success('Användarinformation uppdaterad!');
  };

  const handleSwitchUser = () => {
    if (user.id === defaultUser.id) {
      // Switching to Zozo
      localStorage.setItem('isabel', JSON.stringify(user));
      localStorage.setItem('isabelTasks', JSON.stringify(tasks));
      localStorage.setItem('isabelRewards', JSON.stringify(rewards));
      localStorage.setItem('isabelAchievements', JSON.stringify(achievements));
      
      const savedZozo = localStorage.getItem('zozo');
      const savedZozoTasks = localStorage.getItem('zozoTasks');
      const savedZozoRewards = localStorage.getItem('zozoRewards');
      const savedZozoAchievements = localStorage.getItem('zozoAchievements');
      
      setUser(savedZozo ? JSON.parse(savedZozo) : alternateUser);
      setTasks(savedZozoTasks ? JSON.parse(savedZozoTasks) : zozoTasks);
      setRewards(savedZozoRewards ? JSON.parse(savedZozoRewards) : defaultRewards);
      setAchievements(savedZozoAchievements ? JSON.parse(savedZozoAchievements) : defaultZozoAchievements);
    } else {
      // Switching to Isabel
      localStorage.setItem('zozo', JSON.stringify(user));
      localStorage.setItem('zozoTasks', JSON.stringify(tasks));
      localStorage.setItem('zozoRewards', JSON.stringify(rewards));
      localStorage.setItem('zozoAchievements', JSON.stringify(achievements));
      
      const savedIsabel = localStorage.getItem('isabel');
      const savedIsabelTasks = localStorage.getItem('isabelTasks');
      const savedIsabelRewards = localStorage.getItem('isabelRewards');
      const savedIsabelAchievements = localStorage.getItem('isabelAchievements');
      
      setUser(savedIsabel ? JSON.parse(savedIsabel) : defaultUser);
      setTasks(savedIsabelTasks ? JSON.parse(savedIsabelTasks) : isabelTasks);
      setRewards(savedIsabelRewards ? JSON.parse(savedIsabelRewards) : defaultRewards);
      setAchievements(savedIsabelAchievements ? JSON.parse(savedIsabelAchievements) : defaultIsabelAchievements);
    }
  };

  return {
    user,
    setUser,
    tasks,
    setTasks,
    rewards,
    setRewards,
    achievements,
    setAchievements,
    handleSaveUser,
    handleSwitchUser,
    isIsabel: user.id === defaultUser.id
  };
};
