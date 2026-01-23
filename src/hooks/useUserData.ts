
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

const loadFromLocalStorage = <T,>(key: string, fallback: T) => {
  const storedData = localStorage.getItem(key);
  return storedData ? (JSON.parse(storedData) as T) : fallback;
};

const saveToLocalStorage = (
  storageKeyPrefix: string,
  currentUser: User,
  currentTasks: Task[],
  currentRewards: Reward[],
  currentAchievements: Achievement[]
) => {
  localStorage.setItem(storageKeyPrefix, JSON.stringify(currentUser));
  localStorage.setItem(`${storageKeyPrefix}Tasks`, JSON.stringify(currentTasks));
  localStorage.setItem(`${storageKeyPrefix}Rewards`, JSON.stringify(currentRewards));
  localStorage.setItem(`${storageKeyPrefix}Achievements`, JSON.stringify(currentAchievements));
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
      saveToLocalStorage('isabel', user, tasks, rewards, achievements);

      setUser(loadFromLocalStorage('zozo', alternateUser));
      setTasks(loadFromLocalStorage('zozoTasks', zozoTasks));
      setRewards(loadFromLocalStorage('zozoRewards', defaultRewards));
      setAchievements(loadFromLocalStorage('zozoAchievements', defaultZozoAchievements));
    } else {
      // Switching to Isabel
      saveToLocalStorage('zozo', user, tasks, rewards, achievements);

      setUser(loadFromLocalStorage('isabel', defaultUser));
      setTasks(loadFromLocalStorage('isabelTasks', isabelTasks));
      setRewards(loadFromLocalStorage('isabelRewards', defaultRewards));
      setAchievements(loadFromLocalStorage('isabelAchievements', defaultIsabelAchievements));
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
