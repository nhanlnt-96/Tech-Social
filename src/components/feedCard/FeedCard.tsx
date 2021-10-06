import React, { FC } from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TestImg from 'img/test-img.jpg';
import './FeedCard.scss';

const FeedCard: FC = () => {
  return (
    <Card sx={{ marginTop: '20px', boxShadow: 'unset', borderRadius: '4px' }}>
      <CardHeader
        sx={{ padding: '5px 16px' }}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Divider />
      <CardContent sx={{ padding: '15px 30px' }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{ width: 52, height: 52, marginRight: '15px' }}
              alt="Remy Sharp"
              src="https://i.pinimg.com/280x280_RS/1e/d9/41/1ed9419c783a0398efc0f5c378eb0daf.jpg"
            />
            <div className="post-info">
              <Typography variant="h6" color="#181818">
                Le Nguyen Thien Nhan
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 200 }}
                color="#181818"
              >
                06/10/2021 21:21
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              marginBottom: '15px',
            }}
          >
            <Typography variant="subtitle1" color="#181818">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CardMedia component="img" image={TestImg} alt="Paella dish" />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions
        disableSpacing
        sx={{ padding: '8px 0', position: 'relative' }}
      >
        <IconButton className="feed-action-btn" aria-label="add to favorites">
          <ThumbUpAltOutlinedIcon />
          <Typography variant="body1" sx={{ ml: 0.5 }}>
            1
          </Typography>
        </IconButton>
        <Divider orientation="vertical" flexItem />
        <IconButton className="feed-action-btn" aria-label="share">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Divider orientation="vertical" flexItem />
      </CardActions>
    </Card>
  );
};

export default FeedCard;
