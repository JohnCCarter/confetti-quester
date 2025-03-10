
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
    <div className="glass-card flex mb-4 rounded-lg overflow-hidden">
      <button 
        className={`task-filter-button ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        Alla
      </button>
      <button 
        className={`task-filter-button ${filter === 'morning' ? activeColorClass : ''} ${filter === 'morning' ? 'text-white' : ''}`}
        onClick={() => setFilter('morning')}
      >
        <AlarmClock size={14} className="inline mr-1" />
        Morgon
      </button>
      <button 
        className={`task-filter-button ${filter === 'evening' ? activeColorClass : ''} ${filter === 'evening' ? 'text-white' : ''}`}
        onClick={() => setFilter('evening')}
      >
        <Moon size={14} className="inline mr-1" />
        Kväll
      </button>
    </div>
  );
};

export default FilterBar;
