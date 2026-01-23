
import { useState, useEffect, useCallback } from 'react';
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
  
  const handleCompleteTask = useCallback((id: string) => {
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
  }, [tasks, setTasks, setUser, setShowConfetti, setConfettiPosition, setCompletedTaskId]);

  const handleEditTask = useCallback((id: string, setCurrentTask: Function, setTaskDialogOpen: Function) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setCurrentTask(taskToEdit);
      setTaskDialogOpen(true);
    }
  }, [tasks]);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast.success('Uppgift borttagen!');
  }, [setTasks]);

  const handleSaveTask = useCallback((task: Task) => {
    if (tasks.some(t => t.id === task.id)) {
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
      toast.success('Uppgift uppdaterad!');
    } else {
      setTasks(prev => [...prev, task]);
      toast.success('Ny uppgift tillagd!');
    }
  }, [tasks, setTasks]);

  const handleResetTasks = useCallback(() => {
    // Istället för att återställa allt, återställer vi bara slutförda uppgifter, men behåller personliga ändringar
    
    // Hämta de initiala uppgifterna baserat på vilken användare
    const defaultTasks = isIsabel ? isabelTasks : zozoTasks;
    
    // Återställ endast completed-status för varje uppgift (immutably)
    const updatedTasks = tasks.map(task => ({
      ...task,
      completed: false
    }));
    
    // Återställ alla uppgifter som saknas från defaultTasks (för att säkerställa att standarduppgifter inte saknas)
    defaultTasks.forEach(defaultTask => {
      if (!updatedTasks.some(task => task.id === defaultTask.id)) {
        updatedTasks.push({...defaultTask});
      }
    });
    
    setTasks(updatedTasks);
    
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
  }, [tasks, setTasks, setUser, setAchievements, isIsabel]);

  return {
    handleCompleteTask,
    handleEditTask,
    handleSaveTask,
    handleResetTasks,
    handleDeleteTask
  };
};
