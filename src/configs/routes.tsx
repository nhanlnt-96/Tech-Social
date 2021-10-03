import React from 'react';
import LoginPage from 'pages/login/LoginPage';

export const routes = [
  {
    path: '/login',
    isExact: true,
    isPrivate: false,
    module: <LoginPage />,
  },
];
