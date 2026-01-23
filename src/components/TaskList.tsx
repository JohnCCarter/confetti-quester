
import React, { useState, useMemo } from 'react';
import { AlarmClock, Moon } from 'lucide-react';
import TaskItem from '@/components/TaskItem';
import { Task } from '@/components/TaskDialog';

interface TaskListProps {
  filter: 'all' | 'morning' | 'evening';
  tasks: Task[];
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  userTheme?: 'pink' | 'blue';
}

const TaskList: React.FC<TaskListProps> = ({ 
  filter, 
  tasks, 
  onComplete, 
  onEdit, 
  onDelete,
  userTheme = 'pink' 
}) => {
  const [hoveredSection, setHoveredSection] = useState<'morning' | 'evening' | null>(null);
  
  // Memoize task filtering to avoid recalculation on every render
  const { morningTasks, eveningTasks, completedMorningTasks, completedEveningTasks } = useMemo(() => {
    const morning = tasks.filter(task => task.category === 'morning');
    const evening = tasks.filter(task => task.category === 'evening');
    const completedMorning = morning.filter(task => task.completed).length;
    const completedEvening = evening.filter(task => task.completed).length;
    
    return {
      morningTasks: morning,
      eveningTasks: evening,
      completedMorningTasks: completedMorning,
      completedEveningTasks: completedEvening
    };
  }, [tasks]);

  const textColorClass = userTheme === 'pink' ? 'text-app-pink' : 'text-app-blue';

  return (
    <>
      {(filter === 'all' || filter === 'morning') && morningTasks.length > 0 && (
        <div 
          className={`mb-4 transition-all duration-300 ${hoveredSection === 'morning' ? 'transform scale-[1.01]' : ''}`}
          onMouseEnter={() => setHoveredSection('morning')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="section-header">
            <AlarmClock size={16} className={`mr-2 ${textColorClass} transition-transform duration-300 ${hoveredSection === 'morning' ? 'scale-110' : ''}`} />
            <h3 className={`text-sm font-medium ${textColorClass}`}>Morgonrutiner</h3>
            <span className="ml-2 text-xs text-gray-400">
              {completedMorningTasks}/{morningTasks.length}
            </span>
          </div>
          
          <div>
            {morningTasks.map((task, index) => (
              <div 
                id={`task-${task.id}`} 
                key={task.id}
                className="transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 75}ms`,
                  animation: 'fade-in 0.4s ease-out forwards'
                }}
              >
                <TaskItem
                  id={task.id}
                  title={task.title}
                  icon={task.icon}
                  points={task.points}
                  completed={task.completed}
                  onComplete={onComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  userTheme={userTheme}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {(filter === 'all' || filter === 'evening') && eveningTasks.length > 0 && (
        <div 
          className={`mb-4 transition-all duration-300 ${hoveredSection === 'evening' ? 'transform scale-[1.01]' : ''}`}
          onMouseEnter={() => setHoveredSection('evening')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="section-header">
            <Moon size={16} className={`mr-2 ${textColorClass} transition-transform duration-300 ${hoveredSection === 'evening' ? 'scale-110' : ''}`} />
            <h3 className={`text-sm font-medium ${textColorClass}`}>Kvällsrutiner</h3>
            <span className="ml-2 text-xs text-gray-400">
              {completedEveningTasks}/{eveningTasks.length}
            </span>
          </div>
          
          <div>
            {eveningTasks.map((task, index) => (
              <div 
                id={`task-${task.id}`} 
                key={task.id}
                className="transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 75}ms`,
                  animation: 'fade-in 0.4s ease-out forwards'
                }}
              >
                <TaskItem
                  id={task.id}
                  title={task.title}
                  icon={task.icon}
                  points={task.points}
                  completed={task.completed}
                  onComplete={onComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  userTheme={userTheme}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Show message when no tasks are found */}
      {filter === 'all' && tasks.length === 0 && (
        <div className="glass-card p-4 text-center text-gray-400 hover:shadow-lg transition-all duration-300 animate-fade-in">
          Inga uppgifter hittades
        </div>
      )}
      
      {filter === 'morning' && morningTasks.length === 0 && (
        <div className="glass-card p-4 text-center text-gray-400 hover:shadow-lg transition-all duration-300 animate-fade-in">
          Inga morgonuppgifter hittades
        </div>
      )}
      
      {filter === 'evening' && eveningTasks.length === 0 && (
        <div className="glass-card p-4 text-center text-gray-400 hover:shadow-lg transition-all duration-300 animate-fade-in">
          Inga kvällsuppgifter hittades
        </div>
      )}
    </>
  );
};

export default React.memo(TaskList);
