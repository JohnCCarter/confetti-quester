import React, { useRef, useEffect, useCallback } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
  type?: 'small' | 'full';
  position?: { x: number; y: number };
}

interface ConfettiConfig {
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  ticks?: number;
}

type ConfettiInstance = (options: Record<string, unknown>) => void;

const Confetti: React.FC<ConfettiProps> = ({ 
  active, 
  onComplete, 
  type = 'small',
  position 
}) => {
  const confettiRef = useRef<ConfettiInstance | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const getInstance = useCallback((instance: ConfettiInstance) => {
    confettiRef.current = instance;
  }, []);

  const fireConfetti = useCallback((particleRatio: number, confettiConfig: ConfettiConfig) => {
    if (confettiRef.current) {
      confettiRef.current({
        ...confettiConfig,
        origin: position ? { 
          x: position.x / window.innerWidth,
          y: position.y / window.innerHeight 
        } : { 
          x: Math.random() * 0.3 + 0.35, 
          y: Math.random() * 0.2 + 0.4 
        },
        particleCount: Math.floor(200 * particleRatio),
        colors: ['#ff577f', '#ff884b', '#ffd384', '#fff9b0', '#a9def9', '#c3bef0', '#dfccfb'],
        shapes: ['square', 'circle', 'star'],
      });
    }
  }, [position]);

  useEffect(() => {
    // Clear all previous timeouts when component re-renders
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    if (active) {
      if (type === 'small') {
        fireConfetti(0.25, {
          spread: 26,
          startVelocity: 25,
          decay: 0.92,
          scalar: 0.9,
          ticks: 100
        });
      } else {
        // Full screen celebration
        fireConfetti(0.25, {
          spread: 26,
          startVelocity: 55,
          ticks: 150
        });
        
        timeoutsRef.current.push(setTimeout(() => {
          fireConfetti(0.2, {
            spread: 60,
            ticks: 150
          });
        }, 250));
        
        timeoutsRef.current.push(setTimeout(() => {
          fireConfetti(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
            ticks: 150
          });
        }, 400));
        
        timeoutsRef.current.push(setTimeout(() => {
          fireConfetti(0.1, {
            spread: 120,
            startVelocity: 30,
            decay: 0.92,
            scalar: 1.2,
            ticks: 150
          });
        }, 550));
        
        timeoutsRef.current.push(setTimeout(() => {
          fireConfetti(0.25, {
            spread: 50,
            startVelocity: 45,
            decay: 0.94,
            scalar: 1.0,
            ticks: 150
          });
        }, 700));
      }
      
      timeoutsRef.current.push(setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500));
    }

    // Cleanup function to clear all timeouts on unmount or when active changes
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [active, fireConfetti, onComplete, type]);

  const style: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 999
  };
  
  return <ReactCanvasConfetti refConfetti={getInstance} style={style} />;
};

export default Confetti;
