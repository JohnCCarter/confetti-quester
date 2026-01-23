
import { useEffect, useRef } from 'react';
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
  const prevTasksCompletedRef = useRef<Set<string>>(new Set());
  const prevPointsRef = useRef<number>(user.points);
  
  // Check achievements whenever tasks or user points change
  useEffect(() => {
    // Only process if task completion status or points actually changed
    const currentCompleted = new Set(tasks.filter(t => t.completed).map(t => t.id));
    const tasksChanged = 
      currentCompleted.size !== prevTasksCompletedRef.current.size ||
      [...currentCompleted].some(id => !prevTasksCompletedRef.current.has(id));
    const pointsChanged = user.points !== prevPointsRef.current;
    
    if (!tasksChanged && !pointsChanged) {
      return;
    }
    
    prevTasksCompletedRef.current = currentCompleted;
    prevPointsRef.current = user.points;
    
    const achievementIndexById = new Map(
      achievements.map((achievement, index) => [achievement.id, index])
    );

    // Create a copy of achievements to track changes
    const updatedAchievements = [...achievements];
    let achievementsUnlocked = false;

    // Check morning/evening achievements in a single pass
    let hasMorningTasks = false;
    let hasEveningTasks = false;
    let allMorningCompleted = true;
    let allEveningCompleted = true;

    for (const task of tasks) {
      if (task.category === 'morning') {
        hasMorningTasks = true;
        if (!task.completed) {
          allMorningCompleted = false;
        }
      }

      if (task.category === 'evening') {
        hasEveningTasks = true;
        if (!task.completed) {
          allEveningCompleted = false;
        }
      }
    }

    if (!hasMorningTasks) {
      allMorningCompleted = false;
    }

    if (!hasEveningTasks) {
      allEveningCompleted = false;
    }

    const morningAchievementIndex = achievementIndexById.get('1') ?? -1;
    const eveningAchievementIndex = achievementIndexById.get('2') ?? -1;
    const pointsAchievementIndex = achievementIndexById.get('4') ?? -1;

    // Achievement 1: Complete all morning tasks
    if (
      allMorningCompleted &&
      morningAchievementIndex >= 0 &&
      !achievements[morningAchievementIndex].completed
    ) {
      updatedAchievements[morningAchievementIndex] = {
        ...updatedAchievements[morningAchievementIndex],
        completed: true
      };
      achievementsUnlocked = true;
    }

    // Achievement 2: Complete all evening tasks
    if (
      allEveningCompleted &&
      eveningAchievementIndex >= 0 &&
      !achievements[eveningAchievementIndex].completed
    ) {
      updatedAchievements[eveningAchievementIndex] = {
        ...updatedAchievements[eveningAchievementIndex],
        completed: true
      };
      achievementsUnlocked = true;
    }

    // Achievement 4: Collect 25 points
    if (
      user.points >= 25 &&
      pointsAchievementIndex >= 0 &&
      !achievements[pointsAchievementIndex].completed
    ) {
      updatedAchievements[pointsAchievementIndex] = {
        ...updatedAchievements[pointsAchievementIndex],
        completed: true
      };
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
  }, [tasks, user.points, achievements, setAchievements, setUser]);

  return { achievements };
};
