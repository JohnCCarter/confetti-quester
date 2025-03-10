
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import UserCard from '@/components/UserCard';
import Confetti from '@/components/Confetti';
import TaskDialog, { Task } from '@/components/TaskDialog';
import UserDialog from '@/components/UserDialog';
import UserHeader from '@/components/UserHeader';
import StatisticsSection from '@/components/StatisticsSection';
import TasksSection from '@/components/TasksSection';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import { useUserManagement } from '@/hooks/useUserManagement';

const Index = () => {
  const {
    user,
    setUser,
    tasks,
    setTasks,
    handleSwitchUser,
    handleSaveUser,
    isIsabel
  } = useUserManagement();

  const [filter, setFilter] = useState<'all' | 'morning' | 'evening'>('all');
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState<{x: number, y: number} | null>(null);
  const [showFullConfetti, setShowFullConfetti] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [completedTaskId, setCompletedTaskId] = useState<string | null>(null);

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
    setCompletedTaskId
  });

  const handleAddTask = () => {
    setCurrentTask(undefined);
    setTaskDialogOpen(true);
  };

  const taskEditHandler = (id: string) => {
    handleEditTask(id, setCurrentTask, setTaskDialogOpen);
  };

  const userTheme = isIsabel ? 'pink' : 'blue';

  return (
    <div className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <UserHeader 
        userName={user.name}
        onSwitchUser={handleSwitchUser}
        alternateUserName={isIsabel ? 'Zozo' : 'Isabel'}
        userTheme={userTheme}
      />
      
      <UserCard 
        name={`Dina poäng`}
        points={user.points}
        completedTasks={tasks.filter(t => t.completed).length}
        stars={user.stars}
        onEdit={() => setUserDialogOpen(true)}
        userTheme={userTheme}
      />
      
      <StatisticsSection 
        userStars={user.stars}
        userTheme={userTheme}
      />
      
      <TasksSection 
        filter={filter}
        setFilter={setFilter}
        tasks={tasks}
        onComplete={handleCompleteTask}
        onEdit={taskEditHandler}
        onReset={handleResetTasks}
        onAddTask={handleAddTask}
        userTheme={userTheme}
      />
      
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
      
      <TaskDialog
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
        onSave={handleSaveTask}
        task={currentTask}
        isEditing={!!currentTask}
      />
      
      <UserDialog
        open={userDialogOpen}
        onClose={() => setUserDialogOpen(false)}
        onSave={handleSaveUser}
        user={user}
      />
    </div>
  );
};

export default Index;
