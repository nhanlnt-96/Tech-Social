import React, { FC } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Paper } from '@mui/material';

export const NavigationSearch: FC = () => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'unset',
      }}
    >
      <SearchIcon style={{ color: '#0275B1' }} />
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
    </Paper>
  );
};
