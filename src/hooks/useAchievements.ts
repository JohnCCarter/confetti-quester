
import { useState, useEffect, useRef } from 'react';
import { User } from '@/components/UserDialog';
import { Task } from '@/components/TaskDialog';
import { Achievement } from '@/components/AchievementItem';
import { toast } from 'sonner';

export const useAchievements = (
  tasks: Task[],
  user: User,
  achievements: Achievement[],
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>,
  setUser: React.Dispatch<React.SetStateAction<User>>
) => {
  // Track previous values to avoid unnecessary processing
  const prevTasksRef = useRef<Task[]>(tasks);
  const prevPointsRef = useRef<number>(user.points);
  
  // Check achievements whenever tasks or user points change
  useEffect(() => {
    // Only process if tasks or points actually changed
    const tasksChanged = JSON.stringify(tasks) !== JSON.stringify(prevTasksRef.current);
    const pointsChanged = user.points !== prevPointsRef.current;
    
    if (!tasksChanged && !pointsChanged) {
      return;
    }
    
    prevTasksRef.current = tasks;
    prevPointsRef.current = user.points;
    
    // Create a copy of achievements to track changes
    let updatedAchievements = [...achievements];
    let achievementsUnlocked = false;

    // Check morning master achievement
    const morningTasks = tasks.filter(task => task.category === 'morning');
    const allMorningCompleted = morningTasks.length > 0 && morningTasks.every(task => task.completed);
    
    // Achievement 1: Complete all morning tasks
    if (allMorningCompleted && !achievements[0].completed) {
      updatedAchievements[0] = { ...updatedAchievements[0], completed: true };
      achievementsUnlocked = true;
    }

    // Check evening princess/prince achievement
    const eveningTasks = tasks.filter(task => task.category === 'evening');
    const allEveningCompleted = eveningTasks.length > 0 && eveningTasks.every(task => task.completed);
    
    // Achievement 2: Complete all evening tasks
    if (allEveningCompleted && !achievements[1].completed) {
      updatedAchievements[1] = { ...updatedAchievements[1], completed: true };
      achievementsUnlocked = true;
    }

    // Achievement 4: Collect 25 points
    if (user.points >= 25 && !achievements[3].completed) {
      updatedAchievements[3] = { ...updatedAchievements[3], completed: true };
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
  }, [tasks, user.points]);

  return { achievements };
};
