import React, { FC } from 'react';
import {
  AppBar,
  Avatar,
  CssBaseline,
  Divider,
  Paper,
  Toolbar,
} from '@mui/material';
import Logo from 'img/logo.svg';
import {
  ElevationScroll,
  NavigationSearch,
  NavigationUserPanel,
  NavigationMenu,
  NavigationOtherOption,
} from 'components/navigation/components';

import './Navigation.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Navigation: FC = (props: Props) => {
  return (
    <>
      <CssBaseline />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ElevationScroll {...props}>
        <AppBar color="inherit">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Paper
              className="user-panel-container"
              component="form"
              sx={{
                p: '2px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // width: 130,
                boxShadow: 'unset',
              }}
            >
              <Avatar
                className="navigation-logo"
                alt="tech-social-logo"
                variant="rounded"
                src={Logo}
                sx={{ width: 46, height: 46 }}
              />
            </Paper>
            <Divider orientation="vertical" flexItem />
            <NavigationMenu />
            <Divider orientation="vertical" flexItem />
            <NavigationSearch />
            <Divider orientation="vertical" flexItem />
            <NavigationUserPanel />
            <Divider orientation="vertical" flexItem />
            <NavigationOtherOption />
            <Divider orientation="vertical" flexItem />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Divider />
    </>
  );
};

export default Navigation;
