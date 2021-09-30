import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import {
  INavigationMenu,
  navigationMenu,
} from '../../../configs/navigationMenu';

const NavigationMenu: FC = () => {
  return (
    <Box className="navigation-menu">
      {navigationMenu.map((val: INavigationMenu) => (
        <Button
          disabled={!val.status}
          className="navigation-menu-item"
          variant="text"
        >
          <img src={val.icon} alt="navigation-menu" />
          <span>{val.label}</span>
        </Button>
      ))}
    </Box>
  );
};

export default NavigationMenu;
