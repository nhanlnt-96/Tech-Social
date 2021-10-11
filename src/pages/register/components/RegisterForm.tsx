import React, { FC, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IRegisterUser } from 'model/user';
import { auth } from 'configs/firebase';

export const RegisterForm: FC = () => {
  const [userInput, setUserInput] = useState<IRegisterUser>({
    email: '',
    username: '',
    password: '',
    avatarImageURL: '',
  });
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
  const onRegisterBtnCLick = () => {
    auth
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .then((response: { user: any }) => {
        const { uid, email } = response.user.multiFactor.user;
        console.log(`uid: ${uid} - email: ${email}`);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <div className="login-form">
      <TextField
        sx={{ mb: 2 }}
        label="Username"
        fullWidth
        name="username"
        onChange={onUserInputHandler}
      />
      <TextField
        sx={{ mb: 2 }}
        label="Email"
        fullWidth
        name="email"
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
          label="Password"
          name="password"
          onChange={onUserInputHandler}
        />
      </FormControl>
      <Button
        sx={{ mb: 2.4 }}
        fullWidth
        variant="contained"
        disableElevation
        onClick={onRegisterBtnCLick}
      >
        Sign up
      </Button>
    </div>
  );
};
