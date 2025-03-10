
import React, { useState, useEffect } from 'react';
import { Calendar, Trophy } from 'lucide-react';
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

const isabelTasks: Task[] = [
  // Morning tasks
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
    title: 'Äta frukost',
    icon: 'coffee',
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '5',
    title: 'Borsta tänderna',
    icon: 'coffee',
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '6',
    title: 'Klä på sig ytterkläder',
    icon: 'shirt',
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '7',
    title: 'Pussa mamma och pappa och säg att du älskar dem',
    icon: 'heart',
    points: 2,
    completed: false,
    category: 'morning'
  },
  // Evening tasks
  {
    id: '8',
    title: 'Plocka sina saker',
    icon: 'home',
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '9',
    title: 'Duscha',
    icon: 'droplet',
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '10',
    title: 'Borsta tänderna',
    icon: 'coffee',
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '11',
    title: 'Förbereda kläder',
    icon: 'shirt',
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '12',
    title: 'Göra hemläxa',
    icon: 'pencil',
    points: 2,
    completed: false,
    category: 'evening'
  },
  {
    id: '13',
    title: 'Läsa och skriva',
    icon: 'book',
    points: 2,
    completed: false,
    category: 'evening'
  },
  {
    id: '14',
    title: 'Sova kl. 19:00',
    icon: 'moon',
    points: 2,
    completed: false,
    category: 'evening'
  },
  {
    id: '15',
    title: 'Pussa mamma och pappa och säg att du älskar dem',
    icon: 'heart',
    points: 2,
    completed: false,
    category: 'evening'
  }
];

const zozoTasks: Task[] = [
  // Morning tasks
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
    category: 'morning'
  },
  {
    id: '5',
    title: 'Klä på sig ytterkläder',
    icon: 'shirt',
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '6',
    title: 'Pussa mamma och pappa och säg att du älskar dem',
    icon: 'heart',
    points: 2,
    completed: false,
    category: 'morning'
  },
  // Evening tasks - same as Isabel's evening tasks
  {
    id: '7',
    title: 'Plocka sina saker',
    icon: 'home',
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '8',
    title: 'Duscha',
    icon: 'droplet',
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '9',
    title: 'Borsta tänderna',
    icon: 'coffee',
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '10',
    title: 'Förbereda kläder',
    icon: 'shirt',
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '11',
    title: 'Göra hemläxa',
    icon: 'pencil',
    points: 2,
    completed: false,
    category: 'evening'
  },
  {
    id: '12',
    title: 'Läsa och skriva',
    icon: 'book',
    points: 2,
    completed: false,
    category: 'evening'
  },
  {
    id: '13',
    title: 'Sova kl. 19:00',
    icon: 'moon',
    points: 2,
    completed: false,
    category: 'evening'
  },
  {
    id: '14',
    title: 'Pussa mamma och pappa och säg att du älskar dem',
    icon: 'heart',
    points: 2,
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
  const [tasks, setTasks] = useState<Task[]>(isabelTasks);
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
      // Switching to Zozo
      localStorage.setItem('isabel', JSON.stringify(user));
      localStorage.setItem('isabelTasks', JSON.stringify(tasks));
      
      const savedZozo = localStorage.getItem('zozo');
      const savedZozoTasks = localStorage.getItem('zozoTasks');
      
      setUser(savedZozo ? JSON.parse(savedZozo) : alternateUser);
      setTasks(savedZozoTasks ? JSON.parse(savedZozoTasks) : zozoTasks);
    } else {
      // Switching to Isabel
      localStorage.setItem('zozo', JSON.stringify(user));
      localStorage.setItem('zozoTasks', JSON.stringify(tasks));
      
      const savedIsabel = localStorage.getItem('isabel');
      const savedIsabelTasks = localStorage.getItem('isabelTasks');
      
      setUser(savedIsabel ? JSON.parse(savedIsabel) : defaultUser);
      setTasks(savedIsabelTasks ? JSON.parse(savedIsabelTasks) : isabelTasks);
    }
  };

  const taskEditHandler = (id: string) => {
    handleEditTask(id, setCurrentTask, setTaskDialogOpen);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.category === filter;
  });

  // Determine theme color based on user
  const isIsabel = user.id === defaultUser.id;

  return (
    <div className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <UserHeader 
        userName={user.name}
        onSwitchUser={handleSwitchUser}
        alternateUserName={user.id === defaultUser.id ? 'Zozo' : 'Isabel'}
        userTheme={isIsabel ? 'pink' : 'blue'}
      />
      
      <UserCard 
        name={`Dina poäng`}
        points={user.points}
        completedTasks={tasks.filter(t => t.completed).length}
        stars={user.stars}
        onEdit={() => setUserDialogOpen(true)}
        userTheme={isIsabel ? 'pink' : 'blue'}
      />
      
      <SectionHeader 
        icon={<Calendar size={20} />} 
        title="Veckoöversikt"
        userTheme={isIsabel ? 'pink' : 'blue'}
      >
        <div className="glass-card p-4">
          <p className="text-gray-400 text-center">Statistik kommer snart...</p>
        </div>
      </SectionHeader>
      
      <SectionHeader 
        icon={<Trophy size={20} />} 
        title="Prestationer" 
        subtitle={`${user.stars}/5`}
        userTheme={isIsabel ? 'pink' : 'blue'}
      >
        <div className="glass-card p-4">
          <p className="text-gray-400 text-center">Prestationer kommer snart...</p>
        </div>
      </SectionHeader>
      
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-4">Mina uppgifter</h2>
        
        <FilterBar filter={filter} setFilter={setFilter} userTheme={isIsabel ? 'pink' : 'blue'} />
        
        <TaskList 
          filter={filter}
          tasks={tasks}
          onComplete={handleCompleteTask}
          onEdit={taskEditHandler}
          userTheme={isIsabel ? 'pink' : 'blue'}
        />
        
        <ActionButtons 
          onReset={handleResetTasks}
          onAddTask={handleAddTask}
          userTheme={isIsabel ? 'pink' : 'blue'}
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
