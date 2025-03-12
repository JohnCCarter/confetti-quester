
import React from 'react';
import { Bed, Shirt, Scissors, Utensils, Smile, Heart } from 'lucide-react';
import IconContainer from './IconContainer';
import { CustomIconProps } from './types';

export const renderMorningIcon = (icon: string, props: CustomIconProps) => {
  const { size = 20, isHovered = false } = props;
  
  const emojiClass = `absolute transition-all duration-300 ${
    isHovered ? 'scale-125 animate-bounce' : ''
  }`;
  
  switch (icon) {
    case 'bed':
      return (
        <IconContainer isHovered={isHovered}>
          <Bed size={size} className={`text-indigo-400 ${isHovered ? 'animate-pulse' : ''}`} />
          <span className={`${emojiClass} -top-1 -right-1 text-yellow-400 text-xs`}>★</span>
        </IconContainer>
      );
    case 'shirt':
      return (
        <IconContainer isHovered={isHovered}>
          <Shirt size={size} className={`text-blue-400 ${isHovered ? 'rotate-6' : ''}`} />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>😊</span>
        </IconContainer>
      );
    case 'hairbrush':
      return (
        <IconContainer isHovered={isHovered}>
          <Scissors 
            size={size} 
            className={`text-purple-400 transition-transform ${isHovered ? 'rotate-12' : ''}`} 
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>😊</span>
        </IconContainer>
      );
    case 'breakfast':
      return (
        <IconContainer isHovered={isHovered}>
          <Utensils 
            size={size} 
            className={`text-orange-400 ${isHovered ? 'animate-[wiggle_1s_ease-in-out_infinite]' : ''}`}
          />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>🍽️</span>
        </IconContainer>
      );
    case 'toothbrush':
      return (
        <IconContainer isHovered={isHovered}>
          <Smile 
            size={size} 
            className={`text-teal-400 transition-transform ${isHovered ? 'scale-110' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-yellow-400 text-xs`}>✨</span>
        </IconContainer>
      );
    case 'jacket':
      return (
        <IconContainer isHovered={isHovered}>
          <Shirt 
            size={size} 
            className={`text-teal-400 transition-transform ${isHovered ? 'rotate-6' : ''}`}
          />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>😊</span>
        </IconContainer>
      );
    case 'heart':
      return (
        <IconContainer isHovered={isHovered}>
          <Heart 
            size={size} 
            className={`text-red-400 transition-transform ${isHovered ? 'scale-125 animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>🤗</span>
        </IconContainer>
      );
    default:
      return null;
  }
};
