
import React, { useState, useEffect } from 'react';
import UserDialog, { User } from '@/components/UserDialog';

interface UserManagerProps {
  user: User;
  onSaveUser: (user: User) => void;
}

const UserManager: React.FC<UserManagerProps> = ({ user, onSaveUser }) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  
  // Register the static method
  useEffect(() => {
    openUserDialogFn = () => {
      setUserDialogOpen(true);
    };
    
    return () => {
      openUserDialogFn = () => {};
    };
  }, []);
  
  return (
    <UserDialog
      open={userDialogOpen}
      onClose={() => setUserDialogOpen(false)}
      onSave={onSaveUser}
      user={user}
    />
  );
};

// Static methods for opening dialogs from anywhere
let openUserDialogFn: () => void = () => {};

// Static method that can be called from anywhere
UserManager.openUserDialog = () => openUserDialogFn();

export default UserManager;
