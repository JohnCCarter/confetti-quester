
import React from 'react';
import { CustomIconType } from './types';
import { renderMorningIcon } from './MorningIcons';
import { renderEveningIcon } from './EveningIcons';
import { renderAchievementIcon } from './AchievementIcons';
import { renderStandardIcon } from './StandardIcons';

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
  // Morning routine icons
  const morningIcons = ['bed', 'shirt', 'hairbrush', 'breakfast', 'toothbrush', 'jacket', 'heart'];
  
  // Evening routine icons
  const eveningIcons = [
    'tidybox', 'shower', 'eveningtoothbrush', 'clothes', 'homework', 'readwrite', 'sleep', 'eveningheart'
  ];
  
  // Achievement icons
  const achievementIcons = [
    'morning-master', 'evening-princess', 'evening-prince', 'on-track', 'superstar', 'rewarded'
  ];
  
  const props = { size, className, isHovered };
  
  // Check which category this icon belongs to
  if (morningIcons.includes(icon)) {
    const renderedIcon = renderMorningIcon(icon, props);
    if (renderedIcon) return renderedIcon;
  }
  
  if (eveningIcons.includes(icon)) {
    const renderedIcon = renderEveningIcon(icon, props);
    if (renderedIcon) return renderedIcon;
  }
  
  if (achievementIcons.includes(icon)) {
    const renderedIcon = renderAchievementIcon(icon, props);
    if (renderedIcon) return renderedIcon;
  }
  
  // Fall back to standard icons
  return renderStandardIcon(icon, props);
};

export default CustomTaskIcon;
