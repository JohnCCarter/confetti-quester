
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

const loadUserData = <T,>(key: string, fallback: T) => {
  const stored = localStorage.getItem(key);
  return stored ? (JSON.parse(stored) as T) : fallback;
};

const saveUserData = (
  prefix: string,
  currentUser: User,
  currentTasks: Task[],
  currentRewards: Reward[],
  currentAchievements: Achievement[]
) => {
  localStorage.setItem(prefix, JSON.stringify(currentUser));
  localStorage.setItem(`${prefix}Tasks`, JSON.stringify(currentTasks));
  localStorage.setItem(`${prefix}Rewards`, JSON.stringify(currentRewards));
  localStorage.setItem(`${prefix}Achievements`, JSON.stringify(currentAchievements));
};

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
      saveUserData('isabel', user, tasks, rewards, achievements);

      setUser(loadUserData('zozo', alternateUser));
      setTasks(loadUserData('zozoTasks', zozoTasks));
      setRewards(loadUserData('zozoRewards', defaultRewards));
      setAchievements(loadUserData('zozoAchievements', defaultZozoAchievements));
    } else {
      // Switching to Isabel
      saveUserData('zozo', user, tasks, rewards, achievements);

      setUser(loadUserData('isabel', defaultUser));
      setTasks(loadUserData('isabelTasks', isabelTasks));
      setRewards(loadUserData('isabelRewards', defaultRewards));
      setAchievements(loadUserData('isabelAchievements', defaultIsabelAchievements));
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
