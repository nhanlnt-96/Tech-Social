import './Feed.scss';

import FeedCard from 'components/feedCard/FeedCard';
import { NewPost } from 'pages/feed/components';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { Grid } from '@mui/material';

const Feed: FC<RouteComponentProps> = () => {
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
