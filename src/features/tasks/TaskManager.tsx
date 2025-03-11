
import React, { useState, useEffect } from 'react';
import TaskDialog, { Task } from '@/components/TaskDialog';

interface TaskManagerProps {
  onSaveTask: (task: Task) => void;
}

// Skapa en typ som inkluderar statiska egenskaper
interface TaskManagerComponent extends React.FC<TaskManagerProps> {
  openAddTaskDialog: () => void;
  openEditTaskDialog: (id: string, tasks: Task[]) => void;
}

// Static methods for opening dialogs from anywhere
let openAddTaskDialogFn: () => void = () => {};
let openEditTaskDialogFn: (id: string, tasks: Task[]) => void = () => {};

const TaskManager: React.FC<TaskManagerProps> = ({ onSaveTask }) => {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  
  // Register the static methods
  useEffect(() => {
    openAddTaskDialogFn = () => {
      setCurrentTask(undefined);
      setTaskDialogOpen(true);
    };
    
    openEditTaskDialogFn = (id: string, tasks: Task[]) => {
      const taskToEdit = tasks.find(task => task.id === id);
      if (taskToEdit) {
        setCurrentTask(taskToEdit);
        setTaskDialogOpen(true);
      }
    };
    
    return () => {
      openAddTaskDialogFn = () => {};
      openEditTaskDialogFn = () => {};
    };
  }, []);
  
  return (
    <TaskDialog
      open={taskDialogOpen}
      onClose={() => setTaskDialogOpen(false)}
      onSave={onSaveTask}
      task={currentTask}
      isEditing={!!currentTask}
    />
  );
};

// Definiera statiska metoder
(TaskManager as TaskManagerComponent).openAddTaskDialog = () => openAddTaskDialogFn();
(TaskManager as TaskManagerComponent).openEditTaskDialog = (id: string, tasks: Task[]) => openEditTaskDialogFn(id, tasks);

export default TaskManager as TaskManagerComponent;
