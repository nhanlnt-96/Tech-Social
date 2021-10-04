import React from 'react';
import { AppBar, Avatar, Divider, Grid, Toolbar } from '@mui/material';
import Logo from 'img/logo.svg';
import {
  FooterFastAccess,
  FooterLanguage,
  FooterNavigationMenu,
} from 'components/footer/components';

const Footer = () => {
  return (
    <AppBar
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: '#F7F9FB',
        boxShadow: 'unset',
        height: '215px',
        position: 'unset',
      }}
    >
      <Divider sx={{ borderColor: '#E7E7E7' }} />
      <Toolbar sx={{ height: '100%' }}>
        <Grid container spacing={2}>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            item
            xs={1}
          >
            <Avatar
              className="navigation-logo"
              alt="tech-social-logo"
              variant="rounded"
              src={Logo}
              sx={{ width: 46, height: 46, mr: 0 }}
            />
          </Grid>
          <Grid item xs={6}>
            <FooterNavigationMenu />
          </Grid>
          <Grid item xs={2}>
            <FooterFastAccess />
          </Grid>
          <Grid item xs={3}>
            <FooterLanguage />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
