
import React from 'react';
import { Calendar, Trophy } from 'lucide-react';
import SectionHeader from './SectionHeader';
import AchievementItem, { Achievement } from './AchievementItem';
import { Task } from './TaskDialog';

interface WeekStatistics {
  completedToday: number;
  totalToday: number;
  completedThisWeek: number;
  totalThisWeek: number;
  completedByDay: Record<string, number>;
  tasksPerDay: Record<string, number>;
}

interface StatisticsSectionProps {
  userStars: number;
  userTheme: 'pink' | 'blue';
  achievements: Achievement[];
  totalAchievements: number;
  showWeekOverview?: boolean;
  hideAchievements?: boolean;
  weekStatistics?: WeekStatistics;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ 
  userStars, 
  userTheme,
  achievements,
  totalAchievements,
  showWeekOverview = true,
  hideAchievements = false,
  weekStatistics
}) => {
  // Get day names for current locale
  const dayNames = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
  const getDayClasses = (completedCount: number) => (
    completedCount > 0
      ? userTheme === 'pink'
        ? 'bg-app-pink text-white'
        : 'bg-app-blue text-white'
      : 'bg-gray-800 text-gray-400'
  );
  
  return (
    <>
      {showWeekOverview && (
        <SectionHeader 
          icon={<Calendar size={20} className="animate-pulse-scale" />} 
          title="Veckoöversikt"
          userTheme={userTheme}
        >
          {weekStatistics ? (
            <div className="space-y-3">
              <div className="glass-card p-4 hover:shadow-lg transition-all duration-300">
                <h3 className="text-sm font-medium mb-2">Idag</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Slutförda uppgifter</span>
                  <span className={`font-medium ${userTheme === 'pink' ? 'text-app-pink' : 'text-app-blue'}`}>
                    {weekStatistics.completedToday}/{weekStatistics.totalToday}
                  </span>
                </div>
              </div>
              
              <div className="glass-card p-4 hover:shadow-lg transition-all duration-300">
                <h3 className="text-sm font-medium mb-2">Denna vecka</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400">Slutförda uppgifter</span>
                  <span className={`font-medium ${userTheme === 'pink' ? 'text-app-pink' : 'text-app-blue'}`}>
                    {weekStatistics.completedThisWeek}/{weekStatistics.totalThisWeek}
                  </span>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center">
                  {dayNames.map((day, index) => (
                    <div key={day} className="flex flex-col items-center">
                      <span className="text-xs text-gray-400">{day}</span>
                      <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        getDayClasses(weekStatistics.completedByDay[index.toString()] || 0)
                      }`}>
                        {weekStatistics.completedByDay[index.toString()] || 0}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-4 hover:shadow-lg transition-all duration-300">
              <p className="text-gray-400 text-center">Statistik kommer snart...</p>
            </div>
          )}
        </SectionHeader>
      )}
      
      {!hideAchievements && (
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
      )}
    </>
  );
};

export default React.memo(StatisticsSection);
