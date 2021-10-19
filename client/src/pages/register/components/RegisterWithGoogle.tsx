import React, { FC, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Providers } from 'configs/firebase';
import { registerRequest } from 'services/auth';
import { message } from 'antd';
import { useHistory } from 'react-router';
import { IRegisterGoogleUser } from 'model/user';
import { LoadingButton } from '@mui/lab';

const RegisterWithGoogle: FC = () => {
  const auth = getAuth();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onCreateUserByGoogleBtnClick = () => {
    setIsLoading(true);
    signInWithPopup(auth, Providers)
      .then(async (result: any) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const {
          user: { uid, displayName, email, photoURL },
        } = result;
        const userData: IRegisterGoogleUser = {
          displayName,
          email,
          photoURL,
        };
  };
  return (
    <>
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
    </>
  );
};

export default RegisterWithGoogle;
