import React from 'react';
import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';
import ProfilePage from 'pages/profile/ProfilePage';

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
  {
    path: '/profile-page/:id',
    isExact: true,
    isPrivate: false,
    module: <ProfilePage />,
  },
];
