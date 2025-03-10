
import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

import UserCard from '@/components/UserCard';
import SectionHeader from '@/components/SectionHeader';
import Confetti from '@/components/Confetti';
import TaskDialog, { Task } from '@/components/TaskDialog';
import UserDialog, { User } from '@/components/UserDialog';
import FilterBar from '@/components/FilterBar';
import TaskList from '@/components/TaskList';
import ActionButtons from '@/components/ActionButtons';
import UserHeader from '@/components/UserHeader';
import { useTaskManagement } from '@/hooks/useTaskManagement';

const defaultUser: User = {
  id: '1',
  name: 'Isabel',
  points: 0,
  stars: 1
};

const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Bädda sängen',
    icon: 'bed',
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '2',
    title: 'Klä på sig',
    icon: 'shirt',
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '3',
    title: 'Borsta håret',
    icon: 'coffee',
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '4',
    title: 'Borsta tänderna',
    icon: 'coffee',
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '5',
    title: 'Pyjamas på',
    icon: 'shirt',
    points: 1,
    completed: false,
    category: 'evening'
  }
];

const alternateUser: User = {
  id: '2',
  name: 'Zozo',
  points: 0,
  stars: 0
};

const Index = () => {
  const [user, setUser] = useState<User>(defaultUser);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [filter, setFilter] = useState<'all' | 'morning' | 'evening'>('all');
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState<{x: number, y: number} | null>(null);
  const [showFullConfetti, setShowFullConfetti] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [completedTaskId, setCompletedTaskId] = useState<string | null>(null);

  // Load saved data on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedUser = localStorage.getItem('user');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('user', JSON.stringify(user));
  }, [tasks, user]);

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

  const handleSaveUser = (updatedUser: User) => {
    setUser(updatedUser);
    toast.success('Användarinformation uppdaterad!');
  };

  const handleSwitchUser = () => {
    if (user.id === defaultUser.id) {
      const savedZozo = localStorage.getItem('zozo');
      setUser(savedZozo ? JSON.parse(savedZozo) : alternateUser);
    } else {
      localStorage.setItem('zozo', JSON.stringify(user));
      const savedIsabel = localStorage.getItem('isabel');
      setUser(savedIsabel ? JSON.parse(savedIsabel) : defaultUser);
    }
    
    const savedTasks = localStorage.getItem('tasks');
    setTasks(savedTasks ? JSON.parse(savedTasks) : defaultTasks);
  };

  const taskEditHandler = (id: string) => {
    handleEditTask(id, setCurrentTask, setTaskDialogOpen);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.category === filter;
  });

  return (
    <div className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <UserHeader 
        userName={user.name}
        onSwitchUser={handleSwitchUser}
        alternateUserName={user.id === defaultUser.id ? 'Zozo' : 'Isabel'}
      />
      
      <UserCard 
        name={`Dina poäng`}
        points={user.points}
        completedTasks={tasks.filter(t => t.completed).length}
        stars={user.stars}
        onEdit={() => setUserDialogOpen(true)}
      />
      
      <SectionHeader 
        icon={<Calendar size={20} />} 
        title="Veckoöversikt"
      >
        <div className="glass-card p-4">
          <p className="text-gray-400 text-center">Statistik kommer snart...</p>
        </div>
      </SectionHeader>
      
      <SectionHeader 
        icon={<Trophy size={20} />} 
        title="Prestationer" 
        subtitle={`${user.stars}/5`}
      >
        <div className="glass-card p-4">
          <p className="text-gray-400 text-center">Prestationer kommer snart...</p>
        </div>
      </SectionHeader>
      
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-4">Mina uppgifter</h2>
        
        <FilterBar filter={filter} setFilter={setFilter} />
        
        <TaskList 
          filter={filter}
          tasks={tasks}
          onComplete={handleCompleteTask}
          onEdit={taskEditHandler}
        />
        
        <ActionButtons 
          onReset={handleResetTasks}
          onAddTask={handleAddTask}
        />
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
