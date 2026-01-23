import React from 'react';
import { AlarmClock, Moon } from 'lucide-react';

interface FilterBarProps {
  filter: 'all' | 'morning' | 'evening';
  setFilter: (filter: 'all' | 'morning' | 'evening') => void;
  userTheme?: 'pink' | 'blue';
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter, userTheme = 'pink' }) => {
  const activeColorClass = userTheme === 'pink' ? 'bg-pink-600/20' : 'bg-blue-600/20';

  return (
    <div className="glass-card flex mb-4 rounded-lg overflow-hidden sm:max-w-xs sm:mx-auto md:max-w-md lg:max-w-lg">
      <button 
        className={`task-filter-button ${filter === 'all' ? 'active' : ''} py-2 text-xs sm:text-sm md:py-3 md:text-base`}
        onClick={() => setFilter('all')}
      >
        Alla
      </button>
      <button 
        className={`task-filter-button ${filter === 'morning' ? activeColorClass : ''} ${filter === 'morning' ? 'text-white' : ''} py-2 text-xs sm:text-sm md:py-3 md:text-base`}
        onClick={() => setFilter('morning')}
      >
        <AlarmClock size={12} className="inline mr-1 sm:size-4 md:size-5" />
        Morgon
      </button>
      <button 
        className={`task-filter-button ${filter === 'evening' ? activeColorClass : ''} ${filter === 'evening' ? 'text-white' : ''} py-2 text-xs sm:text-sm md:py-3 md:text-base`}
        onClick={() => setFilter('evening')}
      >
        <Moon size={12} className="inline mr-1 sm:size-4 md:size-5" />
        Kväll
      </button>
    </div>
  );
};

export default React.memo(FilterBar);
