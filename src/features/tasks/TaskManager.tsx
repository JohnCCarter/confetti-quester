
import React, { useState, useEffect } from 'react';
import TaskDialog, { Task } from '@/components/TaskDialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TaskManagerProps {
  onSaveTask: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
}

// Skapa en typ som inkluderar statiska egenskaper
interface TaskManagerComponent extends React.FC<TaskManagerProps> {
  openAddTaskDialog: () => void;
  openEditTaskDialog: (id: string, tasks: Task[]) => void;
  openDeleteTaskDialog: (id: string, title: string) => void;
}

// Static methods for opening dialogs from anywhere
let openAddTaskDialogFn: () => void = () => {};
let openEditTaskDialogFn: (id: string, tasks: Task[]) => void = () => {};
let openDeleteTaskDialogFn: (id: string, title: string) => void = () => {};

const TaskManager: React.FC<TaskManagerProps> = ({ onSaveTask, onDeleteTask }) => {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{id: string, title: string} | null>(null);
  
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
    
    openDeleteTaskDialogFn = (id: string, title: string) => {
      setTaskToDelete({id, title});
      setDeleteDialogOpen(true);
    };
    
    return () => {
      openAddTaskDialogFn = () => {};
      openEditTaskDialogFn = () => {};
      openDeleteTaskDialogFn = () => {};
    };
  }, []);
  
  const handleConfirmDelete = () => {
    if (taskToDelete && onDeleteTask) {
      onDeleteTask(taskToDelete.id);
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };
  
  return (
    <>
      <TaskDialog
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
        onSave={onSaveTask}
        task={currentTask}
        isEditing={!!currentTask}
      />
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Radera uppgift</AlertDialogTitle>
            <AlertDialogDescription>
              Vill du verkligen radera uppgiften "{taskToDelete?.title}"? 
              Denna åtgärd kan inte ångras.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setTaskToDelete(null)}>Avbryt</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Radera
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Definiera statiska metoder
(TaskManager as TaskManagerComponent).openAddTaskDialog = () => openAddTaskDialogFn();
(TaskManager as TaskManagerComponent).openEditTaskDialog = (id: string, tasks: Task[]) => openEditTaskDialogFn(id, tasks);
(TaskManager as TaskManagerComponent).openDeleteTaskDialog = (id: string, title: string) => openDeleteTaskDialogFn(id, title);

export default TaskManager as TaskManagerComponent;
