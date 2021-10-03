import React, { FC } from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const RegisterWithGoogle: FC = () => {
  return (
    <>
      <Button
        fullWidth
        sx={{ mb: 2.4 }}
        variant="outlined"
        startIcon={<GoogleIcon />}
      >
        Join with Google
      </Button>
    </>
  );
};

export default RegisterWithGoogle;
