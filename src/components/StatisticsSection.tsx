
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
        icon={<Calendar size={20} className="animate-pulse-scale" />} 
        title="Veckoöversikt"
        userTheme={userTheme}
      >
        <div className="glass-card p-4 hover:shadow-lg transition-all duration-300">
          <p className="text-gray-400 text-center">Statistik kommer snart...</p>
        </div>
      </SectionHeader>
      
      <SectionHeader 
        icon={<Trophy size={20} className="animate-pulse-scale" />} 
        title="Prestationer" 
        subtitle={`${userStars}/${totalAchievements}`}
        userTheme={userTheme}
      >
        <div className="space-y-2">
          {achievements.length > 0 ? (
            achievements.map((achievement, index) => (
              <div 
                key={achievement.id} 
                className="transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fade-in 0.5s ease-out forwards'
                }}
              >
                <AchievementItem 
                  achievement={achievement}
                  userTheme={userTheme}
                />
              </div>
            ))
          ) : (
            <div className="glass-card p-4 text-center text-gray-400 hover:shadow-lg transition-all duration-300">
              Inga prestationer än
            </div>
          )}
        </div>
      </SectionHeader>
    </>
  );
};

export default StatisticsSection;
