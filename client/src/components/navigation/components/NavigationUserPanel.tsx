import React, { FC, useEffect, useState } from 'react';
import { Avatar, Button, Paper, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStart } from 'store/redux/auth/actions';
import { IRootState } from 'store/rootReducer';
import { Link } from 'react-router-dom';

const verifyIconStyle = {
  fontSize: '13px',
  marginLeft: '5px',
};

export const NavigationUserPanel: FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: IRootState) => state.loginUser.userAuthData,
  );
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    dispatch(getAuthStart());
  }, []);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
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
      <Avatar alt={userData?.id} src={`${userData?.avatarImageURL}`} />
      <div className="user-name">
        <Typography
          className="name-item"
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {userData?.fullName}
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
