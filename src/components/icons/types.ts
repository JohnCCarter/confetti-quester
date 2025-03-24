import { ReactNode } from 'react';

export type CustomIconType = 
  | 'bed' 
  | 'shirt' 
  | 'hairbrush' 
  | 'breakfast' 
  | 'toothbrush' 
  | 'jacket' 
  | 'heart'
  | 'tidybox' 
  | 'shower' 
  | 'eveningtoothbrush' 
  | 'clothes' 
  | 'homework' 
  | 'readwrite' 
  | 'sleep' 
  | 'eveningheart'
  | 'morning-master' 
  | 'evening-princess' 
  | 'evening-prince' 
  | 'on-track' 
  | 'superstar' 
  | 'rewarded'
  | 'lovable';

export interface IconContainerProps {
  children: ReactNode;
  className?: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface CustomIconProps {
  size?: number;
  className?: string;
  isHovered?: boolean;
}
