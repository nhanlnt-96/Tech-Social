interface IFooterLanguageSelect {
  label: string;
  value: string;
  isActive: boolean;
}

export const footerLanguageItem: IFooterLanguageSelect[] = [
  {
    label: 'English',
    value: 'en',
    isActive: true,
  },
  {
    label: 'Vietnam (updating)',
    value: 'vi',
    isActive: false,
  },
];
