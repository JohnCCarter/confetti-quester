import React, { useState, useEffect, useMemo } from 'react';
import UserCard from '@/components/UserCard';
import StatisticsSection from '@/components/StatisticsSection';
import TasksSection from '@/components/TasksSection';
import RewardsSection from '@/components/RewardsSection';
import TaskManager from '@/features/tasks/TaskManager';
import RewardManager from '@/features/rewards/RewardManager';
import UserManager from '@/features/users/UserManager';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import { User } from '@/components/UserDialog';
import { Task } from '@/components/TaskDialog';
import { Reward } from '@/components/RewardsDialog';
import { Achievement } from '@/components/AchievementItem';

interface MainContentProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  rewards: Reward[];
  setRewards: React.Dispatch<React.SetStateAction<Reward[]>>;
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  totalAchievements: number;
  handleSwitchUser: () => void;
  handleSaveUser: (user: User) => void;
  saveReward: (reward: Reward) => void;
  redeemReward: (id: string) => void;
  deleteReward: (id: string) => void;
  isIsabel: boolean;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setConfettiPosition: React.Dispatch<React.SetStateAction<{x: number, y: number} | null>>;
  setShowFullConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  setCompletedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

const MainContent: React.FC<MainContentProps> = ({
  user,
  setUser,
  tasks,
  setTasks,
  rewards,
  setRewards,
  achievements,
  setAchievements,
  totalAchievements,
  handleSwitchUser,
  handleSaveUser,
  saveReward,
  redeemReward,
  deleteReward,
  isIsabel,
  setShowConfetti,
  setConfettiPosition,
  setShowFullConfetti,
  setCompletedTaskId
}) => {
  const [filter, setFilter] = useState<'all' | 'morning' | 'evening'>('all');
  
  // Calculate week statistics - memoized to avoid recalculation on every render
  const weekStatistics = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    // Tasks completed today
    const completedToday = tasks.filter(task => task.completed).length;
    const totalToday = tasks.length;
    
    // Tasks completed this week (simplified for now)
    const completedThisWeek = completedToday;
    const totalThisWeek = totalToday;
    
    // Create tasks per day (simplified for now)
    const completedByDay: Record<string, number> = {};
    const tasksPerDay: Record<string, number> = {};
    
    // Add today's values
    completedByDay[dayOfWeek.toString()] = completedToday;
    tasksPerDay[dayOfWeek.toString()] = totalToday;
    
    return {
      completedToday,
      totalToday,
      completedThisWeek,
      totalThisWeek,
      completedByDay,
      tasksPerDay
    };
  }, [tasks]);
  
  const { 
    completeTask, 
    editTask, 
    saveTask, 
    resetTasks,
    deleteTask
  } = useTaskManagement({
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
  });

  const userTheme = isIsabel ? 'pink' : 'blue';

  return (
    <>
      <div className="md:grid md:grid-cols-12 md:gap-6 lg:gap-8">
        {/* Left column for UserCard, Achievements and Tasks */}
        <div className="md:col-span-7 xl:col-span-7">
          <div className="mb-6">
            <UserCard 
              name={`Dina poäng`}
              points={user.points}
              completedTasks={tasks.filter(task => task.completed).length}
              stars={user.stars}
              onEdit={() => UserManager.openUserDialog()}
              userTheme={userTheme}
            />
          </div>
          
          <div className="mb-6">
            <StatisticsSection 
              userStars={user.stars}
              achievements={achievements}
              totalAchievements={totalAchievements}
              userTheme={userTheme}
              showWeekOverview={false}
            />
          </div>
          
          <div className="mb-6">
            <TasksSection 
              filter={filter}
              setFilter={setFilter}
              tasks={tasks}
              onComplete={completeTask}
              onEdit={(id) => TaskManager.openEditTaskDialog(id, tasks)}
              onDelete={(id, title) => TaskManager.openDeleteTaskDialog(id, title)}
              onReset={resetTasks}
              onAddTask={() => TaskManager.openAddTaskDialog()}
              userTheme={userTheme}
            />
          </div>
        </div>
        
        {/* Right column for WeekOverview and Rewards */}
        <div className="md:col-span-5 xl:col-span-5">
          <div className="mb-6">
            <StatisticsSection 
              userStars={user.stars}
              achievements={[]}
              totalAchievements={0}
              userTheme={userTheme}
              showWeekOverview={true}
              hideAchievements={true}
              weekStatistics={weekStatistics}
            />
          </div>
          
          <div className="mb-6">
            <RewardsSection 
              rewards={rewards}
              userPoints={user.points}
              onAddReward={() => RewardManager.openAddRewardDialog()}
              onRedeemReward={redeemReward}
              onEditReward={(id) => RewardManager.openEditRewardDialog(id, rewards)}
              onDeleteReward={(id, title) => RewardManager.openDeleteRewardDialog(id, title)}
              userTheme={userTheme}
            />
          </div>
        </div>
      </div>
      
      <TaskManager 
        onSaveTask={saveTask}
        onDeleteTask={deleteTask}
      />
      
      <UserManager 
        user={user}
        onSaveUser={handleSaveUser}
      />
      
      <RewardManager
        onSaveReward={saveReward}
        onDeleteReward={deleteReward}
      />
    </>
  );
};

export default React.memo(MainContent);
