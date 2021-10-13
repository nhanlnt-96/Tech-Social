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
import { auth } from 'configs/firebase';
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
  const [nameValidate, setNameValidate] = useState<string | null>(null);
  const [emailValidate, setEmailValidate] = useState<string | null>(null);
  const [passwordValidate, setPasswordValidate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onUserInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { fullName, email, password } = userInput;
    setUserInput({
      ...userInput,
      [name]: value,
    });
    if (fullName !== '' && !fullNameRegex.test(fullName)) {
      setNameValidate(
        'Full name can not contains number or special character.',
      );
    } else {
      setNameValidate(null);
    }
    if (email !== '' && !emailRegex.test(email)) {
      setEmailValidate('Invalid email.');
    } else {
      setEmailValidate(null);
    }
    if (password !== '' && !passwordRegex.test(password)) {
      setPasswordValidate(
        'Password should be at least: 6 characters, 1 uppercase, 1' +
          ' lowercase, 1 number.',
      );
    } else {
      setPasswordValidate(null);
    }
  };
  const onRegisterBtnCLick = () => {
    setIsLoading(true);
    const { email, password } = userInput;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential: { user: any }) => {
        const { uid } = userCredential.user.multiFactor.user;
        registerRequest(uid, userInput).then((response) => {
          if (response.status === 201) {
            message.success(response.data, 1.5).then(() => {
              setIsLoading(false);
              history.push('/login');
            });
          }
        });
      })
      .catch((error) => {
        message.error(error.message.replace('Firebase: ', ''), 1.5).then(() => {
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
        autoComplete="off"
        error={Boolean(nameValidate)}
        helperText={Boolean(nameValidate) && nameValidate}
        onChange={onUserInputHandler}
      />
      <TextField
        required
        sx={{ mb: 2 }}
        label="Email"
        fullWidth
        name="email"
        autoComplete="off"
        error={Boolean(emailValidate)}
        helperText={Boolean(emailValidate) && emailValidate}
        onChange={onUserInputHandler}
      />
      <FormControl sx={{ mb: 2.4 }} fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
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
          label="Password"
          name="password"
          autoComplete="off"
          error={Boolean(passwordValidate)}
          onChange={onUserInputHandler}
        />
        {Boolean(passwordValidate) && (
          <FormHelperText error>{passwordValidate}</FormHelperText>
        )}
      </FormControl>
      <LoadingButton
        sx={{ mb: 2.4 }}
        fullWidth
        variant="contained"
        disableElevation
        disabled={
          userInput.email === '' ||
          userInput.fullName === '' ||
          userInput.password === '' ||
          Boolean(emailValidate) ||
          Boolean(nameValidate) ||
          Boolean(passwordValidate)
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
