
import { useState, useEffect } from 'react';
import { Task } from '@/components/TaskDialog';
import { toast } from 'sonner';
import { isabelTasks, zozoTasks } from '@/data/tasks';
import { defaultUser, alternateUser, defaultIsabelAchievements, defaultZozoAchievements } from '@/hooks/useUserManagement';

interface UseTaskManagementProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setConfettiPosition: React.Dispatch<React.SetStateAction<{x: number, y: number} | null>>;
  setShowFullConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setCompletedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  setAchievements: React.Dispatch<React.SetStateAction<any[]>>;
  setRewards: React.Dispatch<React.SetStateAction<any[]>>;
  isIsabel: boolean;
}

export const useTaskManagement = ({
  tasks,
  setTasks,
  setUser,
  setShowConfetti,
  setConfettiPosition,
  setShowFullConfetti,
  setCompletedTaskId,
  setAchievements,
  setRewards,
  isIsabel
}: UseTaskManagementProps) => {
  
  const handleCompleteTask = (id: string) => {
    const taskToComplete = tasks.find(task => task.id === id);
    if (!taskToComplete || taskToComplete.completed) return;
    
    const taskElement = document.getElementById(`task-${id}`);
    if (taskElement) {
      const rect = taskElement.getBoundingClientRect();
      setConfettiPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
    
    setShowConfetti(true);
    
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: true } 
        : task
    ));
    
    setUser(prev => ({
      ...prev,
      points: prev.points + (taskToComplete?.points || 0)
    }));
    
    setCompletedTaskId(id);
    
    toast.success(`Bra jobbat! +${taskToComplete?.points || 0} poäng`, {
      duration: 2000
    });
  };

  const handleEditTask = (id: string, setCurrentTask: Function, setTaskDialogOpen: Function) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setCurrentTask(taskToEdit);
      setTaskDialogOpen(true);
    }
  };

  const handleSaveTask = (task: Task) => {
    if (tasks.some(t => t.id === task.id)) {
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
      toast.success('Uppgift uppdaterad!');
    } else {
      setTasks(prev => [...prev, task]);
      toast.success('Ny uppgift tillagd!');
    }
  };

  const handleResetTasks = () => {
    // Reset tasks based on current user
    const defaultTasks = isIsabel ? isabelTasks : zozoTasks;
    setTasks(JSON.parse(JSON.stringify(defaultTasks))); // Deep clone to ensure we get fresh objects
    
    // Reset user points and stars
    setUser(isIsabel ? { ...defaultUser } : { ...alternateUser });
    
    // Reset achievements
    const defaultAchievements = isIsabel ? defaultIsabelAchievements : defaultZozoAchievements;
    setAchievements(JSON.parse(JSON.stringify(defaultAchievements)));
    
    // Reset rewards to default
    const defaultRewards = [
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
    
    setRewards(defaultRewards);
    
    // Clear local storage for current user
    if (isIsabel) {
      localStorage.removeItem('isabel');
      localStorage.removeItem('isabelTasks');
      localStorage.removeItem('isabelRewards');
      localStorage.removeItem('isabelAchievements');
    } else {
      localStorage.removeItem('zozo');
      localStorage.removeItem('zozoTasks');
      localStorage.removeItem('zozoRewards');
      localStorage.removeItem('zozoAchievements');
    }
    
    // Clear global local storage
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
    localStorage.removeItem('rewards');
    localStorage.removeItem('achievements');
    
    toast.success('Allt har återställts!');
  };

  return {
    handleCompleteTask,
    handleEditTask,
    handleSaveTask,
    handleResetTasks
  };
};
