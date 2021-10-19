interface IFooterNavigationMenu {
  label: string;
  isActive: boolean;
  path: string;
}

export const footerNavigationMenu: IFooterNavigationMenu[] = [
  {
    label: 'About',
    isActive: false,
    path: '/about',
  },
  {
    label: 'Talent Solutions',
    isActive: false,
    path: '/talent-solutions',
  },
  {
    label: 'Community Guidelines',
    isActive: false,
    path: '/community-guidelines',
  },
  {
    label: 'Careers',
    isActive: false,
    path: '/careers',
  },
  {
    label: 'Marketing Solutions',
    isActive: false,
    path: '/marketing-solutions',
  },
  {
    label: 'Privacy & Terms',
    isActive: false,
    path: '/privacy-terms',
  },
  {
    label: 'Advertising',
    isActive: false,
    path: '/advertising',
  },
  {
    label: 'Sales Solutions',
    isActive: false,
    path: '/sales-solutions',
  },

  {
    label: 'Mobile App',
    isActive: false,
    path: '/mobile-app',
  },
  {
    label: 'Small Business',
    isActive: false,
    path: '/small-business',
  },
  {
    label: 'Safery Center',
    isActive: false,
    path: '/safery-center',
  },
];
