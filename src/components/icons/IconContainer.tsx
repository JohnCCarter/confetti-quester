
import React, { useState } from 'react';
import { IconContainerProps } from './types';

const IconContainer: React.FC<IconContainerProps> = ({ 
  children, 
  className = "", 
  isHovered = false,
  onMouseEnter,
  onMouseLeave
}) => {
  const [isInternalHovered, setIsInternalHovered] = useState(false);
  const hovered = isHovered || isInternalHovered;
  
  const animationClass = hovered ? 'scale-110' : '';
  const transitionClass = 'transition-all duration-300';
  const iconClass = `${className} ${transitionClass} ${animationClass}`;
  
  return (
    <div 
      className={`relative ${iconClass} cursor-pointer transform`}
      onMouseEnter={() => {
        setIsInternalHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsInternalHovered(false);
        onMouseLeave?.();
      }}
    >
      {children}
    </div>
  );
};

export default IconContainer;
