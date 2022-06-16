import { IModalProps } from 'model/props';
import React, { FC, useState } from 'react';
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from 'react-image-crop';

import { Backdrop, Box, Fade, Modal } from '@mui/material';

interface IProps extends IModalProps {
  imageFile: File;
}

export const CropImage: FC<IProps> = ({ visible, handleCancel, imageFile }) => {
  const [crop, setCrop] = useState<Crop>();

  console.log(imageFile);

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
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <img src={imageFile} />
          </ReactCrop>
        </Box>
      </Fade>
    </Modal>
  );
};
