import React, { FC } from 'react';
import { Avatar, Box, Button, Grid, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

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
        <Grid sx={{ p: 2.5, height: '50%' }} item xs={12}>
          infor
        </Grid>
      </Grid>
    </Box>
  );
};
