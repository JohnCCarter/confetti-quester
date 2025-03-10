
import React, { useRef, useEffect, useCallback } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
  type?: 'small' | 'full';
  position?: { x: number; y: number };
}

const Confetti: React.FC<ConfettiProps> = ({ 
  active, 
  onComplete, 
  type = 'small',
  position 
}) => {
  const confettiRef = useRef<any>(null);

  const getInstance = useCallback((instance: any) => {
    confettiRef.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    if (confettiRef.current) {
      confettiRef.current({
        ...opts,
        origin: position ? { 
          x: position.x / window.innerWidth,
          y: position.y / window.innerHeight 
        } : { 
          x: Math.random() * 0.3 + 0.35, 
          y: Math.random() * 0.2 + 0.4 
        },
        particleCount: Math.floor(200 * particleRatio),
      });
    }
  }, [position]);

  useEffect(() => {
    if (active) {
      if (type === 'small') {
        makeShot(0.25, {
          spread: 26,
          startVelocity: 20,
          decay: 0.94,
          scalar: 0.8
        });
      } else {
        // Full screen celebration
        makeShot(0.25, {
          spread: 26,
          startVelocity: 55
        });
        
        setTimeout(() => {
          makeShot(0.2, {
            spread: 60
          });
        }, 250);
        
        setTimeout(() => {
          makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
          });
        }, 400);
        
        setTimeout(() => {
          makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
          });
        }, 550);
      }
      
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);
    }
  }, [active, makeShot, onComplete, type]);

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
