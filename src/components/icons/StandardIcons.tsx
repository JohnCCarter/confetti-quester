
import React from 'react';
import { Shirt, Bed, Utensils, Droplet, Home, Book, Heart, Pencil, Moon, Scissors, Smile, Package } from 'lucide-react';
import IconContainer from './IconContainer';
import { CustomIconProps } from './types';

export const renderStandardIcon = (icon: string, props: CustomIconProps) => {
  const { size = 20, isHovered = false, className = "" } = props;
  
  const iconClass = className;
  
  switch (icon) {
    case 'shirt':
      return (
        <IconContainer isHovered={isHovered}>
          <Shirt size={size} className={`text-blue-400 ${iconClass} ${isHovered ? 'rotate-6' : ''}`} />
        </IconContainer>
      );
    case 'bed':
      return (
        <IconContainer isHovered={isHovered}>
          <Bed size={size} className={`text-indigo-400 ${iconClass} ${isHovered ? 'animate-pulse' : ''}`} />
        </IconContainer>
      );
    case 'coffee':
      return (
        <IconContainer isHovered={isHovered}>
          <Utensils size={size} className={`text-amber-400 ${iconClass} ${isHovered ? 'rotate-6' : ''}`} />
        </IconContainer>
      );
    case 'droplet':
      return (
        <IconContainer isHovered={isHovered}>
          <Droplet size={size} className={`text-blue-400 ${iconClass} ${isHovered ? 'animate-bounce' : ''}`} />
        </IconContainer>
      );
    case 'home':
      return (
        <IconContainer isHovered={isHovered}>
          <Home size={size} className={`text-green-400 ${iconClass} ${isHovered ? 'scale-110' : ''}`} />
        </IconContainer>
      );
    case 'book':
      return (
        <IconContainer isHovered={isHovered}>
          <Book size={size} className={`text-purple-400 ${iconClass} ${isHovered ? 'rotate-3' : ''}`} />
        </IconContainer>
      );
    case 'heart':
      return (
        <IconContainer isHovered={isHovered}>
          <Heart size={size} className={`text-red-400 ${iconClass} ${isHovered ? 'scale-125 animate-pulse' : ''}`} />
        </IconContainer>
      );
    case 'pencil':
      return (
        <IconContainer isHovered={isHovered}>
          <Pencil size={size} className={`text-yellow-400 ${iconClass} ${isHovered ? 'rotate-12' : ''}`} />
        </IconContainer>
      );
    case 'moon':
      return (
        <IconContainer isHovered={isHovered}>
          <Moon size={size} className={`text-indigo-400 ${iconClass} ${isHovered ? 'animate-pulse' : ''}`} />
        </IconContainer>
      );
    case 'scissors':
      return (
        <IconContainer isHovered={isHovered}>
          <Scissors size={size} className={`text-purple-400 ${iconClass} ${isHovered ? 'rotate-12' : ''}`} />
        </IconContainer>
      );
    case 'utensils':
      return (
        <IconContainer isHovered={isHovered}>
          <Utensils size={size} className={`text-orange-400 ${iconClass} ${isHovered ? 'rotate-6' : ''}`} />
        </IconContainer>
      );
    case 'smile':
      return (
        <IconContainer isHovered={isHovered}>
          <Smile size={size} className={`text-yellow-400 ${iconClass} ${isHovered ? 'scale-110' : ''}`} />
        </IconContainer>
      );
    default:
      return (
        <IconContainer isHovered={isHovered}>
          <Package size={size} className={`text-gray-400 ${iconClass} ${isHovered ? 'rotate-3' : ''}`} />
        </IconContainer>
      );
  }
};
