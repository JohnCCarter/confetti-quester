
import React from 'react';
import { Calendar, Trophy } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface StatisticsSectionProps {
  userStars: number;
  userTheme: 'pink' | 'blue';
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ userStars, userTheme }) => {
  return (
    <>
      <SectionHeader 
        icon={<Calendar size={20} />} 
        title="Veckoöversikt"
        userTheme={userTheme}
      >
        <div className="glass-card p-4">
          <p className="text-gray-400 text-center">Statistik kommer snart...</p>
        </div>
      </SectionHeader>
      
      <SectionHeader 
        icon={<Trophy size={20} />} 
        title="Prestationer" 
        subtitle={`${userStars}/5`}
        userTheme={userTheme}
      >
        <div className="glass-card p-4">
          <p className="text-gray-400 text-center">Prestationer kommer snart...</p>
        </div>
      </SectionHeader>
    </>
  );
};

export default StatisticsSection;
