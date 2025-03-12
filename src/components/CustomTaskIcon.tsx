
import React, { useState } from 'react';
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
  const [isInternalHovered, setIsInternalHovered] = useState(false);
  const hovered = isHovered || isInternalHovered;
  
  const animationClass = hovered ? 'scale-110' : '';
  const transitionClass = 'transition-all duration-300';
  const iconClass = `${className} ${transitionClass} ${animationClass}`;
  
  const iconContainer = (children: React.ReactNode) => (
    <div 
      className={`relative ${iconClass} cursor-pointer transform`}
      onMouseEnter={() => setIsInternalHovered(true)}
      onMouseLeave={() => setIsInternalHovered(false)}
    >
      {children}
    </div>
  );
  
  const emojiClass = `absolute transition-all duration-300 ${
    hovered ? 'scale-125 animate-bounce' : ''
  }`;
  
  switch (icon) {
    // Morning routine icons
    case 'bed':
      return iconContainer(
        <>
          <Bed size={size} className={`text-indigo-400 ${hovered ? 'animate-pulse' : ''}`} />
          <span className={`${emojiClass} -top-1 -right-1 text-yellow-400 text-xs`}>★</span>
        </>
      );
    case 'shirt':
      return iconContainer(
        <>
          <Shirt size={size} className={`text-blue-400 ${hovered ? 'rotate-6' : ''}`} />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>😊</span>
        </>
      );
    case 'hairbrush':
      return iconContainer(
        <>
          <Scissors 
            size={size} 
            className={`text-purple-400 transition-transform ${hovered ? 'rotate-12' : ''}`} 
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>😊</span>
        </>
      );
    case 'breakfast':
      return iconContainer(
        <>
          <Utensils 
            size={size} 
            className={`text-orange-400 ${hovered ? 'animate-[wiggle_1s_ease-in-out_infinite]' : ''}`}
          />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>🍽️</span>
        </>
      );
    case 'toothbrush':
      return iconContainer(
        <>
          <Smile 
            size={size} 
            className={`text-teal-400 transition-transform ${hovered ? 'scale-110' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-yellow-400 text-xs`}>✨</span>
        </>
      );
    case 'jacket':
      return iconContainer(
        <>
          <Shirt 
            size={size} 
            className={`text-teal-400 transition-transform ${hovered ? 'rotate-6' : ''}`}
          />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>😊</span>
        </>
      );
    case 'heart':
      return iconContainer(
        <>
          <Heart 
            size={size} 
            className={`text-red-400 transition-transform ${hovered ? 'scale-125 animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>🤗</span>
        </>
      );
      
    // Evening routine icons
    case 'tidybox':
      return iconContainer(
        <>
          <Package 
            size={size} 
            className={`text-amber-400 transition-transform ${hovered ? 'rotate-3' : ''}`}
          />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>😊</span>
        </>
      );
    case 'shower':
      return iconContainer(
        <>
          <Droplet 
            size={size} 
            className={`text-blue-400 ${hovered ? 'animate-bounce' : ''}`}
          />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>😊</span>
        </>
      );
    case 'eveningtoothbrush':
      return iconContainer(
        <>
          <Smile 
            size={size} 
            className={`text-yellow-400 transition-transform ${hovered ? 'scale-110' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>⭐</span>
        </>
      );
    case 'clothes':
      return iconContainer(
        <>
          <Shirt 
            size={size} 
            className={`text-purple-400 transition-transform ${hovered ? 'rotate-6' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>🎨</span>
        </>
      );
    case 'homework':
      return iconContainer(
        <>
          <Book 
            size={size} 
            className={`text-blue-400 transition-transform ${hovered ? 'rotate-6' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-yellow-400 text-xs`}>★</span>
        </>
      );
    case 'readwrite':
      return iconContainer(
        <>
          <Pencil 
            size={size} 
            className={`text-emerald-400 transition-transform ${hovered ? 'rotate-12' : ''}`}
          />
          <span className={`${emojiClass} -bottom-1 -right-1 text-[8px]`}>📝</span>
        </>
      );
    case 'sleep':
      return iconContainer(
        <>
          <Moon 
            size={size} 
            className={`text-indigo-400 ${hovered ? 'animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>✨</span>
        </>
      );
    case 'eveningheart':
      return iconContainer(
        <>
          <Heart 
            size={size} 
            className={`text-pink-400 transition-transform ${hovered ? 'scale-125 animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>🤗</span>
        </>
      );
      
    // Achievement icons
    case 'morning-master':
      return iconContainer(
        <>
          <Trophy 
            size={size} 
            className={`text-amber-400 ${hovered ? 'animate-bounce' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-yellow-400 text-xs`}>☀️</span>
        </>
      );
    case 'evening-princess':
      return iconContainer(
        <>
          <Award 
            size={size} 
            className={`text-pink-400 ${hovered ? 'animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>👑</span>
        </>
      );
    case 'evening-prince':
      return iconContainer(
        <>
          <Award 
            size={size} 
            className={`text-blue-400 ${hovered ? 'animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>👑</span>
        </>
      );
    case 'on-track':
      return iconContainer(
        <>
          <Trophy 
            size={size} 
            className={`text-emerald-400 transition-transform ${hovered ? 'rotate-6' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-yellow-400 text-xs`}>★</span>
        </>
      );
    case 'superstar':
      return iconContainer(
        <>
          <Trophy 
            size={size} 
            className={`text-yellow-400 ${hovered ? 'animate-pulse' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>🏆</span>
        </>
      );
    case 'rewarded':
      return iconContainer(
        <>
          <Award 
            size={size} 
            className={`text-purple-400 ${hovered ? 'animate-bounce' : ''}`}
          />
          <span className={`${emojiClass} -top-1 -right-1 text-[8px]`}>🎁</span>
        </>
      );
    default:
      // Fall back to standard icons based on the existing icon system with added animations
      switch (icon) {
        case 'shirt':
          return iconContainer(
            <Shirt size={size} className={`text-blue-400 ${iconClass} ${hovered ? 'rotate-6' : ''}`} />
          );
        case 'bed':
          return iconContainer(
            <Bed size={size} className={`text-indigo-400 ${iconClass} ${hovered ? 'animate-pulse' : ''}`} />
          );
        case 'coffee':
          return iconContainer(
            <Utensils size={size} className={`text-amber-400 ${iconClass} ${hovered ? 'rotate-6' : ''}`} />
          );
        case 'droplet':
          return iconContainer(
            <Droplet size={size} className={`text-blue-400 ${iconClass} ${hovered ? 'animate-bounce' : ''}`} />
          );
        case 'home':
          return iconContainer(
            <Home size={size} className={`text-green-400 ${iconClass} ${hovered ? 'scale-110' : ''}`} />
          );
        case 'book':
          return iconContainer(
            <Book size={size} className={`text-purple-400 ${iconClass} ${hovered ? 'rotate-3' : ''}`} />
          );
        case 'heart':
          return iconContainer(
            <Heart size={size} className={`text-red-400 ${iconClass} ${hovered ? 'scale-125 animate-pulse' : ''}`} />
          );
        case 'pencil':
          return iconContainer(
            <Pencil size={size} className={`text-yellow-400 ${iconClass} ${hovered ? 'rotate-12' : ''}`} />
          );
        case 'moon':
          return iconContainer(
            <Moon size={size} className={`text-indigo-400 ${iconClass} ${hovered ? 'animate-pulse' : ''}`} />
          );
        case 'scissors':
          return iconContainer(
            <Scissors size={size} className={`text-purple-400 ${iconClass} ${hovered ? 'rotate-12' : ''}`} />
          );
        case 'utensils':
          return iconContainer(
            <Utensils size={size} className={`text-orange-400 ${iconClass} ${hovered ? 'rotate-6' : ''}`} />
          );
        case 'smile':
          return iconContainer(
            <Smile size={size} className={`text-yellow-400 ${iconClass} ${hovered ? 'scale-110' : ''}`} />
          );
        default:
          return iconContainer(
            <Package size={size} className={`text-gray-400 ${iconClass} ${hovered ? 'rotate-3' : ''}`} />
          );
      }
  }
};

export default CustomTaskIcon;
