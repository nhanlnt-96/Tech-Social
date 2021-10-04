import React, { FC } from 'react';
import { CssBaseline } from '@mui/material';
import './ProfilePage.scss';
import { ProfileHeader } from 'pages/profile/components';

const ProfilePage: FC = () => {
  return (
    <div className="profile-page-container">
      <CssBaseline />
      <ProfileHeader />
    </div>
  );
};

export default ProfilePage;
