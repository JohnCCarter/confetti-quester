
import React, { useState, useEffect } from 'react';
import UserDialog, { User } from '@/components/UserDialog';

interface UserManagerProps {
  user: User;
  onSaveUser: (user: User) => void;
}

// Static methods for opening dialogs from anywhere
let openUserDialogFn: () => void = () => {};

const UserManager: React.FC<UserManagerProps> = ({ user, onSaveUser }) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  
  // Register the static methods
  useEffect(() => {
    UserManager.openUserDialog = () => {
      setUserDialogOpen(true);
    };
    
    return () => {
      UserManager.openUserDialog = () => {};
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

// Static methods
UserManager.openUserDialog = () => openUserDialogFn();

export default UserManager;
