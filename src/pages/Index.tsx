import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Trophy, AlarmClock, Moon, Plus, RotateCcw, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import UserCard from '@/components/UserCard';
import SectionHeader from '@/components/SectionHeader';
import TaskItem from '@/components/TaskItem';
import Confetti from '@/components/Confetti';
import TaskDialog, { Task } from '@/components/TaskDialog';
import UserDialog, { User } from '@/components/UserDialog';
import ThemeToggle from '@/components/ThemeToggle';

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

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('user', JSON.stringify(user));
  }, [tasks, user]);

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

  const handleEditTask = (id: string) => {
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

  const handleResetTasks = () => {
    const updatedTasks = tasks.map(task => ({ ...task, completed: false }));
    setTasks(updatedTasks);
    toast.success('Uppgifter har återställts!');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.category === filter;
  });

  const morningTasks = tasks.filter(task => task.category === 'morning');
  const eveningTasks = tasks.filter(task => task.category === 'evening');
  
  const completedMorningTasks = morningTasks.filter(task => task.completed).length;
  const completedEveningTasks = eveningTasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <div className="glass-card mb-6 p-4 relative">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-app-pink flex items-center justify-center">
            <UserIcon size={20} className="text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold">{user.name}s Lista</h1>
            <p className="text-sm text-gray-400">Slutför uppgifter och samla poäng!</p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <button 
              className="bg-blue-600/20 text-white px-3 py-1 rounded-full text-sm"
              onClick={handleSwitchUser}
            >
              Byt till {user.id === defaultUser.id ? 'Zozo' : 'Isabel'}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
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
        
        <div className="glass-card flex mb-4 rounded-lg overflow-hidden">
          <button 
            className={`task-filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Alla
          </button>
          <button 
            className={`task-filter-button ${filter === 'morning' ? 'active' : ''}`}
            onClick={() => setFilter('morning')}
          >
            <AlarmClock size={14} className="inline mr-1" />
            Morgon
          </button>
          <button 
            className={`task-filter-button ${filter === 'evening' ? 'active' : ''}`}
            onClick={() => setFilter('evening')}
          >
            <Moon size={14} className="inline mr-1" />
            Kväll
          </button>
        </div>
        
        {(filter === 'all' || filter === 'morning') && morningTasks.length > 0 && (
          <div className="mb-4">
            <div className="section-header">
              <AlarmClock size={16} className="mr-2" />
              <h3 className="text-sm font-medium">Morgonrutiner</h3>
              <span className="ml-2 text-xs text-gray-400">
                {completedMorningTasks}/{morningTasks.length}
              </span>
            </div>
            
            <div>
              {morningTasks.map(task => (
                <div id={`task-${task.id}`} key={task.id}>
                  <TaskItem
                    id={task.id}
                    title={task.title}
                    icon={task.icon}
                    points={task.points}
                    completed={task.completed}
                    onComplete={handleCompleteTask}
                    onEdit={handleEditTask}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {(filter === 'all' || filter === 'evening') && eveningTasks.length > 0 && (
          <div className="mb-4">
            <div className="section-header">
              <Moon size={16} className="mr-2" />
              <h3 className="text-sm font-medium">Kvällsrutiner</h3>
              <span className="ml-2 text-xs text-gray-400">
                {completedEveningTasks}/{eveningTasks.length}
              </span>
            </div>
            
            <div>
              {eveningTasks.map(task => (
                <div id={`task-${task.id}`} key={task.id}>
                  <TaskItem
                    id={task.id}
                    title={task.title}
                    icon={task.icon}
                    points={task.points}
                    completed={task.completed}
                    onComplete={handleCompleteTask}
                    onEdit={handleEditTask}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {filteredTasks.length === 0 && (
          <div className="glass-card p-4 text-center text-gray-400">
            Inga uppgifter hittades
          </div>
        )}
        
        <div className="flex justify-between mt-4">
          <button 
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            onClick={handleResetTasks}
          >
            <RotateCcw size={16} className="mr-2" />
            Återställ
          </button>
          
          <button 
            className="bg-app-pink hover:bg-pink-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            onClick={handleAddTask}
          >
            <Plus size={16} className="mr-2" />
            Lägg till uppgift
          </button>
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
