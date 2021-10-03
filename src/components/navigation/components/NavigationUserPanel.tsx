import React, { FC } from 'react';
import { Avatar, Paper } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';
// import CallReceivedIcon from '@mui/icons-material/CallReceived';

export const NavigationUserPanel: FC = () => {
  return (
    <Paper
      className="user-panel-container"
      component="form"
      sx={{
        p: '2px 20px',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        // width: 330,
        boxShadow: 'unset',
      }}
    >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <div className="user-name">
        <p className="name-item">
          Le Nguyen Thien Nhan <span>YOU</span>
        </p>
        <p className="view-item">
          367 views today{' '}
          <span>
            +32
            <CallMadeIcon sx={{ fontSize: 'small' }} />
          </span>
        </p>
      </div>
    </Paper>
  );
};
