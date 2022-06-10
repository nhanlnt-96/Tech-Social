import Bell from 'icons/bell.svg';
import BriefCase from 'icons/briefcase.svg';
import MessageSquare from 'icons/message-square.svg';
import RssFeed from 'icons/rss.svg';
import Users from 'icons/users.svg';

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
