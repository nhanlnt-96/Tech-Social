import { EditProfileForm } from 'pages/profile/components/EditProfileForm';
import React, { FC, useState } from 'react';

import { Backdrop, Box, Fade, Modal } from '@mui/material';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditProfileModal: FC<Props> = ({ visible, setVisible }) => {
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={visible}
      onClose={handleCancel}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={visible}>
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
            <h1>Edit profile</h1>
          </div>
          <EditProfileForm setVisible={setVisible} />
        </Box>
      </Fade>
    </Modal>
  );
};
