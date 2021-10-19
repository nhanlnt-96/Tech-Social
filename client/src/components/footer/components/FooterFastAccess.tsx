import React, { FC } from 'react';
import { Button, Grid } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const FooterFastAccess: FC = () => {
  return (
    <Grid container>
      <Grid sx={{ color: '#000000', mb: 2.4 }} item xs={12}>
        <strong>Fast access</strong>
      </Grid>
      <Grid sx={{ mb: 1 }} item xs={12}>
        <Button
          sx={{ boxShadow: 'unset', backgroundColor: '#0275B1' }}
          fullWidth
          variant="contained"
          endIcon={<HelpOutlineIcon />}
        >
          Questions?
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={{ color: '#0275B1', borderColor: '#0275B1' }}
          fullWidth
          variant="outlined"
          endIcon={<SettingsOutlinedIcon />}
        >
          Settings
        </Button>
      </Grid>
    </Grid>
  );
};
