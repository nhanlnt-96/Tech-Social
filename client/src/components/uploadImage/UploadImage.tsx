import './UploadImage.scss';

import { CropImage } from 'components/uploadImage/components';
import { IModalProps } from 'model/props';
import React, { FC, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  Modal,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps extends IModalProps {
  uploadImageFor: string;
  currentImageURL: string;
}

const Input = styled('input')({
  display: 'none',
});

const UploadImage: FC<IProps> = ({
  visible,
  handleCancel,
  uploadImageFor,
  currentImageURL,
}) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [visibleCropImage, setVisibleCropImage] = useState<boolean>(false);

  const onUploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;
    if (imageFileList) {
      setVisibleCropImage(true);

      setImageUpload(imageFileList[0]);
    }
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
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="auth-title">
            <h1>Upload {uploadImageFor} Image</h1>
            <Divider />
          </div>
          <div className="upload-image__current__image">
            <Avatar sx={{ width: '50%', height: '50%' }}>
              <img
                width="100%"
                height="100%"
                src={currentImageURL}
                referrerPolicy="no-referrer"
                alt=""
              />
            </Avatar>
          </div>
          <div className="upload-image__btn-container">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e) => onUploadImageHandler(e)}
              />
              <Button
                variant="contained"
                sx={{
                  background:
                    'linear-gradient(180deg, #0077B5 0%, #0E6795 100%);',
                  borderRadius: '4px',
                  boxShadow: 'unset',
                }}
                component="span"
              >
                Upload Image
              </Button>
            </label>
          </div>
          <Box component="div" sx={{ display: 'flex' }} mt={4}>
            <Button
              sx={{ color: '#0275B1', borderColor: '#0275B1', mr: 2 }}
              fullWidth
              variant="outlined"
              onClick={handleCancel}
            >
              Close
            </Button>
            <LoadingButton
              fullWidth
              variant="contained"
              disableElevation
              loadingIndicator="Saving"
            >
              Save
            </LoadingButton>
          </Box>
          <CropImage
            visible={visibleCropImage}
            handleCancel={() => setVisibleCropImage(false)}
            imageFile={imageUpload && imageUpload}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default UploadImage;
