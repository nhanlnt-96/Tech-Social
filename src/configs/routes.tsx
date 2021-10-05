import React from 'react';
import LoginPage from 'pages/login/LoginPage';
import RegisterPage from 'pages/register/RegisterPage';
import ProfilePage from 'pages/profile/ProfilePage';
import Feed from 'pages/feed/Feed';

export const routes = [
  {
    path: '/',
    isExact: true,
    isPrivate: false,
    module: <Feed />,
  },
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
