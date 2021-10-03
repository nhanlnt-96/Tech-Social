import React, { FC } from 'react';
import { Box, Paper } from '@mui/material';
import './LoginPage.scss';

const LoginPage: FC = () => {
  return (
    <div className="login-page-container">
      <Box sx={{ width: 400 }}>
        <Paper elevation={3}>
          <h1>hello jay</h1>
        </Paper>
      </Box>
    </div>
  );
};

export default LoginPage;
