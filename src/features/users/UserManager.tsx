
import React, { useState, useEffect } from 'react';
import UserDialog, { User } from '@/components/UserDialog';

interface UserManagerProps {
  user: User;
  onSaveUser: (user: User) => void;
}

// Skapa en typ som inkluderar statiska egenskaper
interface UserManagerComponent extends React.FC<UserManagerProps> {
  openUserDialog: () => void;
}

// Static methods for opening dialogs from anywhere
let openUserDialogFn: () => void = () => {};

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

// Definiera statisk metod
(UserManager as UserManagerComponent).openUserDialog = () => openUserDialogFn();

export default UserManager as UserManagerComponent;
