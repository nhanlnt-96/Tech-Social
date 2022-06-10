import { INavigationMenu, navigationMenu } from 'configs/navigationMenu';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button } from '@mui/material';

export const NavigationMenu: FC = () => {
  return (
    <Box className="navigation-menu">
      {navigationMenu.map(
        (val: INavigationMenu) =>
          val.status && (
            <Button
              component={Link}
              to="/"
              key={val.label}
              disabled={!val.status}
              className="navigation-menu-item"
              variant="text"
            >
              <img src={val.icon} alt="navigation-menu" />
              <span>{val.label}</span>
            </Button>
          ),
      )}
    </Box>
  );
};
