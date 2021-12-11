import React, { FC, useState } from 'react';
import { IconButton, Menu, MenuItem, Paper } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { LogoutConfirm } from 'components/navigation/components/LogoutConfirm';

const ITEM_HEIGHT = 48;

export const NavigationOtherOption: FC = () => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = () => {
    setOpenConfirm(true);
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper
      className="user-panel-container"
      component="form"
      sx={{
        p: '2px 20px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'unset',
      }}
    >
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleOpen}>Log out</MenuItem>
      </Menu>
      <LogoutConfirm open={openConfirm} setOpen={setOpenConfirm} />
    </Paper>
  );
};
