
import { Task } from '@/components/TaskDialog';
import { CustomIconType } from '@/components/icons/types';

export const zozoTasks: Task[] = [
  // Morning tasks
  {
    id: '1',
    title: 'Bädda sängen',
    icon: 'bed' as CustomIconType,
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '2',
    title: 'Klä på sig',
    icon: 'shirt' as CustomIconType,
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '3',
    title: 'Borsta håret',
    icon: 'scissors' as CustomIconType,
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '4',
    title: 'Borsta tänderna',
    icon: 'smile' as CustomIconType,
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '5',
    title: 'Klä på sig ytterkläder',
    icon: 'shirt' as CustomIconType,
    points: 1,
    completed: false,
    category: 'morning'
  },
  {
    id: '6',
    title: 'Pussa mamma och pappa och säg att du älskar dem',
    icon: 'heart' as CustomIconType,
    points: 2,
    completed: false,
    category: 'morning'
  },
  // Evening tasks
  {
    id: '7',
    title: 'Plocka sina saker',
    icon: 'home' as CustomIconType,
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '8',
    title: 'Duscha',
    icon: 'droplet' as CustomIconType,
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '9',
    title: 'Borsta tänderna',
    icon: 'smile' as CustomIconType,
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '10',
    title: 'Förbereda kläder',
    icon: 'shirt' as CustomIconType,
    points: 1,
    completed: false,
    category: 'evening'
  },
  {
    id: '11',
    title: 'Göra hemläxa',
    icon: 'pencil' as CustomIconType,
    points: 2,
    completed: false,
    category: 'evening'
  },
  {
    id: '12',
    title: 'Läsa och skriva',
    icon: 'book' as CustomIconType,
    points: 2,
    completed: false,
    category: 'evening'
  },
  {
    id: '13',
    title: 'Sova kl. 19:00',
    icon: 'moon' as CustomIconType,
    points: 2,
    completed: false,
    category: 'evening'
  },
  {
    id: '14',
    title: 'Pussa mamma och pappa och säg att du älskar dem',
    icon: 'heart' as CustomIconType,
    points: 2,
    completed: false,
    category: 'evening'
  }
];
