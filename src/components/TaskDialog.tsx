
import React, { useState, useEffect } from 'react';
import { X, Shirt, Bed, Coffee, Droplet, Home, Book, Heart, Pencil, Moon, Scissors, Utensils, Smile } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface Task {
  id: string;
  title: string;
  icon: string;
  points: number;
  completed: boolean;
  category: 'morning' | 'evening';
}

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task;
  isEditing?: boolean;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ 
  open, 
  onClose, 
  onSave, 
  task, 
  isEditing = false 
}) => {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(1);
  const [icon, setIcon] = useState<string>('coffee');
  const [category, setCategory] = useState<'morning' | 'evening'>('morning');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPoints(task.points);
      setIcon(task.icon);
      setCategory(task.category);
    } else {
      setTitle('');
      setPoints(1);
      setIcon('coffee');
      setCategory('morning');
    }
  }, [task, open]);

  const handleSave = () => {
    if (!title.trim()) return;
    
    const newTask: Task = {
      id: task ? task.id : Date.now().toString(),
      title: title.trim(),
      icon,
      points,
      completed: task ? task.completed : false,
      category
    };
    
    onSave(newTask);
    onClose();
  };

  const icons = [
    { id: 'coffee', component: <Coffee size={24} className="text-amber-400" /> },
    { id: 'shirt', component: <Shirt size={24} className="text-blue-400" /> },
    { id: 'bed', component: <Bed size={24} className="text-indigo-400" /> },
    { id: 'scissors', component: <Scissors size={24} className="text-purple-400" /> },
    { id: 'smile', component: <Smile size={24} className="text-yellow-400" /> },
    { id: 'utensils', component: <Utensils size={24} className="text-orange-400" /> },
    { id: 'droplet', component: <Droplet size={24} className="text-blue-400" /> },
    { id: 'home', component: <Home size={24} className="text-green-400" /> },
    { id: 'book', component: <Book size={24} className="text-purple-400" /> },
    { id: 'heart', component: <Heart size={24} className="text-red-400" /> },
    { id: 'pencil', component: <Pencil size={24} className="text-yellow-400" /> },
    { id: 'moon', component: <Moon size={24} className="text-indigo-400" /> }
  ];

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-task-DEFAULT border-gray-700 max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-center text-xl">
            {isEditing ? 'Redigera uppgift' : 'Lägg till uppgift'}
          </DialogTitle>
          <button 
            className="absolute right-0 top-0 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Titel</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-app-pink"
              placeholder="Uppgift titel"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Ikon</label>
            <div className="flex flex-wrap gap-2">
              {icons.map((item) => (
                <button
                  key={item.id}
                  className={`w-12 h-12 rounded-md flex items-center justify-center transition-colors ${
                    icon === item.id ? 'bg-gray-700 ring-2 ring-app-pink' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => setIcon(item.id)}
                >
                  {item.component}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Kategori</label>
            <div className="flex rounded-md overflow-hidden border border-gray-700">
              <button
                className={`flex-1 py-2 px-4 transition-colors ${
                  category === 'morning' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => setCategory('morning')}
              >
                Morgon
              </button>
              <button
                className={`flex-1 py-2 px-4 transition-colors ${
                  category === 'evening' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => setCategory('evening')}
              >
                Kväll
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Poäng</label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-app-pink"
            />
          </div>
          
          <button
            className="w-full bg-app-pink hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            onClick={handleSave}
          >
            {isEditing ? 'Spara ändringar' : 'Lägg till'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
