import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { NewPost } from 'pages/feed/components';
import './Feed.scss';

const Feed: FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <NewPost />
      </Grid>
      <Grid item xs={12}>
        feed
      </Grid>
    </Grid>
  );
};

export default Feed;
