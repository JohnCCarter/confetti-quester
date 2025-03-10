
import React from 'react';
import { Calendar, Trophy } from 'lucide-react';
import SectionHeader from './SectionHeader';
import AchievementItem, { Achievement } from './AchievementItem';

interface StatisticsSectionProps {
  userStars: number;
  userTheme: 'pink' | 'blue';
  achievements: Achievement[];
  totalAchievements: number;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ 
  userStars, 
  userTheme,
  achievements,
  totalAchievements
}) => {
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
        subtitle={`${userStars}/${totalAchievements}`}
        userTheme={userTheme}
      >
        <div className="space-y-2">
          {achievements.length > 0 ? (
            achievements.map((achievement) => (
              <AchievementItem 
                key={achievement.id} 
                achievement={achievement}
                userTheme={userTheme}
              />
            ))
          ) : (
            <div className="glass-card p-4 text-center text-gray-400">
              Inga prestationer än
            </div>
          )}
        </div>
      </SectionHeader>
    </>
  );
};

export default StatisticsSection;
