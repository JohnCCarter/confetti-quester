
import { useState, useEffect } from 'react';
import { User } from '@/components/UserDialog';
import { Task } from '@/components/TaskDialog';
import { Reward } from '@/components/RewardsDialog';
import { isabelTasks, zozoTasks } from '@/data/tasks';
import { toast } from 'sonner';

export const defaultUser: User = {
  id: '1',
  name: 'Isabel',
  points: 0,
  stars: 1
};

export const alternateUser: User = {
  id: '2',
  name: 'Zozo',
  points: 0,
  stars: 0
};

// Default rewards
const defaultRewards: Reward[] = [
  {
    id: '1',
    title: 'Extra skärmtid',
    description: '30 minuter extra skärmtid',
    points: 50,
    icon: 'gift'
  },
  {
    id: '2',
    title: 'Glass',
    description: 'En glass av valfri sort',
    points: 100,
    icon: 'award'
  }
];

export const useUserManagement = () => {
  const [user, setUser] = useState<User>(defaultUser);
  const [tasks, setTasks] = useState<Task[]>(isabelTasks);
  const [rewards, setRewards] = useState<Reward[]>(defaultRewards);

  // Load saved data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedTasks = localStorage.getItem('tasks');
    const savedRewards = localStorage.getItem('rewards');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedRewards) {
      setRewards(JSON.parse(savedRewards));
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [tasks, user, rewards]);

  const handleSwitchUser = () => {
    if (user.id === defaultUser.id) {
      // Switching to Zozo
      localStorage.setItem('isabel', JSON.stringify(user));
      localStorage.setItem('isabelTasks', JSON.stringify(tasks));
      localStorage.setItem('isabelRewards', JSON.stringify(rewards));
      
      const savedZozo = localStorage.getItem('zozo');
      const savedZozoTasks = localStorage.getItem('zozoTasks');
      const savedZozoRewards = localStorage.getItem('zozoRewards');
      
      setUser(savedZozo ? JSON.parse(savedZozo) : alternateUser);
      setTasks(savedZozoTasks ? JSON.parse(savedZozoTasks) : zozoTasks);
      setRewards(savedZozoRewards ? JSON.parse(savedZozoRewards) : defaultRewards);
    } else {
      // Switching to Isabel
      localStorage.setItem('zozo', JSON.stringify(user));
      localStorage.setItem('zozoTasks', JSON.stringify(tasks));
      localStorage.setItem('zozoRewards', JSON.stringify(rewards));
      
      const savedIsabel = localStorage.getItem('isabel');
      const savedIsabelTasks = localStorage.getItem('isabelTasks');
      const savedIsabelRewards = localStorage.getItem('isabelRewards');
      
      setUser(savedIsabel ? JSON.parse(savedIsabel) : defaultUser);
      setTasks(savedIsabelTasks ? JSON.parse(savedIsabelTasks) : isabelTasks);
      setRewards(savedIsabelRewards ? JSON.parse(savedIsabelRewards) : defaultRewards);
    }
  };

  const handleSaveUser = (updatedUser: User) => {
    setUser(updatedUser);
    toast.success('Användarinformation uppdaterad!');
  };

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
    
    toast.success(`Du har löst in "${rewardToRedeem.title}"!`);
  };

  return {
    user,
    setUser,
    tasks,
    setTasks,
    rewards,
    setRewards,
    handleSwitchUser,
    handleSaveUser,
    handleSaveReward,
    handleRedeemReward,
    isIsabel: user.id === defaultUser.id
  };
};
