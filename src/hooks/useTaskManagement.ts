import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/components/TaskDialog';
import { User } from '@/components/UserDialog';
import { Achievement } from '@/components/AchievementItem';
import { Reward } from '@/components/RewardsDialog';
import { toast } from 'sonner';
import { isabelTasks, zozoTasks } from '@/data/tasks';
import { defaultUser, alternateUser, defaultIsabelAchievements, defaultZozoAchievements } from '@/hooks/useUserManagement';

interface UseTaskManagementProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setConfettiPosition: React.Dispatch<React.SetStateAction<{x: number, y: number} | null>>;
  setShowFullConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setCompletedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  setRewards: React.Dispatch<React.SetStateAction<Reward[]>>;
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
  
  const completeTask = useCallback((id: string) => {
    setTasks(prev => {
      const taskToComplete = prev.find(task => task.id === id);
      if (!taskToComplete || taskToComplete.completed) return prev;
      
      const taskElement = document.getElementById(`task-${id}`);
      if (taskElement) {
        const rect = taskElement.getBoundingClientRect();
        setConfettiPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
      
      setShowConfetti(true);
      
      setUser(prevUser => ({
        ...prevUser,
        points: prevUser.points + (taskToComplete?.points || 0)
      }));
      
      setCompletedTaskId(id);
      
      toast.success(`Bra jobbat! +${taskToComplete?.points || 0} poäng`, {
        duration: 2000
      });
      
      return prev.map(task => 
        task.id === id 
          ? { ...task, completed: true } 
          : task
      );
    });
  }, [setTasks, setUser, setShowConfetti, setConfettiPosition, setCompletedTaskId]);

  const editTask = useCallback((
    id: string, 
    setCurrentTask: (task: Task | null) => void, 
    setTaskDialogOpen: (open: boolean) => void
  ) => {
    setTasks(prev => {
      const taskToEdit = prev.find(task => task.id === id);
      if (taskToEdit) {
        setCurrentTask(taskToEdit);
        setTaskDialogOpen(true);
      }
      return prev;
    });
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast.success('Uppgift borttagen!');
  }, [setTasks]);

  const saveTask = useCallback((task: Task) => {
    setTasks(prev => {
      const taskExists = prev.some(existingTask => existingTask.id === task.id);
      if (taskExists) {
        toast.success('Uppgift uppdaterad!');
        return prev.map(existingTask => existingTask.id === task.id ? task : existingTask);
      } else {
        toast.success('Ny uppgift tillagd!');
        return [...prev, task];
      }
    });
  }, [setTasks]);

  const resetTasks = useCallback(() => {
    // Istället för att återställa allt, återställer vi bara slutförda uppgifter, men behåller personliga ändringar
    
    // Hämta de initiala uppgifterna baserat på vilken användare
    const defaultTasks = isIsabel ? isabelTasks : zozoTasks;
    
    setTasks(prev => {
      // Återställ endast completed-status för varje uppgift (immutably)
      let updatedTasks = prev.map(task => ({
        ...task,
        completed: false
      }));
      
      // Återställ alla uppgifter som saknas från defaultTasks (för att säkerställa att standarduppgifter inte saknas)
      const updatedTaskIds = new Set(updatedTasks.map(task => task.id));
      const missingTasks = defaultTasks.filter(
        defaultTask => !updatedTaskIds.has(defaultTask.id)
      );
      updatedTasks = [...updatedTasks, ...missingTasks.map(task => ({ ...task }))];
      
      return updatedTasks;
    });
    
    // Återställ användarens poäng till 0, men behåll andra användarinställningar
    setUser(prev => ({
      ...prev,
      points: 0
    }));
    
    // Återställ achievments (prestationer) till ej slutförda
    const currentAchievements = isIsabel ? defaultIsabelAchievements : defaultZozoAchievements;
    const updatedAchievements = currentAchievements.map(achievement => ({
      ...achievement,
      completed: false
    }));
    
    setAchievements(updatedAchievements);
    
    // Behåll belöningar oförändrade, återställer inte dessa
    
    toast.success('Uppgifter och poäng har återställts!');
  }, [setTasks, setUser, setAchievements, isIsabel]);

  return {
    completeTask,
    editTask,
    saveTask,
    resetTasks,
    deleteTask
  };
};
