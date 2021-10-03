import React from 'react';
import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';

export const routes = [
  {
    path: '/login',
    isExact: true,
    isPrivate: false,
    module: <LoginPage />,
  },
  {
    path: '/register',
    isExact: true,
    isPrivate: false,
    module: <RegisterPage />,
  },
];
