
import React from 'react';
import Confetti from '@/components/Confetti';

interface NotificationOverlayProps {
  showConfetti: boolean;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  showFullConfetti: boolean; 
  setShowFullConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  confettiPosition: {x: number, y: number} | null;
  completedTaskId: string | null;
}

const NotificationOverlay: React.FC<NotificationOverlayProps> = ({
  showConfetti,
  setShowConfetti,
  showFullConfetti,
  setShowFullConfetti,
  confettiPosition,
  completedTaskId
}) => {
  return (
    <>
      {showConfetti && (
        <Confetti 
          active={showConfetti} 
          type="small"
          position={confettiPosition || undefined}
          onComplete={() => setShowConfetti(false)}
        />
      )}
      
      {showFullConfetti && (
        <Confetti 
          active={showFullConfetti} 
          type="full"
          onComplete={() => setShowFullConfetti(false)}
        />
      )}
      
      <div className="fixed bottom-6 right-6 pointer-events-none">
        {completedTaskId && (
          <div className="bg-app-green/90 text-white px-4 py-3 rounded-lg animate-fade-in">
            Bra jobbat! 👏
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationOverlay;
