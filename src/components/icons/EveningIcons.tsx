
import React from 'react';
import { Package, Droplet, Smile, Shirt, Book, Pencil, Moon, Heart } from 'lucide-react';
import IconContainer from './IconContainer';
import { CustomIconProps } from './types';

export const renderEveningIcon = (icon: string, props: CustomIconProps) => {
  const { size = 20, isHovered = false } = props;
  
  const emojiClass = `absolute transition-all duration-300 ${
    isHovered ? 'scale-125 animate-bounce' : ''
  }`;
  
  switch (icon) {
    case 'tidybox':
      return (
        <IconContainer isHovered={isHovered}>
          <Package 
            size={size} 
            className={`text-amber-400 transition-transform ${isHovered ? 'rotate-3' : ''}`}
          />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>😊</span>
        </IconContainer>
      );
    case 'shower':
      return (
        <IconContainer isHovered={isHovered}>
          <Droplet 
            size={size} 
            className={`text-blue-400 ${isHovered ? 'animate-bounce' : ''}`}
          />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>😊</span>
        </IconContainer>
      );
    case 'eveningtoothbrush':
      return (
        <IconContainer isHovered={isHovered}>
          <Smile 
            size={size} 
            className={`text-yellow-400 transition-transform ${isHovered ? 'scale-110' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>⭐</span>
        </IconContainer>
      );
    case 'clothes':
      return (
        <IconContainer isHovered={isHovered}>
          <Shirt 
            size={size} 
            className={`text-purple-400 transition-transform ${isHovered ? 'rotate-6' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>🎨</span>
        </IconContainer>
      );
    case 'homework':
      return (
        <IconContainer isHovered={isHovered}>
          <Book 
            size={size} 
            className={`text-blue-400 transition-transform ${isHovered ? 'rotate-6' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-yellow-400 text-xs`}>★</span>
        </IconContainer>
      );
    case 'readwrite':
      return (
        <IconContainer isHovered={isHovered}>
          <Pencil 
            size={size} 
            className={`text-emerald-400 transition-transform ${isHovered ? 'rotate-12' : ''}`}
          />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>📝</span>
        </IconContainer>
      );
    case 'sleep':
      return (
        <IconContainer isHovered={isHovered}>
          <Moon 
            size={size} 
            className={`text-indigo-400 ${isHovered ? 'animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>✨</span>
        </IconContainer>
      );
    case 'eveningheart':
      return (
        <IconContainer isHovered={isHovered}>
          <Heart 
            size={size} 
            className={`text-pink-400 transition-transform ${isHovered ? 'scale-125 animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>🤗</span>
        </IconContainer>
      );
    default:
      return null;
  }
};
