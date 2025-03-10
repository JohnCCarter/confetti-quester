
import React, { useState, useEffect } from 'react';
import TaskDialog, { Task } from '@/components/TaskDialog';

interface TaskManagerProps {
  onSaveTask: (task: Task) => void;
}

// Static methods for opening dialogs from anywhere
let openAddTaskDialogFn: () => void = () => {};
let openEditTaskDialogFn: (id: string, tasks: Task[]) => void = () => {};

const TaskManager: React.FC<TaskManagerProps> = ({ onSaveTask }) => {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  
  // Register the static methods
  useEffect(() => {
    TaskManager.openAddTaskDialog = () => {
      setCurrentTask(undefined);
      setTaskDialogOpen(true);
    };
    
    TaskManager.openEditTaskDialog = (id: string, tasks: Task[]) => {
      const taskToEdit = tasks.find(task => task.id === id);
      if (taskToEdit) {
        setCurrentTask(taskToEdit);
        setTaskDialogOpen(true);
      }
    };
    
    return () => {
      TaskManager.openAddTaskDialog = () => {};
      TaskManager.openEditTaskDialog = () => {};
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

// Static methods
TaskManager.openAddTaskDialog = () => openAddTaskDialogFn();
TaskManager.openEditTaskDialog = (id: string, tasks: Task[]) => openEditTaskDialogFn(id, tasks);

export default TaskManager;
