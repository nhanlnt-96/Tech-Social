import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { logoutStart } from 'store/redux/auth/actions';

import { Backdrop, Box, Button, Fade, Grid, Modal } from '@mui/material';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LogoutConfirm: FC<Props> = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);

  const onLogoutBtnClick = () => {
    dispatch(logoutStart());
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="auth-title">
            <h1>Log out?</h1>
            <p>Are you sure you want to log out?</p>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                sx={{ color: '#0275B1', borderColor: '#0275B1' }}
                fullWidth
                variant="outlined"
                onClick={handleClose}
              >
                No
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                sx={{ boxShadow: 'unset', backgroundColor: '#0275B1' }}
                fullWidth
                variant="contained"
                onClick={onLogoutBtnClick}
              >
                Yes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};
