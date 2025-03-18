
import React, { useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ActionButtonsProps {
  onReset: () => void;
  onAddTask: () => void;
  userTheme?: 'pink' | 'blue';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onReset, onAddTask, userTheme = 'pink' }) => {
  const [resetHovered, setResetHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  
  const buttonColorClass = userTheme === 'pink' ? 'bg-app-pink hover:bg-pink-600' : 'bg-app-blue hover:bg-blue-600';

  return (
    <div className="flex justify-between mt-4 md:mt-6 md:max-w-lg md:mx-auto">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button 
            className={`bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md flex items-center transition-all duration-300 text-sm md:px-6 md:py-3 md:text-lg
              ${resetHovered ? 'transform scale-105 shadow-md' : ''}`}
            onMouseEnter={() => setResetHovered(true)}
            onMouseLeave={() => setResetHovered(false)}
            onTouchStart={() => setResetHovered(true)}
            onTouchEnd={() => setResetHovered(false)}
          >
            <RotateCcw size={16} className={`mr-1 md:mr-2 transition-transform duration-300 md:size-5 ${resetHovered ? 'rotate-180' : ''}`} />
            Återställ
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Vill du verkligen återställa?</AlertDialogTitle>
            <AlertDialogDescription>
              Detta kommer att återställa alla uppgifter, poäng, prestationer och belöningar till ursprungligt läge.
              Denna åtgärd kan inte ångras.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction onClick={onReset} className={userTheme === 'pink' ? 'bg-app-pink hover:bg-pink-600' : 'bg-app-blue hover:bg-blue-600'}>
              Ja, återställ allt
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <button 
        className={`${buttonColorClass} text-white px-3 py-2 rounded-md flex items-center transition-all duration-300 text-sm md:px-6 md:py-3 md:text-lg
          ${addHovered ? 'transform scale-105 shadow-md' : ''}`}
        onClick={onAddTask}
        onMouseEnter={() => setAddHovered(true)}
        onMouseLeave={() => setAddHovered(false)}
        onTouchStart={() => setAddHovered(true)}
        onTouchEnd={() => setAddHovered(false)}
      >
        <Plus size={16} className={`mr-1 md:mr-2 transition-transform duration-300 md:size-5 ${addHovered ? 'rotate-90' : ''}`} />
        Lägg till uppgift
      </button>
    </div>
  );
};

export default ActionButtons;
