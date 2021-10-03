import React, { FC } from 'react';
import { Grid, MenuItem, Select } from '@mui/material';
import { footerLanguageItem } from 'configs/footerLanguageSelect';

export const FooterLanguage: FC = () => {
  return (
    <Grid container>
      <Grid sx={{ color: '#000000', mb: 2.4 }} item xs={12}>
        <strong>Language</strong>
      </Grid>
      <Grid item xs={12}>
        <Select
          sx={{ textTransform: 'uppercase' }}
          defaultValue="en"
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          {footerLanguageItem.map((val) => {
            const { label, value } = val;
            return (
              <MenuItem
                key={value}
                sx={{ textTransform: 'uppercase' }}
                value={value}
              >
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
    </Grid>
  );
};
