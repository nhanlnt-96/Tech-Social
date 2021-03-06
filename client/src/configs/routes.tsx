import Feed from 'pages/feed/Feed';
import LoginPage from 'pages/login/LoginPage';
import PageNotFound from 'pages/notFound/PageNotFound';
import ProfilePage from 'pages/profile/ProfilePage';
import RegisterPage from 'pages/register/RegisterPage';
import ResetPassword from 'pages/resetPassword/ResetPassword';
import React from 'react';

export const routes = [
  {
    path: '/',
    isExact: true,
    isPrivate: true,
    module: <Feed />,
    isAuth: false,
  },
  {
    path: '/login',
    isExact: true,
    isPrivate: false,
    module: <LoginPage />,
    isAuth: true,
  },
  {
    path: '/auth/reset-password/user/:token',
    isExact: true,
    isPrivate: false,
    module: <ResetPassword />,
    isAuth: false,
  },
  {
    path: '/register',
    isExact: true,
    isPrivate: false,
    module: <RegisterPage />,
    isAuth: true,
  },
  {
    path: '/profile-page/:id',
    isExact: true,
    isPrivate: true,
    module: <ProfilePage />,
    isAuth: false,
  },
  {
    path: '*',
    isExact: true,
    isPrivate: false,
    module: <PageNotFound />,
    isAuth: false,
  },
];
