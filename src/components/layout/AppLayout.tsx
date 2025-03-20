
import React, { ReactNode, useEffect } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  isIsabel: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, isIsabel }) => {
  useEffect(() => {
    document.body.classList.remove('user-isabel', 'user-zozo');
    document.body.classList.add(isIsabel ? 'user-isabel' : 'user-zozo');
    return () => {
      document.body.classList.remove('user-isabel', 'user-zozo');
    };
  }, [isIsabel]);

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 flex justify-center">
      <div className="w-full max-w-md mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
