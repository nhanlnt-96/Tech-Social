import './RegisterPage.scss';

import {
  RegisterForm,
  RegisterWithGoogleForm,
} from 'pages/register/components';
import ButtonRegisterWithGoogle from 'pages/register/components/ButtonRegisterWithGoogle';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'store/rootReducer';

import { Button, CssBaseline, Divider, Paper } from '@mui/material';

const RegisterPage: FC = () => {
  const { registerSuccess } = useSelector(
    (state: IRootState) => state.registerGoogle,
  );

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
        {!registerSuccess.isSuccess ? (
          <>
            <RegisterForm />
            <Divider
              className="register-divider"
              sx={{ width: '100%', mb: 2.4 }}
            >
              or
            </Divider>
            <ButtonRegisterWithGoogle />
          </>
        ) : (
          <RegisterWithGoogleForm userData={registerSuccess.data} />
        )}
        <div className="auth-footer">
          <p>Already on LinkedIn?</p>
          <Button
            component={Link}
            to="/login"
            sx={{ p: 0.5, ml: 0.5 }}
            variant="text"
          >
            Sign in
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default RegisterPage;
