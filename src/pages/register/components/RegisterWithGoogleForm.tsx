import React, { FC, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { passwordRegex } from 'shared/regex';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IRegisterGoogleUser } from 'model/user';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { registerWithGoogleFail } from 'store/redux/registerGoogle/actions';
import { registerRequest } from 'services/auth';
import { message } from 'antd';

type Props = {
  userData: IRegisterGoogleUser;
};

export const RegisterWithGoogleForm: FC<Props> = ({ userData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onUserInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };
  const errorPassword = passwordInput && !passwordRegex.test(passwordInput);
  const onNotYouBtnClick = () => {
    dispatch(registerWithGoogleFail());
  };
  const onSignUpBtnClick = async () => {
    setIsLoading(true);
    await registerRequest(userData, passwordInput)
      .then((response) => {
        if (response.status === 201) {
          message.success(response.data, 1.5).then(() => {
            dispatch(registerWithGoogleFail());
            setIsLoading(false);
            history.push('/login');
          });
        }
      })
      .catch((error) => {
        message.error(error.response.data.error, 1.5).then(() => {
          setIsLoading(false);
        });
      });
  };
  return (
    <>
      <Box
        sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 2.4 }}
      >
        <Avatar alt="user-email-avatar" src={userData.photoURL} />
        <div className="user-email-info">
          <p className="user-name">{userData.displayName}</p>
          <p>{userData.email}</p>
          <Button
            onClick={onNotYouBtnClick}
            sx={{ textTransform: 'none', minWidth: 'unset', p: 0 }}
          >
            Not you?
          </Button>
        </div>
      </Box>
      <FormControl sx={{ mb: 2.4 }} fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          required
          error={Boolean(errorPassword)}
          onChange={onUserInputHandler}
          name="password"
          label="Password"
          autoComplete="off"
        />
        {Boolean(errorPassword) && (
          <FormHelperText error>
            Password should be at least: 6 characters, 1 uppercase, 1 lowercase,
            1 number.
          </FormHelperText>
        )}
      </FormControl>
      <LoadingButton
        sx={{ mb: 2.4 }}
        fullWidth
        variant="contained"
        disableElevation
        disabled={Boolean(passwordInput !== '') || !errorPassword}
        loading={isLoading}
        loadingIndicator="Signing up"
        onClick={onSignUpBtnClick}
      >
        Sign up
      </LoadingButton>
    </>
  );
};
