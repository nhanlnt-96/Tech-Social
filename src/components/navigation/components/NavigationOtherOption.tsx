import React, { FC } from 'react';
import { IconButton, Menu, MenuItem, Paper } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const options = ['Option 1', 'Option 2', 'Option 3'];
const ITEM_HEIGHT = 48;

export const NavigationOtherOption: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
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
        // justifyContent: 'center',
        // width: 90,
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
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
};
