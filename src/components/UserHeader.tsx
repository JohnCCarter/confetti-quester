
import React, { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface UserHeaderProps {
  userName: string;
  onSwitchUser: () => void;
  alternateUserName: string;
  userTheme?: 'pink' | 'blue';
}

const UserHeader: React.FC<UserHeaderProps> = ({ 
  userName, 
  onSwitchUser, 
  alternateUserName,
  userTheme = 'pink'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  const bgColorClass = userTheme === 'pink' ? 'bg-app-pink' : 'bg-app-blue';
  const buttonColorClass = userTheme === 'pink' ? 'bg-blue-600/20' : 'bg-pink-600/20';

  return (
    <div 
      className={`glass-card mb-6 p-3 sm:p-4 relative transition-all duration-300 ${
        isHovered ? 'shadow-lg transform translate-y-[-2px]' : 'hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center flex-wrap sm:flex-nowrap">
        <div className={`w-10 h-10 rounded-full ${bgColorClass} flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
          <UserIcon size={20} className="text-white" />
        </div>
        <div className="ml-3 flex-1">
          <h1 className={`text-lg sm:text-xl font-bold ${isHovered ? userTheme === 'pink' ? 'text-app-pink' : 'text-app-blue' : ''}`}>{userName}s Lista</h1>
          <p className="text-xs sm:text-sm text-gray-400">Slutför uppgifter och samla poäng!</p>
        </div>
        <div className="ml-auto flex items-center space-x-2 mt-2 sm:mt-0 w-full sm:w-auto justify-end">
          <button 
            className={`${buttonColorClass} text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm transition-all duration-300 ${
              isButtonHovered ? 'transform scale-105 shadow-md' : ''
            }`}
            onClick={onSwitchUser}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onTouchStart={() => setIsButtonHovered(true)}
            onTouchEnd={() => setIsButtonHovered(false)}
          >
            Byt till {alternateUserName}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserHeader);
