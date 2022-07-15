import { generateImageFile } from 'components/uploadImage/ultils';
import { imageSize } from 'components/uploadImage/UploadImage';
import { IModalProps, TUploadImage } from 'model/props';
import React, {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import ReactCrop, { PixelCrop } from 'react-image-crop';
import { generateFileName } from 'shared/generateFileName';

import { LoadingButton } from '@mui/lab';
import { Backdrop, Box, Button, Container, Fade, Modal } from '@mui/material';

interface IProps extends IModalProps {
  imageUrl: string;
  userId: string;
  setCroppedImage: Dispatch<SetStateAction<File | null>>;
  uploadImageFor: TUploadImage;
  imageUploadType: string;
}

export const CropImage: FC<IProps> = ({
  visible,
  setVisible,
  imageUrl,
  uploadImageFor,
  userId,
  setCroppedImage,
  imageUploadType,
}) => {
  const [cropImage, setCropImage] = useState<PixelCrop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: imageSize[uploadImageFor].width,
    height: imageSize[uploadImageFor].height,
  });
  const imageToCropRef = useRef() as MutableRefObject<HTMLImageElement>;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onGetCroppedImageBtnClick = async () => {
    setIsLoading(true);

    const generateResult = await generateImageFile(
      imageToCropRef.current,
      cropImage,
      generateFileName(userId, uploadImageFor),
      imageUploadType,
    );
    if (generateResult) {
      setIsLoading(false);

      setCroppedImage(generateResult);

      onCloseModalBtnClick();
    }
  };

  const onCloseModalBtnClick = () => {
    setVisible(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={visible}
      onClose={onCloseModalBtnClick}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className="crop-image"
    >
      <Fade in={visible}>
        <Container
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          className="crop-image__container"
        >
          <Box component="div" sx={{ width: '100%' }}>
            <ReactCrop
              crop={cropImage}
              onChange={setCropImage}
              locked
              circularCrop={uploadImageFor === 'avatar'}
            >
              <img ref={imageToCropRef} src={imageUrl} alt="preview" />
            </ReactCrop>
          </Box>
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            mt={4}
          >
            <Box
              component="div"
              sx={{ display: 'flex', maxWidth: 500, width: '50%' }}
            >
              <Button
                sx={{ color: '#0275B1', borderColor: '#0275B1', mr: 2 }}
                fullWidth
                variant="outlined"
                onClick={onCloseModalBtnClick}
              >
                Close
              </Button>
              <LoadingButton
                fullWidth
                variant="contained"
                disableElevation
                loadingIndicator="Cropping"
                onClick={onGetCroppedImageBtnClick}
                loading={isLoading}
              >
                Crop
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </Fade>
    </Modal>
  );
};
