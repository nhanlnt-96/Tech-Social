import React, { FC, useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ILoginUser } from 'model/user';
import { emailRegex, passwordRegex } from 'shared/regex';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart } from 'store/redux/auth/actions';
import { ResetPasswordModal } from 'pages/login/components/ResetPasswordModal';
import { IRootState } from 'store/rootReducer';

export const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState<ILoginUser>({
    email: '',
    password: '',
  });
  const [visible, setVisible] = useState<boolean>(false);
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
  const {
    userLogin: { isLoading },
  } = useSelector((state: IRootState) => state.loginUser);
  const errorEmail = userInput.email && !emailRegex.test(userInput.email);
  const errorPassword =
    userInput.password && !passwordRegex.test(userInput.password);
  const onLoginBtnClick = () => {
    dispatch(loginStart(userInput));
  };
  return (
    <div className="login-form">
      <TextField
        required
        sx={{ mb: 2 }}
        label="Email"
        fullWidth
        name="email"
        autoComplete="off"
        value={userInput.email}
        error={Boolean(errorEmail)}
        helperText={Boolean(errorEmail) && 'Invalid email.'}
        onChange={onUserInputHandler}
      />
      <FormControl sx={{ mb: 1 }} fullWidth variant="outlined">
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
          error={Boolean(errorPassword)}
          onChange={onUserInputHandler}
          name="password"
          value={userInput.password}
          autoComplete="off"
        />
        {Boolean(errorPassword) && (
          <FormHelperText error>
            Password should be at least: 6 characters, 1 uppercase, 1 lowercase,
            1 number.
          </FormHelperText>
        )}
      </FormControl>
      <Button
        sx={{ p: 0.5, mb: 2.4 }}
        variant="text"
        onClick={() => setVisible(true)}
      >
        Forgot password?
      </Button>
      <LoadingButton
        fullWidth
        variant="contained"
        disableElevation
        disabled={
          userInput.email === '' ||
          userInput.password === '' ||
          Boolean(errorEmail) ||
          Boolean(errorPassword)
        }
        loading={isLoading}
        loadingIndicator="Signing in"
        onClick={onLoginBtnClick}
      >
        Sign in
      </LoadingButton>
      <ResetPasswordModal visible={visible} setVisible={setVisible} />
    </div>
  );
};
