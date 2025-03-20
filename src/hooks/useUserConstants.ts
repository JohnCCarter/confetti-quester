
import { User } from '@/components/UserDialog';
import { Reward } from '@/components/RewardsDialog';
import { Achievement } from '@/components/AchievementItem';

export const defaultUser: User = {
  id: '1',
  name: 'Isabel',
  points: 0,
  stars: 1
};

export const alternateUser: User = {
  id: '2',
  name: 'Zozo',
  points: 0,
  stars: 0
};

// Default rewards
export const defaultRewards: Reward[] = [
  {
    id: '1',
    title: 'Extra skärmtid',
    description: '30 minuter extra skärmtid',
    points: 50,
    icon: 'gift'
  },
  {
    id: '2',
    title: 'Glass',
    description: 'En glass av valfri sort',
    points: 100,
    icon: 'award'
  }
];

// Default achievements for Isabel
export const defaultIsabelAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Morgonmästare',
    description: 'Slutför alla morgonrutiner på en dag',
    completed: false,
    iconType: 'morning-master'
  },
  {
    id: '2',
    title: 'Kvällsprinsessan',
    description: 'Slutför alla kvällsrutiner på en dag',
    completed: false,
    iconType: 'evening-princess'
  },
  {
    id: '3',
    title: 'På gång!',
    description: 'Använd appen 5 dagar i rad',
    completed: false,
    iconType: 'on-track'
  },
  {
    id: '4',
    title: 'Superstjärna',
    description: 'Samla 25 poäng',
    completed: false,
    iconType: 'superstar'
  },
  {
    id: '5',
    title: 'Belönad',
    description: 'Lös in din första belöning',
    completed: false,
    iconType: 'rewarded'
  }
];

// Default achievements for Zozo
export const defaultZozoAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Morgonmästare',
    description: 'Slutför alla morgonrutiner på en dag',
    completed: false,
    iconType: 'morning-master'
  },
  {
    id: '2',
    title: 'Kvällsprinsen',
    description: 'Slutför alla kvällsrutiner på en dag',
    completed: false,
    iconType: 'evening-prince'
  },
  {
    id: '3',
    title: 'På gång!',
    description: 'Använd appen 5 dagar i rad',
    completed: false,
    iconType: 'on-track'
  },
  {
    id: '4',
    title: 'Superstjärna',
    description: 'Samla 25 poäng',
    completed: false,
    iconType: 'superstar'
  },
  {
    id: '5',
    title: 'Belönad',
    description: 'Lös in din första belöning',
    completed: false,
    iconType: 'rewarded'
  }
];
