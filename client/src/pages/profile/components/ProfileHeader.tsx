import LoadingMask from 'components/loadingMask/LoadingMask';
import VerifyPopover from 'components/verifyPoper/VerifyPopover';
import { EditProfileModal } from 'pages/profile/components/EditProfileModal';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUsers } from 'store/redux/user/selector';
import { IRootState } from 'store/rootReducer';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

const verifyIconStyle = {
  fontSize: '13px',
  marginLeft: '5px',
};

export const ProfileHeader: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const userProfileData = useSelector(getUsers);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '360px',
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0px 20px 60px rgba(241, 244, 248, 0.5)',
      }}
    >
      <Grid sx={{ height: '100%' }} container>
        <Grid
          className="profile-cover-container"
          sx={{ height: '50%' }}
          item
          xs={12}
        >
          <Avatar
            className="profile-cover-img"
            variant="square"
            src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg"
            alt="profile-cover"
            sx={{ width: '100%', height: '100%' }}
          />
          <div className="profile-cover-btn">
            <div className="left-side-btn">
              <IconButton className="btn-upload" aria-label="options">
                <FileUploadOutlinedIcon />
              </IconButton>
            </div>
            <div className="right-side-btn">
              <Button
                className="btn-edit"
                variant="contained"
                startIcon={<BorderColorIcon />}
                onClick={() => setVisible(true)}
              >
                Edit profile
              </Button>
              <IconButton className="btn-options" aria-label="options">
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
        </Grid>
        <Grid sx={{ p: 2.5, height: '50%', position: 'relative' }} item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <div className="profile-avatar">
                {userProfileData?.userProfileData?.user?.avatarImageURL ? (
                  <Avatar
                    alt={userProfileData?.userProfileData?.user?._id}
                    src={`${userProfileData?.userProfileData?.user?.avatarImageURL}`}
                    sx={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <Avatar
                    alt={userProfileData?.userProfileData?.user?._id}
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <Typography variant="h2" sx={{ color: '#ffffff' }}>
                      {userProfileData?.userProfileData?.user?.fullName.charAt(
                        0,
                      )}
                    </Typography>
                  </Avatar>
                )}
              </div>
            </Grid>
            <Grid item xs={10}>
              <div className="name-and-location">
                <div className="user-name">
                  {userProfileData?.userProfileData?.user?.fullName}
                  <Typography
                    className="name-item"
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
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
                </div>
                <VerifyPopover
                  open={open}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  isVerify={userProfileData?.userProfileData?.user?.isVerify}
                />
                {userProfileData?.userProfileData?.user?.location && (
                  <div className="user-location">
                    <LocationOnIcon
                      sx={{ mr: 0.5, fontSize: '12px', color: '#0275B1' }}
                    />
                    {userProfileData?.userProfileData?.user?.location}
                  </div>
                )}
              </div>
              <div className="user-introduce">
                <p>{userProfileData?.userProfileData?.user?.about}</p>
              </div>
              <div className="user-contact">
                <Button
                  variant="contained"
                  sx={{
                    background:
                      'linear-gradient(180deg, #0077B5 0%, #0E6795 100%);',
                    borderRadius: '4px',
                    boxShadow: 'unset',
                  }}
                >
                  Contact info
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <EditProfileModal visible={visible} setVisible={setVisible} />
      {userProfileData.isLoading && <LoadingMask />}
    </Box>
  );
};
