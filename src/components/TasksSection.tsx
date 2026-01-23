
import React from 'react';
import FilterBar from './FilterBar';
import TaskList from './TaskList';
import ActionButtons from './ActionButtons';
import { Task } from './TaskDialog';

interface TasksSectionProps {
  filter: 'all' | 'morning' | 'evening';
  setFilter: (filter: 'all' | 'morning' | 'evening') => void;
  tasks: Task[];
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  onReset: () => void;
  onAddTask: () => void;
  userTheme: 'pink' | 'blue';
}

const TasksSection: React.FC<TasksSectionProps> = ({
  filter,
  setFilter,
  tasks,
  onComplete,
  onEdit,
  onDelete,
  onReset,
  onAddTask,
  userTheme
}) => {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold mb-4 md:text-2xl">Mina uppgifter</h2>
      
      <FilterBar filter={filter} setFilter={setFilter} userTheme={userTheme} />
      
      <div className="overflow-x-hidden">
        <TaskList 
          filter={filter}
          tasks={tasks}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          userTheme={userTheme}
        />
      </div>
      
      <ActionButtons 
        onReset={onReset}
        onAddTask={onAddTask}
        userTheme={userTheme}
      />
    </div>
  );
};

export default React.memo(TasksSection);
