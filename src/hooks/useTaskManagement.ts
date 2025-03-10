
import { useState, useEffect } from 'react';
import { Task } from '@/components/TaskDialog';
import { toast } from 'sonner';

interface UseTaskManagementProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setConfettiPosition: React.Dispatch<React.SetStateAction<{x: number, y: number} | null>>;
  setShowFullConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setCompletedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useTaskManagement = ({
  tasks,
  setTasks,
  setUser,
  setShowConfetti,
  setConfettiPosition,
  setShowFullConfetti,
  setCompletedTaskId
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
    const updatedTasks = tasks.map(task => ({ ...task, completed: false }));
    setTasks(updatedTasks);
    toast.success('Uppgifter har återställts!');
  };

  return {
    handleCompleteTask,
    handleEditTask,
    handleSaveTask,
    handleResetTasks
  };
};
