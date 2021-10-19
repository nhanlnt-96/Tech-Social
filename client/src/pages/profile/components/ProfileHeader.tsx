import React, { FC } from 'react';
import { Avatar, Box, Button, Grid, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const ProfileHeader: FC = () => {
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
                <Avatar
                  className="profile-avatar-img"
                  src="https://i.pinimg.com/280x280_RS/1e/d9/41/1ed9419c783a0398efc0f5c378eb0daf.jpg"
                  alt="profile-cover"
                  sx={{ width: '100%', height: '100%' }}
                />
              </div>
            </Grid>
            <Grid item xs={10}>
              <div className="name-and-location">
                <div className="user-name">Le Nguyen Thien Nhan</div>
                <div className="user-location">
                  <LocationOnIcon
                    sx={{ mr: 0.5, fontSize: '12px', color: '#0275B1' }}
                  />
                  Ho Chi Minh City
                </div>
              </div>
              <div className="user-introduce">
                <p>
                  Freelance UX/UI designer, 80+ projects in web design, mobile
                  apps (iOS & android) and creative projects. Open to offers.
                </p>
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
    </Box>
  );
};
