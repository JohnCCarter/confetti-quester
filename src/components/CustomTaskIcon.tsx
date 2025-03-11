
import React from 'react';
import { 
  Bed, Shirt, Scissors, Utensils, Smile, Heart, Home, 
  Droplet, Book, Pencil, Moon, Package, Trophy, Award 
} from 'lucide-react';

export type CustomIconType = 
  | 'bed' | 'shirt' | 'hairbrush' | 'breakfast' | 'toothbrush' | 'jacket' 
  | 'heart' | 'tidybox' | 'shower' | 'eveningtoothbrush' | 'clothes' 
  | 'homework' | 'readwrite' | 'sleep' | 'eveningheart'
  | 'morning-master' | 'evening-princess' | 'evening-prince' | 'on-track' 
  | 'superstar' | 'rewarded' | string;

interface CustomTaskIconProps {
  icon: CustomIconType;
  className?: string;
  size?: number;
  isHovered?: boolean;
}

const CustomTaskIcon: React.FC<CustomTaskIconProps> = ({ 
  icon, 
  className = "", 
  size = 20,
  isHovered = false
}) => {
  const animationClass = isHovered ? 'scale-110' : '';
  const transitionClass = 'transition-transform duration-300';
  const iconClass = `${className} ${transitionClass} ${animationClass}`;
  
  switch (icon) {
    // Morning routine icons
    case 'bed':
      return (
        <div className={`relative ${iconClass}`}>
          <Bed size={size} className="text-indigo-400" />
          <span className="absolute -top-1 -right-1 text-yellow-400 text-xs">★</span>
        </div>
      );
    case 'shirt':
      return (
        <div className={`relative ${iconClass}`}>
          <Shirt size={size} className="text-blue-400" />
          <span className="absolute -bottom-1 -right-1 text-[8px]">😊</span>
        </div>
      );
    case 'hairbrush':
      return (
        <div className={`relative ${iconClass}`}>
          <Scissors size={size} className="text-purple-400" />
          <span className="absolute -top-1 -right-1 text-[8px]">😊</span>
        </div>
      );
    case 'breakfast':
      return (
        <div className={`relative ${iconClass}`}>
          <Utensils size={size} className="text-orange-400" />
          <span className="absolute -bottom-1 -right-1 text-[8px]">🍽️</span>
        </div>
      );
    case 'toothbrush':
      return (
        <div className={`relative ${iconClass}`}>
          <Smile size={size} className="text-teal-400" />
          <span className="absolute -top-1 -right-1 text-yellow-400 text-xs">✨</span>
        </div>
      );
    case 'jacket':
      return (
        <div className={`relative ${iconClass}`}>
          <Shirt size={size} className="text-teal-400" />
          <span className="absolute -bottom-1 -right-1 text-[8px]">😊</span>
        </div>
      );
    case 'heart':
      return (
        <div className={`relative ${iconClass}`}>
          <Heart size={size} className="text-red-400" />
          <span className="absolute -top-1 -right-1 text-[8px]">🤗</span>
        </div>
      );
      
    // Evening routine icons
    case 'tidybox':
      return (
        <div className={`relative ${iconClass}`}>
          <Package size={size} className="text-amber-400" />
          <span className="absolute -bottom-1 -right-1 text-[8px]">😊</span>
        </div>
      );
    case 'shower':
      return (
        <div className={`relative ${iconClass}`}>
          <Droplet size={size} className="text-blue-400" />
          <span className="absolute -bottom-1 -right-1 text-[8px]">😊</span>
        </div>
      );
    case 'eveningtoothbrush':
      return (
        <div className={`relative ${iconClass}`}>
          <Smile size={size} className="text-yellow-400" />
          <span className="absolute -top-1 -right-1 text-[8px]">⭐</span>
        </div>
      );
    case 'clothes':
      return (
        <div className={`relative ${iconClass}`}>
          <Shirt size={size} className="text-purple-400" />
          <span className="absolute -top-1 -right-1 text-[8px]">🎨</span>
        </div>
      );
    case 'homework':
      return (
        <div className={`relative ${iconClass}`}>
          <Book size={size} className="text-blue-400" />
          <span className="absolute -top-1 -right-1 text-yellow-400 text-xs">★</span>
        </div>
      );
    case 'readwrite':
      return (
        <div className={`relative ${iconClass}`}>
          <Pencil size={size} className="text-emerald-400" />
          <span className="absolute -bottom-1 -right-1 text-[8px]">📝</span>
        </div>
      );
    case 'sleep':
      return (
        <div className={`relative ${iconClass}`}>
          <Moon size={size} className="text-indigo-400" />
          <span className="absolute -top-1 -right-1 text-[8px]">✨</span>
        </div>
      );
    case 'eveningheart':
      return (
        <div className={`relative ${iconClass}`}>
          <Heart size={size} className="text-pink-400" />
          <span className="absolute -top-1 -right-1 text-[8px]">🤗</span>
        </div>
      );
      
    // Achievement icons
    case 'morning-master':
      return (
        <div className={`relative ${iconClass}`}>
          <Trophy size={size} className="text-amber-400" />
          <span className="absolute -top-1 -right-1 text-yellow-400 text-xs">☀️</span>
        </div>
      );
    case 'evening-princess':
      return (
        <div className={`relative ${iconClass}`}>
          <Award size={size} className="text-pink-400" />
          <span className="absolute -top-1 -right-1 text-[8px]">👑</span>
        </div>
      );
    case 'evening-prince':
      return (
        <div className={`relative ${iconClass}`}>
          <Award size={size} className="text-blue-400" />
          <span className="absolute -top-1 -right-1 text-[8px]">👑</span>
        </div>
      );
    case 'on-track':
      return (
        <div className={`relative ${iconClass}`}>
          <Trophy size={size} className="text-emerald-400" />
          <span className="absolute -top-1 -right-1 text-yellow-400 text-xs">★</span>
        </div>
      );
    case 'superstar':
      return (
        <div className={`relative ${iconClass}`}>
          <Trophy size={size} className="text-yellow-400" />
          <span className="absolute -top-1 -right-1 text-[8px]">🏆</span>
        </div>
      );
    case 'rewarded':
      return (
        <div className={`relative ${iconClass}`}>
          <Award size={size} className="text-purple-400" />
          <span className="absolute -top-1 -right-1 text-[8px]">🎁</span>
        </div>
      );
    default:
      // Fall back to standard icons based on the existing icon system
      switch (icon) {
        case 'shirt':
          return <Shirt size={size} className={`text-blue-400 ${iconClass}`} />;
        case 'bed':
          return <Bed size={size} className={`text-indigo-400 ${iconClass}`} />;
        case 'coffee':
          return <Utensils size={size} className={`text-amber-400 ${iconClass}`} />;
        case 'droplet':
          return <Droplet size={size} className={`text-blue-400 ${iconClass}`} />;
        case 'home':
          return <Home size={size} className={`text-green-400 ${iconClass}`} />;
        case 'book':
          return <Book size={size} className={`text-purple-400 ${iconClass}`} />;
        case 'heart':
          return <Heart size={size} className={`text-red-400 ${iconClass}`} />;
        case 'pencil':
          return <Pencil size={size} className={`text-yellow-400 ${iconClass}`} />;
        case 'moon':
          return <Moon size={size} className={`text-indigo-400 ${iconClass}`} />;
        case 'scissors':
          return <Scissors size={size} className={`text-purple-400 ${iconClass}`} />;
        case 'utensils':
          return <Utensils size={size} className={`text-orange-400 ${iconClass}`} />;
        case 'smile':
          return <Smile size={size} className={`text-yellow-400 ${iconClass}`} />;
        default:
          return <Package size={size} className={`text-gray-400 ${iconClass}`} />;
      }
  }
};

export default CustomTaskIcon;
