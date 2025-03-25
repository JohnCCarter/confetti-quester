import React from 'react';
import { Package, Droplet, Smile, Shirt, Book, Pencil, Moon, Heart } from 'lucide-react';
import IconContainer from './IconContainer';
import { CustomIconProps } from './types';

export const renderStandardIcon = (icon: string, props: CustomIconProps) => {
  const { size = 20, className = "", isHovered = false } = props;
  
  const animationClass = isHovered ? 'animate-pulse' : '';
  
  switch (icon) {
    case 'tidybox':
      return (
        <IconContainer isHovered={isHovered}>
          <Package 
            size={size} 
            className={`text-amber-400 transition-all duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`}
          />
          <span className={`absolute -bottom-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>😊</span>
        </IconContainer>
      );
    case 'shower':
      return (
        <IconContainer isHovered={isHovered}>
          <Droplet 
            size={size} 
            className={`text-blue-400 transition-all duration-300 ${isHovered ? 'animate-bounce scale-110' : ''}`}
          />
          <span className={`absolute -bottom-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>😊</span>
        </IconContainer>
      );
    case 'eveningtoothbrush':
      return (
        <IconContainer isHovered={isHovered}>
          <Smile 
            size={size} 
            className={`text-yellow-400 transition-all duration-300 ${isHovered ? 'scale-125 animate-pulse' : ''}`}
          />
          <span className={`absolute -top-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>⭐</span>
        </IconContainer>
      );
    case 'clothes':
      return (
        <IconContainer isHovered={isHovered}>
          <Shirt 
            size={size} 
            className={`text-purple-400 transition-all duration-300 ${isHovered ? 'rotate-45 scale-110' : ''}`}
          />
          <span className={`absolute -top-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>🎨</span>
        </IconContainer>
      );
    case 'homework':
      return (
        <IconContainer isHovered={isHovered}>
          <Book 
            size={size} 
            className={`text-blue-400 transition-all duration-300 ${isHovered ? 'rotate-12 scale-125' : ''}`}
          />
          <span className={`absolute -top-1 -right-1 text-yellow-400 text-xs transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>★</span>
        </IconContainer>
      );
    case 'readwrite':
      return (
        <IconContainer isHovered={isHovered}>
          <Pencil 
            size={size} 
            className={`text-emerald-400 transition-all duration-300 ${isHovered ? 'rotate-45 scale-110' : ''}`}
          />
          <span className={`absolute -bottom-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>📝</span>
        </IconContainer>
      );
    case 'sleep':
      return (
        <IconContainer isHovered={isHovered}>
          <Moon 
            size={size} 
            className={`text-indigo-400 transition-all duration-300 ${isHovered ? 'animate-pulse scale-125' : ''}`}
          />
          <span className={`absolute -top-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>✨</span>
        </IconContainer>
      );
    case 'eveningheart':
      return (
        <IconContainer isHovered={isHovered}>
          <Heart 
            size={size} 
            className={`text-pink-400 transition-all duration-300 ${isHovered ? 'scale-125 animate-[beat_1s_ease-in-out_infinite]' : ''}`}
          />
          <span className={`absolute -top-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>🤗</span>
        </IconContainer>
      );
    
    case 'lovable':
      return (
        <IconContainer isHovered={isHovered}>
          <Heart 
            size={size} 
            className={`text-pink-500 transition-all duration-300 ${isHovered ? 'scale-125 animate-pulse' : ''}`}
          />
          <span className={`absolute -top-1 -right-1 text-[8px] transition-all duration-300 ${isHovered ? 'scale-125 animate-bounce' : ''}`}>✨</span>
        </IconContainer>
      );
      
    default:
      return <div className={`w-${size} h-${size} ${className}`} />;
  }
};
