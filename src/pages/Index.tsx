
import React, { useState, useEffect } from 'react';
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

  return (
    <AppLayout isIsabel={isIsabel}>
      {/* UserHeader - Top of the page */}
      <div className="mb-6 text-center">
        <UserHeader 
          userName={user.name}
          onSwitchUser={handleSwitchUser}
          alternateUserName={isIsabel ? 'Zozo' : 'Isabel'}
          userTheme={isIsabel ? 'pink' : 'blue'}
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
