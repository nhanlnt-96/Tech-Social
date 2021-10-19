import RssFeed from '../assets/icon/rss.svg';
import Users from '../assets/icon/users.svg';
import BriefCase from '../assets/icon/briefcase.svg';
import MessageSquare from '../assets/icon/message-square.svg';
import Bell from '../assets/icon/bell.svg';

export interface INavigationMenu {
  label: string;
  icon: string;
  status: boolean;
  path?: string;
}

export const navigationMenu: INavigationMenu[] = [
  {
    label: 'FEED',
    icon: RssFeed,
    status: true,
    path: '/',
  },
  {
    label: 'NETWORK',
    icon: Users,
    status: false,
  },
  {
    label: 'JOBS',
    icon: BriefCase,
    status: false,
  },
  {
    label: 'CHAT',
    icon: MessageSquare,
    status: false,
  },
  {
    label: 'NOTICES',
    icon: Bell,
    status: false,
  },
];
