
import React from 'react';
import { AlarmClock, Moon } from 'lucide-react';
import TaskItem from '@/components/TaskItem';
import { Task } from '@/components/TaskDialog';

interface TaskListProps {
  filter: 'all' | 'morning' | 'evening';
  tasks: Task[];
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ filter, tasks, onComplete, onEdit }) => {
  const morningTasks = tasks.filter(task => task.category === 'morning');
  const eveningTasks = tasks.filter(task => task.category === 'evening');
  
  const completedMorningTasks = morningTasks.filter(task => task.completed).length;
  const completedEveningTasks = eveningTasks.filter(task => task.completed).length;

  return (
    <>
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
                  onComplete={onComplete}
                  onEdit={onEdit}
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
                  onComplete={onComplete}
                  onEdit={onEdit}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Show message when no tasks are found */}
      {filter === 'all' && tasks.length === 0 && (
        <div className="glass-card p-4 text-center text-gray-400">
          Inga uppgifter hittades
        </div>
      )}
      
      {filter === 'morning' && morningTasks.length === 0 && (
        <div className="glass-card p-4 text-center text-gray-400">
          Inga morgonuppgifter hittades
        </div>
      )}
      
      {filter === 'evening' && eveningTasks.length === 0 && (
        <div className="glass-card p-4 text-center text-gray-400">
          Inga kvällsuppgifter hittades
        </div>
      )}
    </>
  );
};

export default TaskList;
