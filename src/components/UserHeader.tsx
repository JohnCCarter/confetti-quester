
import React from 'react';
import { User as UserIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface UserHeaderProps {
  userName: string;
  onSwitchUser: () => void;
  alternateUserName: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ 
  userName, 
  onSwitchUser, 
  alternateUserName 
}) => {
  return (
    <div className="glass-card mb-6 p-4 relative">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-app-pink flex items-center justify-center">
          <UserIcon size={20} className="text-white" />
        </div>
        <div className="ml-3">
          <h1 className="text-xl font-bold">{userName}s Lista</h1>
          <p className="text-sm text-gray-400">Slutför uppgifter och samla poäng!</p>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <button 
            className="bg-blue-600/20 text-white px-3 py-1 rounded-full text-sm"
            onClick={onSwitchUser}
          >
            Byt till {alternateUserName}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
