import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { NewPost } from 'pages/feed/components';
import FeedCard from 'components/feedCard/FeedCard';
import { withRouter } from 'react-router-dom';

import './Feed.scss';

const Feed: FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <NewPost />
      </Grid>
      <Grid item xs={12}>
        <FeedCard />
      </Grid>
    </Grid>
  );
};

export default withRouter(Feed);
