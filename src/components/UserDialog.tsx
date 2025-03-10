
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface User {
  id: string;
  name: string;
  points: number;
  stars: number;
}

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user: User;
}

const UserDialog: React.FC<UserDialogProps> = ({ 
  open, 
  onClose, 
  onSave, 
  user 
}) => {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(1);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setStars(user.stars);
    }
  }, [user, open]);

  const handleSave = () => {
    if (!name.trim()) return;
    
    const updatedUser: User = {
      ...user,
      name: name.trim(),
      stars: stars
    };
    
    onSave(updatedUser);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-task-DEFAULT border-gray-700 max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-center text-xl">
            Redigera användare
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
            <label className="block text-sm font-medium text-gray-400 mb-1">Namn</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-app-pink"
              placeholder="Användarnamn"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Stjärnor (1-5)</label>
            <input
              type="number"
              value={stars}
              onChange={(e) => setStars(Math.min(5, Math.max(0, parseInt(e.target.value) || 0)))}
              min="0"
              max="5"
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-app-pink"
            />
          </div>
          
          <button
            className="w-full bg-app-pink hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            onClick={handleSave}
          >
            Spara ändringar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
