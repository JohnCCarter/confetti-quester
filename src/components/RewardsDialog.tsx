import React, { useState, useEffect } from 'react';
import { X, Gift, Trophy, Star, Award, Gem, Ribbon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
}

interface RewardsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (reward: Reward) => void;
  reward?: Reward;
  isEditing?: boolean;
}

// Move icon array to module-level constant to avoid recreation on every render
const REWARD_ICONS = [
  { id: 'gift', component: <Gift size={24} className="text-purple-400" /> },
  { id: 'trophy', component: <Trophy size={24} className="text-yellow-400" /> },
  { id: 'star', component: <Star size={24} className="text-yellow-400" /> },
  { id: 'award', component: <Award size={24} className="text-orange-400" /> },
  { id: 'gem', component: <Gem size={24} className="text-blue-400" /> },
  { id: 'ribbon', component: <Ribbon size={24} className="text-pink-400" /> }
] as const;

const RewardsDialog: React.FC<RewardsDialogProps> = ({ 
  open, 
  onClose, 
  onSave, 
  reward, 
  isEditing = false 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(10);
  const [icon, setIcon] = useState<string>('gift');

  useEffect(() => {
    if (reward) {
      setTitle(reward.title);
      setDescription(reward.description);
      setPoints(reward.points);
      setIcon(reward.icon);
    } else {
      setTitle('');
      setDescription('');
      setPoints(10);
      setIcon('gift');
    }
  }, [reward, open]);

  const saveReward = () => {
    if (!title.trim()) return;
    
    const newReward: Reward = {
      id: reward ? reward.id : Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      icon,
      points
    };
    
    onSave(newReward);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-task-DEFAULT border-gray-700 max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-center text-xl">
            {isEditing ? 'Redigera belöning' : 'Lägg till belöning'}
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
              placeholder="Belöning titel"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Beskrivning</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-app-pink"
              placeholder="Kort beskrivning"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Ikon</label>
            <div className="flex flex-wrap gap-2">
              {REWARD_ICONS.map((rewardIcon) => (
                <button
                  key={rewardIcon.id}
                  className={`w-12 h-12 rounded-md flex items-center justify-center transition-colors ${
                    icon === rewardIcon.id ? 'bg-gray-700 ring-2 ring-app-pink' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => setIcon(rewardIcon.id)}
                >
                  {rewardIcon.component}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Poängkostnad</label>
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
            onClick={saveReward}
          >
            {isEditing ? 'Spara ändringar' : 'Lägg till'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardsDialog;
