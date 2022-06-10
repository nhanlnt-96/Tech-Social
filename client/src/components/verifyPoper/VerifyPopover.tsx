import React, { FC } from 'react';

import { Popover, Typography } from '@mui/material';

type Props = {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  isVerify: boolean;
};

const VerifyPopover: FC<Props> = ({
  open,
  anchorEl,
  setAnchorEl,
  isVerify,
}) => {
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none',
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Typography sx={{ p: 1 }}>
        {isVerify
          ? 'User account is verified 😍'
          : 'User account is not verify 🤔'}
      </Typography>
    </Popover>
  );
};

export default VerifyPopover;
