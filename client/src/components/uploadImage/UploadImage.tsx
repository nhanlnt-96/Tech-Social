import './UploadImage.scss';

import { message } from 'antd';
import { CropImage } from 'components/uploadImage/components';
import { storage } from 'configs/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { IModalProps, TUploadImage } from 'model/props';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from 'services/user';
import { generateFirebaseFolderPath } from 'shared/generateFirebaseFolderPath';
import { getUserProfileStart } from 'store/redux/user/actions';

import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  Modal,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps extends IModalProps {
  currentImageURL: string;
  isUseCropImage: boolean;
  userId: string;
  userName: string;
  uploadImageFor: TUploadImage;
}

const Input = styled('input')({
  display: 'none',
});

interface IImageSize {
  [index: string]: {
    width: number;
    height: number;
  };
}

interface IUploadingImage {
  progress: number;
  status: boolean;
}

export const imageSize: IImageSize = {
  cover: {
    width: 1152,
    height: 180,
  },
  avatar: {
    width: 150,
    height: 150,
  },
};

const UploadImage: FC<IProps> = ({
  visible,
  uploadImageFor,
  currentImageURL,
  isUseCropImage,
  userId,
  setVisible,
  userName,
}) => {
  const dispatch = useDispatch();
  const [imageUploadUrl, setImageUploadUrl] = useState<string>('');
  const [visibleCropImage, setVisibleCropImage] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [imageUploadType, setImageUploadType] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState<IUploadingImage>();

  const onInputImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;
    if (imageFileList && isUseCropImage) {
      setVisibleCropImage(true);

      setImageUploadUrl(URL.createObjectURL(imageFileList[0]));

      setImageUploadType(imageFileList[0].type);
    }
    if (!isUseCropImage && imageFileList) {
      setCroppedImage(imageFileList[0]);
    }
  };

  const onInputImageBtnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).value = '';
  };

  const onSaveImageBtnClick = () => {
    if (croppedImage) {
      const imageName = croppedImage?.name;

      const firebaseFolderPath = generateFirebaseFolderPath(
        uploadImageFor,
        userId,
      );
      const filePath = `${firebaseFolderPath}/${imageName}`;

      const storageRef = ref(storage, filePath);

      const metadata = {
        contentType: croppedImage?.type,
      };

      const uploadImageAction = uploadBytesResumable(
        storageRef,
        croppedImage,
        metadata,
      );

      uploadImageAction.on(
        'state_changed',
        (snapshot: any) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setIsUploadingImage({ progress, status: true });
        },
        () => {
          message.error('Upload failed!');

          setIsUploadingImage({ progress: 0, status: false });
        },
        () => {
          getDownloadURL(uploadImageAction.snapshot.ref).then(
            async (downloadURL) => {
              const uploadComplete = await updateUserProfile({
                [`${uploadImageFor}ImageURL`]: downloadURL,
              });
              if (
                uploadComplete.status === 200 ||
                uploadComplete.statusText === 'OK'
              ) {
                onCloseModalBtnClick();

                dispatch(getUserProfileStart(userId));

                setIsUploadingImage({ progress: 0, status: false });
              } else {
                setIsUploadingImage({ progress: 0, status: false });

                message.error('Upload failed!');
              }
            },
          );
        },
      );
    }
  };

  const onCloseModalBtnClick = () => {
    setVisible(false);

    setCroppedImage(null);
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
    >
      <Fade in={visible}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width:
              uploadImageFor === 'avatar'
                ? 600
                : imageSize[uploadImageFor].width,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="auth-title">
            <h1>Upload {uploadImageFor} Image</h1>
            <Divider />
          </div>
          <Box
            component="div"
            sx={{ width: '100%' }}
            className="upload-image__current__image"
          >
            <Box
              component="div"
              sx={{
                position: 'relative',
                paddingBottom: `${
                  (imageSize[uploadImageFor].height /
                    imageSize[uploadImageFor].width) *
                  100
                }%`,
                width: '100%',
                borderRadius: uploadImageFor === 'avatar' ? '100%' : 'unset',
                overflow: 'hidden',
              }}
              className="upload-image__current__image-container"
            >
              {currentImageURL || croppedImage ? (
                <img
                  src={
                    croppedImage
                      ? URL.createObjectURL(croppedImage)
                      : currentImageURL
                  }
                  referrerPolicy="no-referrer"
                  alt=""
                />
              ) : (
                <Typography
                  variant="h2"
                  sx={{
                    color: '#ffffff',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    backgroundColor: '#bdbdbd',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {userName.charAt(0)}
                </Typography>
              )}
            </Box>
          </Box>
          <div className="upload-image__btn-container">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e) => onInputImageHandler(e)}
                onClick={(e) => onInputImageBtnClick(e)}
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
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component="div"
              sx={{ display: 'flex', maxWidth: 500, width: '50%' }}
              mt={4}
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
                loadingIndicator={`Saving ${
                  isUploadingImage?.progress &&
                  `${Math.floor(isUploadingImage.progress)}%`
                }`}
                onClick={onSaveImageBtnClick}
                disabled={!croppedImage || isUploadingImage?.status}
                loading={isUploadingImage?.status}
              >
                Save
              </LoadingButton>
            </Box>
          </Box>
          <CropImage
            visible={visibleCropImage}
            setVisible={setVisibleCropImage}
            imageUrl={imageUploadUrl}
            uploadImageFor={uploadImageFor}
            userId={userId}
            setCroppedImage={setCroppedImage}
            imageUploadType={imageUploadType}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default UploadImage;
