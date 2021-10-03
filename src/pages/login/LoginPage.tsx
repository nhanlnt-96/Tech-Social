import React, { FC } from 'react';
import { Button, Paper } from '@mui/material';
import './LoginPage.scss';
import { LoginForm } from 'pages/login/components';

const LoginPage: FC = () => {
  return (
    <div className="login-page-container">
      <Paper
        elevation={3}
        sx={{
          width: 400,
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2.4,
          mb: 2.4,
        }}
      >
        {/* login title */}
        <div className="login-title">
          <h1>Sign in</h1>
          <p>Stay updated on your professional world</p>
        </div>
        {/* login form */}
        <LoginForm />
      </Paper>
      <div className="login-footer">
        <p>New to LinkedIn?</p>
        <Button sx={{ p: 0.5, ml: 0.5 }} variant="text">
          Join now
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
