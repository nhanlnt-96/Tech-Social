import React, { FC } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

const LoadingMask: FC = () => {
  return (
    <Backdrop
      open
      sx={{ color: '#1976d2', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingMask;
