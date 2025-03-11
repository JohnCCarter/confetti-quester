import { useState, useEffect } from 'react';
import { Sun } from 'lucide-react';
import { User } from '@/components/UserDialog';
import { Task } from '@/components/TaskDialog';
import { Reward } from '@/components/RewardsDialog';
import { Achievement } from '@/components/AchievementItem';
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

// Default achievements for Isabel
const defaultIsabelAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Morgonmästare',
    description: 'Slutför alla morgonrutiner på en dag',
    completed: false,
    iconType: 'morning-master'
  },
  {
    id: '2',
    title: 'Kvällsprinsessan',
    description: 'Slutför alla kvällsrutiner på en dag',
    completed: false,
    iconType: 'evening-princess'
  },
  {
    id: '3',
    title: 'På gång!',
    description: 'Använd appen 5 dagar i rad',
    completed: false,
    iconType: 'on-track'
  },
  {
    id: '4',
    title: 'Superstjärna',
    description: 'Samla 25 poäng',
    completed: false,
    iconType: 'superstar'
  },
  {
    id: '5',
    title: 'Belönad',
    description: 'Lös in din första belöning',
    completed: false,
    iconType: 'rewarded'
  }
];

// Default achievements for Zozo
const defaultZozoAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Morgonmästare',
    description: 'Slutför alla morgonrutiner på en dag',
    completed: false,
    iconType: 'morning-master'
  },
  {
    id: '2',
    title: 'Kvällsprinsen',
    description: 'Slutför alla kvällsrutiner på en dag',
    completed: false,
    iconType: 'evening-prince'
  },
  {
    id: '3',
    title: 'På gång!',
    description: 'Använd appen 5 dagar i rad',
    completed: false,
    iconType: 'on-track'
  },
  {
    id: '4',
    title: 'Superstjärna',
    description: 'Samla 25 poäng',
    completed: false,
    iconType: 'superstar'
  },
  {
    id: '5',
    title: 'Belönad',
    description: 'Lös in din första belöning',
    completed: false,
    iconType: 'rewarded'
  }
];

export const useUserManagement = () => {
  const [user, setUser] = useState<User>(defaultUser);
  const [tasks, setTasks] = useState<Task[]>(isabelTasks);
  const [rewards, setRewards] = useState<Reward[]>(defaultRewards);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultIsabelAchievements);

  // Load saved data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedTasks = localStorage.getItem('tasks');
    const savedRewards = localStorage.getItem('rewards');
    const savedAchievements = localStorage.getItem('achievements');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedRewards) {
      setRewards(JSON.parse(savedRewards));
    }
    
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('rewards', JSON.stringify(rewards));
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [tasks, user, rewards, achievements]);

  // Check achievements
  useEffect(() => {
    // Create a copy of achievements to track changes
    let updatedAchievements = [...achievements];
    let achievementsUnlocked = false;

    // Check morning master achievement
    const morningTasks = tasks.filter(task => task.category === 'morning');
    const allMorningCompleted = morningTasks.length > 0 && morningTasks.every(task => task.completed);
    
    // Achievement 1: Complete all morning tasks
    if (allMorningCompleted && !achievements[0].completed) {
      updatedAchievements[0].completed = true;
      achievementsUnlocked = true;
    }

    // Check evening princess achievement
    const eveningTasks = tasks.filter(task => task.category === 'evening');
    const allEveningCompleted = eveningTasks.length > 0 && eveningTasks.every(task => task.completed);
    
    // Achievement 2: Complete all evening tasks
    if (allEveningCompleted && !achievements[1].completed) {
      updatedAchievements[1].completed = true;
      achievementsUnlocked = true;
    }

    // Achievement 4: Collect 25 points
    if (user.points >= 25 && !achievements[3].completed) {
      updatedAchievements[3].completed = true;
      achievementsUnlocked = true;
    }

    // Update achievements if any were unlocked
    if (achievementsUnlocked) {
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
  }, [tasks, user.points, achievements]);

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
  };

  return {
    user,
    setUser,
    tasks,
    setTasks,
    rewards,
    setRewards,
    achievements,
    handleSwitchUser,
    handleSaveUser,
    handleSaveReward,
    handleRedeemReward,
    isIsabel: user.id === defaultUser.id,
    totalAchievements: defaultIsabelAchievements.length
  };
};
