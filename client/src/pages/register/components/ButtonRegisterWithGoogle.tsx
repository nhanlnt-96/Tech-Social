import { message } from 'antd';
import { Providers } from 'configs/firebase';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { IRegisterGoogleUser } from 'model/user';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerWithGoogleSuccess } from 'store/redux/registerGoogle/actions';

import GoogleIcon from '@mui/icons-material/Google';
import { LoadingButton } from '@mui/lab';

const ButtonRegisterWithGoogle: FC = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // create user by google account
  const onCreateUserByGoogleBtnClick = () => {
    setIsLoading(true);

    signInWithPopup(auth, Providers)
      .then(async (result: any) => {
        const {
          user: { displayName, email, photoURL },
        } = result;

        const userData: IRegisterGoogleUser = {
          displayName,
          email,
          photoURL,
        };

        dispatch(registerWithGoogleSuccess(userData));
      })
      .catch((error) => {
        message.error(error.message, 1.5).then(() => {
          setIsLoading(false);
        });
      });
  };

  return (
    <LoadingButton
      fullWidth
      sx={{ mb: 2.4 }}
      variant="outlined"
      startIcon={<GoogleIcon />}
      loading={isLoading}
      loadingIndicator="Joining with Google"
      onClick={onCreateUserByGoogleBtnClick}
    >
      Join with Google
    </LoadingButton>
  );
};

export default ButtonRegisterWithGoogle;
