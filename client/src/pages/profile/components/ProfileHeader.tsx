import LoadingMask from 'components/loadingMask/LoadingMask';
import UploadImage from 'components/uploadImage/UploadImage';
import VerifyPopover from 'components/verifyPoper/VerifyPopover';
import { EditProfileModal } from 'pages/profile/components/EditProfileModal';
import React, { createContext, FC, useState } from 'react';
import { useSelector } from 'react-redux';
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

export type TProfileHeaderContext = {
  userId: string;
};

export const ProfileHeaderContext = createContext<TProfileHeaderContext>({
  userId: '',
});

export const ProfileHeader: FC = () => {
  const [visibleEditProfileForm, setVisibleEditProfileForm] =
    useState<boolean>(false);

  const [visibleUploadCoverImage, setVisibleUploadCoverImage] =
    useState<boolean>(false);

  const userProfileData = useSelector(
    (state: IRootState) => state.getUserProfile,
  );
  const userProfile = userProfileData?.userProfileData?.user;
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
          {userProfile?.coverImageURL ? (
            <Avatar
              className="profile-cover-img"
              variant="square"
              src={userProfile?.coverImageURL}
              alt="profile-cover"
              sx={{ width: '100%', height: '100%' }}
            />
          ) : (
            <Avatar
              className="profile-cover-img"
              variant="square"
              alt="profile-cover"
              sx={{ width: '100%', height: '100%' }}
            >
              <Typography variant="h2" sx={{ color: '#ffffff' }}>
                {userProfile?.fullName.charAt(0)}
              </Typography>
            </Avatar>
          )}
          <div className="profile-cover-btn">
            <div className="left-side-btn">
              <IconButton
                className="btn-upload"
                aria-label="upload picture"
                onClick={() => setVisibleUploadCoverImage(true)}
              >
                <FileUploadOutlinedIcon />
              </IconButton>
            </div>
            <div className="right-side-btn">
              <Button
                className="btn-edit"
                variant="contained"
                startIcon={<BorderColorIcon />}
                onClick={() => setVisibleEditProfileForm(true)}
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
                {userProfile?.avatarImageURL ? (
                  <Avatar sx={{ width: '100%', height: '100%' }}>
                    <img
                      width="100%"
                      height="100%"
                      src={`${userProfile?.avatarImageURL}`}
                      referrerPolicy="no-referrer"
                      alt={userProfile?._id}
                    />
                  </Avatar>
                ) : (
                  <Avatar
                    alt={userProfile?._id}
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <Typography variant="h2" sx={{ color: '#ffffff' }}>
                      {userProfile?.fullName.charAt(0)}
                    </Typography>
                  </Avatar>
                )}
              </div>
            </Grid>
            <Grid item xs={10}>
              <div className="name-and-location">
                <div className="user-name">
                  {userProfile?.fullName}
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
                        userProfile?.isVerify
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
                  isVerify={userProfile?.isVerify}
                />
                {userProfile?.location && (
                  <div className="user-location">
                    <LocationOnIcon
                      sx={{ mr: 0.5, fontSize: '12px', color: '#0275B1' }}
                    />
                    {userProfile?.location}
                  </div>
                )}
              </div>
              <div className="user-introduce">
                <p>{userProfile?.about}</p>
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
      <EditProfileModal
        visible={visibleEditProfileForm}
        setVisible={setVisibleEditProfileForm}
      />
      <UploadImage
        visible={visibleUploadCoverImage}
        setVisible={setVisibleUploadCoverImage}
        uploadImageFor="cover"
        currentImageURL={userProfile?.coverImageURL}
        userName={userProfile?.fullName}
        isUseCropImage
        userId={userProfile?._id}
      />
      {userProfileData.isLoading && <LoadingMask />}
    </Box>
  );
};
