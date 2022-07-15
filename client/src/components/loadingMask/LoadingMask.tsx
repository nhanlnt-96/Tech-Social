import React, { FC } from 'react';

import { Backdrop, Box, CircularProgress } from '@mui/material';

type TUseLoadingFor = 'fullPage' | 'section';

interface IProps {
  useFor: TUseLoadingFor;
}

const LoadingMask: FC<IProps> = ({ useFor }) => {
  return (
    <>
      {useFor === 'fullPage' ? (
        <Backdrop
          open
          sx={{ color: '#1976d2', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Box
          component="div"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, .4)',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        >
          <CircularProgress color="info" />
        </Box>
      )}
    </>
  );
};

export default LoadingMask;
