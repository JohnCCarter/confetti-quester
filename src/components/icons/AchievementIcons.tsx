
import React from 'react';
import { Trophy, Award } from 'lucide-react';
import IconContainer from './IconContainer';
import { CustomIconProps } from './types';

export const renderAchievementIcon = (icon: string, props: CustomIconProps) => {
  const { size = 20, isHovered = false } = props;
  
  const emojiClass = `absolute transition-all duration-300 ${
    isHovered ? 'scale-125 animate-bounce' : ''
  }`;
  
  switch (icon) {
    case 'morning-master':
      return (
        <IconContainer isHovered={isHovered}>
          <Trophy 
            size={size} 
            className={`text-amber-400 ${isHovered ? 'animate-bounce' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-yellow-400 text-xs`}>☀️</span>
        </IconContainer>
      );
    case 'evening-princess':
      return (
        <IconContainer isHovered={isHovered}>
          <Award 
            size={size} 
            className={`text-pink-400 ${isHovered ? 'animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>👑</span>
        </IconContainer>
      );
    case 'evening-prince':
      return (
        <IconContainer isHovered={isHovered}>
          <Award 
            size={size} 
            className={`text-blue-400 ${isHovered ? 'animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>👑</span>
        </IconContainer>
      );
    case 'on-track':
      return (
        <IconContainer isHovered={isHovered}>
          <Trophy 
            size={size} 
            className={`text-emerald-400 transition-transform ${isHovered ? 'rotate-6' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-yellow-400 text-xs`}>★</span>
        </IconContainer>
      );
    case 'superstar':
      return (
        <IconContainer isHovered={isHovered}>
          <Trophy 
            size={size} 
            className={`text-yellow-400 ${isHovered ? 'animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>🏆</span>
        </IconContainer>
      );
    case 'rewarded':
      return (
        <IconContainer isHovered={isHovered}>
          <Award 
            size={size} 
            className={`text-purple-400 ${isHovered ? 'animate-bounce' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>🎁</span>
        </IconContainer>
      );
    default:
      return null;
  }
};
