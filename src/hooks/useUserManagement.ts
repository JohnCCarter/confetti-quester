
import { useState, useEffect } from 'react';
import { User } from '@/components/UserDialog';
import { Task } from '@/components/TaskDialog';
import { isabelTasks, zozoTasks } from '@/data/taskData';
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

export const useUserManagement = () => {
  const [user, setUser] = useState<User>(defaultUser);
  const [tasks, setTasks] = useState<Task[]>(isabelTasks);

  // Load saved data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, user]);

  const handleSwitchUser = () => {
    if (user.id === defaultUser.id) {
      // Switching to Zozo
      localStorage.setItem('isabel', JSON.stringify(user));
      localStorage.setItem('isabelTasks', JSON.stringify(tasks));
      
      const savedZozo = localStorage.getItem('zozo');
      const savedZozoTasks = localStorage.getItem('zozoTasks');
      
      setUser(savedZozo ? JSON.parse(savedZozo) : alternateUser);
      setTasks(savedZozoTasks ? JSON.parse(savedZozoTasks) : zozoTasks);
    } else {
      // Switching to Isabel
      localStorage.setItem('zozo', JSON.stringify(user));
      localStorage.setItem('zozoTasks', JSON.stringify(tasks));
      
      const savedIsabel = localStorage.getItem('isabel');
      const savedIsabelTasks = localStorage.getItem('isabelTasks');
      
      setUser(savedIsabel ? JSON.parse(savedIsabel) : defaultUser);
      setTasks(savedIsabelTasks ? JSON.parse(savedIsabelTasks) : isabelTasks);
    }
  };

  const handleSaveUser = (updatedUser: User) => {
    setUser(updatedUser);
    toast.success('Användarinformation uppdaterad!');
  };

  return {
    user,
    setUser,
    tasks,
    setTasks,
    handleSwitchUser,
    handleSaveUser,
    isIsabel: user.id === defaultUser.id
  };
};
