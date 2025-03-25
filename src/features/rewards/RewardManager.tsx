
import React, { useState, useEffect } from 'react';
import RewardsDialog, { Reward } from '@/components/RewardsDialog';
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
import { toast } from 'sonner';

interface RewardManagerProps {
  onSaveReward: (reward: Reward) => void;
  onDeleteReward?: (id: string) => void;
}

// Create a type that includes static properties
interface RewardManagerComponent extends React.FC<RewardManagerProps> {
  openAddRewardDialog: () => void;
  openEditRewardDialog: (id: string, rewards: Reward[]) => void;
  openDeleteRewardDialog: (id: string, title: string) => void;
}

// Static methods for opening dialogs from anywhere
let openAddRewardDialogFn: () => void = () => {};
let openEditRewardDialogFn: (id: string, rewards: Reward[]) => void = () => {};
let openDeleteRewardDialogFn: (id: string, title: string) => void = () => {};

const RewardManager: React.FC<RewardManagerProps> = ({ onSaveReward, onDeleteReward }) => {
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rewardToDelete, setRewardToDelete] = useState<{id: string, title: string} | null>(null);
  
  // Register the static methods
  useEffect(() => {
    openAddRewardDialogFn = () => {
      setCurrentReward(undefined);
      setRewardDialogOpen(true);
    };
    
    openEditRewardDialogFn = (id: string, rewards: Reward[]) => {
      try {
        const rewardToEdit = rewards.find(reward => reward.id === id);
        if (rewardToEdit) {
          setCurrentReward({ ...rewardToEdit });
          setRewardDialogOpen(true);
        } else {
          console.warn(`No reward found with id: ${id}`);
        }
      } catch (error) {
        console.error('Error in openEditRewardDialog:', error);
        toast.error('Ett fel uppstod när belöningen skulle redigeras');
      }
    };
    
    openDeleteRewardDialogFn = (id: string, title: string) => {
      try {
        setRewardToDelete({id, title});
        setDeleteDialogOpen(true);
      } catch (error) {
        console.error('Error in openDeleteRewardDialog:', error);
        toast.error('Ett fel uppstod när belöningen skulle raderas');
      }
    };
    
    return () => {
      openAddRewardDialogFn = () => {};
      openEditRewardDialogFn = () => {};
      openDeleteRewardDialogFn = () => {};
    };
  }, []);
  
  const handleConfirmDelete = () => {
    try {
      if (rewardToDelete && onDeleteReward) {
        onDeleteReward(rewardToDelete.id);
        handleCancelDelete();
      }
    } catch (error) {
      console.error('Error in handleConfirmDelete:', error);
      toast.error('Ett fel uppstod när belöningen skulle raderas');
      handleCancelDelete();
    }
  };
  
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setRewardToDelete(null);
  };
  
  const handleCloseRewardDialog = () => {
    setRewardDialogOpen(false);
    // Reset current reward after dialog is closed to prevent stale state
    setTimeout(() => {
      setCurrentReward(undefined);
    }, 100);
  };
  
  return (
    <>
      <RewardsDialog
        open={rewardDialogOpen}
        onClose={handleCloseRewardDialog}
        onSave={(updatedReward) => {
          onSaveReward(updatedReward);
          setRewardDialogOpen(false);
        }}
        reward={currentReward}
        isEditing={!!currentReward}
      />
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={(open) => {
        if (!open) {
          handleCancelDelete();
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Radera belöning</AlertDialogTitle>
            <AlertDialogDescription>
              Vill du verkligen radera belöningen "{rewardToDelete?.title}"? 
              Denna åtgärd kan inte ångras.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Avbryt</AlertDialogCancel>
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

// Define static methods
(RewardManager as RewardManagerComponent).openAddRewardDialog = () => openAddRewardDialogFn();
(RewardManager as RewardManagerComponent).openEditRewardDialog = (id: string, rewards: Reward[]) => 
  openEditRewardDialogFn(id, rewards);
(RewardManager as RewardManagerComponent).openDeleteRewardDialog = (id: string, title: string) => 
  openDeleteRewardDialogFn(id, title);

export default RewardManager as RewardManagerComponent;
