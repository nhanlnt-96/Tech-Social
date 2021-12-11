import React, { FC, useState } from 'react';
import { Avatar, Button, Paper, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IUserData } from 'model/user';
import VerifyPopover from 'components/verifyPoper/VerifyPopover';

const verifyIconStyle = {
  fontSize: '13px',
  marginLeft: '5px',
};

export const NavigationUserPanel: FC = () => {
  const userProfile = Cookies.get('userProfile');
  const userData: IUserData =
    typeof userProfile === 'string' && JSON.parse(userProfile);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  console.log(userData?.avatarImageURL);
  return (
    <Paper
      className="user-panel-container"
      component="form"
      sx={{
        p: '2px 20px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'unset',
      }}
    >
      {userData?.avatarImageURL ? (
        <Avatar
          alt={userData?.id}
          src={`${String(userData?.avatarImageURL)}`}
        />
      ) : (
        <Avatar alt={userData?.id}>{userData?.fullName.charAt(0)}</Avatar>
      )}
      <div className="user-name">
        <Typography className="name-item" sx={{ display: 'flex' }}>
          {userData?.fullName}
          <Typography
            className="name-item"
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <CheckCircleIcon
              sx={
                userData?.isVerify
                  ? {
                      ...verifyIconStyle,
                      color: '#0275B1',
                    }
                  : { ...verifyIconStyle, color: '#747474' }
              }
            />
          </Typography>
        </Typography>
        <VerifyPopover
          open={open}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          isVerify={userData?.isVerify}
        />
        <Button
          sx={{ color: '#0275b1', textTransform: 'unset', p: 0 }}
          className="profile-page-btn"
          component={Link}
          to={`/profile-page/${userData?.id}`}
          variant="text"
        >
          Profile page
        </Button>
      </div>
    </Paper>
  );
};
