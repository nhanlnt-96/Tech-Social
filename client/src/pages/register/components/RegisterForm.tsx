import React, { FC, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IRegisterUser } from 'model/user';
import { registerRequest } from 'services/auth';
import { message } from 'antd';
import { LoadingButton } from '@mui/lab';
import { useHistory } from 'react-router';
import { emailRegex, fullNameRegex, passwordRegex } from 'shared/regex';

export const RegisterForm: FC = () => {
  const history = useHistory();
  const [userInput, setUserInput] = useState<IRegisterUser>({
    email: '',
    fullName: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onUserInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };
  const errorFullName =
    userInput.fullName && !fullNameRegex.test(userInput.fullName);
  const errorEmail = userInput.email && !emailRegex.test(userInput.email);
  const errorPassword =
    userInput.password && !passwordRegex.test(userInput.password);
  const onRegisterBtnCLick = () => {
    setIsLoading(true);
    registerRequest(userInput)
      .then((response) => {
        if (response.status === 201) {
          message.success(response.data, 1.5).then(() => {
            setUserInput({
              email: '',
              fullName: '',
              password: '',
            });
            setIsLoading(false);
            history.push('/login');
          });
        }
      })
      .catch((err) => {
        message.error(err.response.data.error, 1.5).then(() => {
          setIsLoading(false);
        });
      });
  };
  return (
    <div className="login-form">
      <TextField
        required
        sx={{ mb: 2 }}
        label="Full name"
        fullWidth
        name="fullName"
        value={userInput.fullName}
        autoComplete="off"
        error={Boolean(errorFullName)}
        helperText={
          Boolean(errorFullName) &&
          'Full name can not contains number or special character.'
        }
        onChange={onUserInputHandler}
      />
      <TextField
        required
        sx={{ mb: 2 }}
        label="Email"
        fullWidth
        name="email"
        value={userInput.email}
        autoComplete="off"
        error={Boolean(errorEmail)}
        helperText={Boolean(errorEmail) && 'Invalid email.'}
        onChange={onUserInputHandler}
      />
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
          value={userInput.password}
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
        disabled={
          userInput.email !== '' ||
          userInput.fullName !== '' ||
          userInput.password !== '' ||
          !errorFullName ||
          !errorEmail ||
          !errorPassword
        }
        loading={isLoading}
        loadingIndicator="Signing up"
        onClick={onRegisterBtnCLick}
      >
        Sign up
      </LoadingButton>
    </div>
  );
};
