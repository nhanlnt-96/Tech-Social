import React from 'react';

import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Box, Divider, Grid, IconButton, styled } from '@mui/material';

const Input = styled('input')({
  display: 'none',
});

export const NewPost = () => {
  return (
    <Box
      sx={{
        padding: '25px 25px',
        minHeight: '135px',
        bgcolor: '#ffffff',
        borderRadius: '4px',
      }}
    >
      <Grid container>
        <Grid className="new-post-title" item xs={12}>
          <p>New Post</p>
          <Divider sx={{ width: '100%' }} />
        </Grid>
        <Grid className="new-post-text-field" item xs={12}>
          <div className="new-post-input">
            <textarea placeholder="What's on your mind?" />
          </div>
          <div className="new-post-btn">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                aria-label="upload picture"
                component="span"
                className="upload-btn"
              >
                <CropOriginalIcon />
              </IconButton>
            </label>
            <IconButton className="post-btn" aria-label="options">
              <TelegramIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
