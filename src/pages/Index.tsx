
import React, { useState, useEffect, useMemo } from 'react';
import UserHeader from '@/components/UserHeader';
import { useUserManagement } from '@/hooks/useUserManagement';
import AppLayout from '@/components/layout/AppLayout';
import MainContent from '@/components/layout/MainContent';
import NotificationOverlay from '@/components/notifications/NotificationOverlay';
import { toast } from 'sonner';

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
    handleDeleteReward,
    isIsabel
  } = useUserManagement();

  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState<{x: number, y: number} | null>(null);
  const [showFullConfetti, setShowFullConfetti] = useState(false);
  const [completedTaskId, setCompletedTaskId] = useState<string | null>(null);
  
  // Memoize the alternate user name to avoid recalculation
  const alternateUserName = useMemo(() => isIsabel ? 'Zozo' : 'Isabel', [isIsabel]);
  const userTheme = useMemo(() => isIsabel ? 'pink' : 'blue' as const, [isIsabel]);
  
  useEffect(() => {
    if (!completedTaskId) return;
    
    const completedTask = tasks.find(task => task.id === completedTaskId);
    if (!completedTask) return;

    const categoryTasks = tasks.filter(task => task.category === completedTask.category);
    const allCompleted = categoryTasks.every(task => task.completed);
    
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

  return (
    <AppLayout isIsabel={isIsabel}>
      {/* UserHeader - Top of the page */}
      <div className="mb-6 text-center">
        <UserHeader 
          userName={user.name}
          onSwitchUser={handleSwitchUser}
          alternateUserName={alternateUserName}
          userTheme={userTheme}
        />
      </div>
      
      <MainContent 
        user={user}
        setUser={setUser}
        tasks={tasks}
        setTasks={setTasks}
        rewards={rewards}
        setRewards={setRewards}
        achievements={achievements}
        setAchievements={setAchievements}
        totalAchievements={totalAchievements}
        handleSwitchUser={handleSwitchUser}
        handleSaveUser={handleSaveUser}
        handleSaveReward={handleSaveReward}
        handleRedeemReward={handleRedeemReward}
        handleDeleteReward={handleDeleteReward}
        isIsabel={isIsabel}
        setShowConfetti={setShowConfetti}
        setConfettiPosition={setConfettiPosition}
        setShowFullConfetti={setShowFullConfetti}
        setCompletedTaskId={setCompletedTaskId}
      />
      
      <NotificationOverlay 
        showConfetti={showConfetti}
        setShowConfetti={setShowConfetti}
        showFullConfetti={showFullConfetti}
        setShowFullConfetti={setShowFullConfetti}
        confettiPosition={confettiPosition}
        completedTaskId={completedTaskId}
      />
    </AppLayout>
  );
};

export default Index;
