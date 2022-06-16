import VerifyPopover from 'components/verifyPoper/VerifyPopover';
import api from 'configs/axios';
import Cookies from 'js-cookie';
import { IUserData } from 'model/user';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserProfileStart } from 'store/redux/user/actions';
import { IRootState } from 'store/rootReducer';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Avatar, Button, Paper, Typography } from '@mui/material';

const verifyIconStyle = {
  fontSize: '13px',
  marginLeft: '5px',
};

export const NavigationUserPanel: FC = () => {
  const dispatch = useDispatch();
  const userProfile = Cookies.get('userProfile');

  const userProfileData = useSelector(
    (state: IRootState) => state.getUserProfile,
  );

  const userData: IUserData =
    typeof userProfile === 'string' && JSON.parse(userProfile);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    dispatch(getUserProfileStart(userData?.id));
  }, []);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

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
      {userProfileData?.userProfileData?.user?.avatarImageURL ? (
        <Avatar>
          <img
            width="100%"
            height="100%"
            alt={userProfileData?.userProfileData?.user?._id}
            src={`${userProfileData?.userProfileData?.user?.avatarImageURL}`}
            referrerPolicy="no-referrer"
          />
        </Avatar>
      ) : (
        <Avatar alt={userProfileData?.userProfileData?.user?._id}>
          {userProfileData?.userProfileData?.user?.fullName.charAt(0)}
        </Avatar>
      )}
      <div className="user-name">
        <Typography className="name-item" sx={{ display: 'flex' }}>
          {userProfileData?.userProfileData?.user?.fullName}
          <Typography
            className="name-item"
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <CheckCircleIcon
              sx={
                userProfileData?.userProfileData?.user?.isVerify
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
          isVerify={userProfileData?.userProfileData?.user?.isVerify}
        />
        <Button
          sx={{ color: '#0275b1', textTransform: 'unset', p: 0 }}
          className="profile-page-btn"
          component={Link}
          to={`/profile-page/${userProfileData?.userProfileData?.user?._id}`}
          variant="text"
        >
          Profile page
        </Button>
      </div>
    </Paper>
  );
};
