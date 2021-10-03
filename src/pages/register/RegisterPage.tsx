import React, { FC } from 'react';
import { Button, CssBaseline, Divider, Paper } from '@mui/material';
import { RegisterForm } from 'pages/register/components';
import RegisterWithGoogle from 'pages/register/components/RegisterWithGoogle';

import './RegisterPage.scss';

const RegisterPage: FC = () => {
  return (
    <div className="auth-page-container">
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          width: 400,
          // height: 450,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2.4,
        }}
      >
        <div className="auth-title">
          <h1>Sign up</h1>
          <p>Make the most of your professional life</p>
        </div>
        {/* register form */}
        <RegisterForm />
        <Divider className="register-divider" sx={{ width: '100%', mb: 2.4 }}>
          or
        </Divider>
        <RegisterWithGoogle />
        <div className="auth-footer">
          <p>Already on LinkedIn?</p>
          <Button sx={{ p: 0.5, ml: 0.5 }} variant="text">
            Sign in
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default RegisterPage;
