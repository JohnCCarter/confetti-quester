
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import UserCard from '@/components/UserCard';
import Confetti from '@/components/Confetti';
import UserHeader from '@/components/UserHeader';
import StatisticsSection from '@/components/StatisticsSection';
import TasksSection from '@/components/TasksSection';
import RewardsSection from '@/components/RewardsSection';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import { useUserManagement } from '@/hooks/useUserManagement';
import TaskManager from '@/features/tasks/TaskManager';
import RewardManager from '@/features/rewards/RewardManager';
import UserManager from '@/features/users/UserManager';

const Index = () => {
  const {
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
    handleSaveReward,
    handleRedeemReward,
    isIsabel
  } = useUserManagement();

  const [filter, setFilter] = useState<'all' | 'morning' | 'evening'>('all');
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState<{x: number, y: number} | null>(null);
  const [showFullConfetti, setShowFullConfetti] = useState(false);
  const [completedTaskId, setCompletedTaskId] = useState<string | null>(null);

  // Apply user-specific class to body for theme
  useEffect(() => {
    // Remove any existing user classes
    document.body.classList.remove('user-isabel', 'user-zozo');
    
    // Add the appropriate user class
    document.body.classList.add(isIsabel ? 'user-isabel' : 'user-zozo');
    
    return () => {
      document.body.classList.remove('user-isabel', 'user-zozo');
    };
  }, [isIsabel]);

  // Check for completed category
  useEffect(() => {
    if (!completedTaskId) return;
    
    const completedTask = tasks.find(t => t.id === completedTaskId);
    if (!completedTask) return;

    const categoryTasks = tasks.filter(t => t.category === completedTask.category);
    const allCompleted = categoryTasks.every(t => t.completed);
    
    if (allCompleted && categoryTasks.length > 0) {
      setTimeout(() => {
        setShowFullConfetti(true);
        toast.success(`Bra jobbat! Du har slutfört alla ${completedTask.category === 'morning' ? 'morgon' : 'kväll'}uppgifter!`, {
          duration: 4000
        });
      }, 500);
    }
    
    setCompletedTaskId(null);
  }, [tasks, completedTaskId]);

  // Task management functions
  const { 
    handleCompleteTask, 
    handleEditTask, 
    handleSaveTask, 
    handleResetTasks 
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
    <div className="min-h-screen px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
      <div className="max-w-md mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
        <UserHeader 
          userName={user.name}
          onSwitchUser={handleSwitchUser}
          alternateUserName={isIsabel ? 'Zozo' : 'Isabel'}
          userTheme={userTheme}
        />
        
        <div className="md:grid md:grid-cols-12 md:gap-6 lg:gap-8">
          <div className="md:col-span-6 xl:col-span-5">
            <UserCard 
              name={`Dina poäng`}
              points={user.points}
              completedTasks={tasks.filter(t => t.completed).length}
              stars={user.stars}
              onEdit={() => UserManager.openUserDialog()}
              userTheme={userTheme}
            />
            
            <RewardsSection 
              rewards={rewards}
              userPoints={user.points}
              onAddReward={() => RewardManager.openAddRewardDialog()}
              onRedeemReward={handleRedeemReward}
              onEditReward={(id) => RewardManager.openEditRewardDialog(id, rewards)}
              userTheme={userTheme}
            />
          </div>
          
          <div className="md:col-span-6 xl:col-span-7">
            <StatisticsSection 
              userStars={user.stars}
              achievements={achievements}
              totalAchievements={totalAchievements}
              userTheme={userTheme}
            />
            
            <TasksSection 
              filter={filter}
              setFilter={setFilter}
              tasks={tasks}
              onComplete={handleCompleteTask}
              onEdit={(id) => TaskManager.openEditTaskDialog(id, tasks)}
              onReset={handleResetTasks}
              onAddTask={() => TaskManager.openAddTaskDialog()}
              userTheme={userTheme}
            />
          </div>
        </div>
      </div>
      
      {showConfetti && (
        <Confetti 
          active={showConfetti} 
          type="small"
          position={confettiPosition || undefined}
          onComplete={() => setShowConfetti(false)}
        />
      )}
      
      {showFullConfetti && (
        <Confetti 
          active={showFullConfetti} 
          type="full"
          onComplete={() => setShowFullConfetti(false)}
        />
      )}
      
      <div className="fixed bottom-6 right-6 pointer-events-none">
        {completedTaskId && (
          <div className="bg-app-green/90 text-white px-4 py-3 rounded-lg animate-fade-in">
            Bra jobbat! 👏
          </div>
        )}
      </div>
      
      {/* Dialog Managers */}
      <TaskManager 
        onSaveTask={handleSaveTask}
      />
      
      <UserManager 
        user={user}
        onSaveUser={handleSaveUser}
      />
      
      <RewardManager
        onSaveReward={handleSaveReward}
      />
    </div>
  );
};

export default Index;
