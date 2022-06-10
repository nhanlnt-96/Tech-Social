import '../FooterNavigationMenu.scss';

import { footerNavigationMenu } from 'configs/footerNavigationMenu';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Grid } from '@mui/material';

export const FooterNavigationMenu: FC = () => {
  return (
    <Grid sx={{ color: '#000000' }} container>
      <Grid item xs={12} sx={{ mb: 2.4 }}>
        <strong>Navigation</strong>
      </Grid>
      {footerNavigationMenu.map((val) => {
        const { label, path } = val;

        return (
          <Grid sx={{ mb: 0.5 }} key={label} item xs={4}>
            <Link className="footer-navigation-item" to={path}>
              {label}
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};
