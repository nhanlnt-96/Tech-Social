import React, { FC, useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { passwordRegex } from 'shared/regex';
import { resetPassword } from 'services/auth';
import { message } from 'antd';
import { useHistory } from 'react-router';

type Props = {
  token: string;
};

export const ResetPasswordForm: FC<Props> = ({ token }) => {
  const history = useHistory();
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
  const onResetPasswordBtnClick = () => {
    setIsLoading(true);
    resetPassword(token, passwordInput)
      .then((response) => {
        if (response.status === 200) {
          message.success(response.data, 1.5).then(() => {
            setIsLoading(false);
            history.push('/login');
          });
        }
      })
      .catch((error) => {
        message.error(error.response.data.error.error.message, 1.5).then(() => {
          setIsLoading(false);
        });
      });
  };
  return (
    <Paper
      elevation={3}
      sx={{
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2.4,
      }}
    >
      <div className="auth-title">
        <h1>Reset password</h1>
        <p>Enter your new password below.</p>
      </div>
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
        disabled={passwordInput === '' || Boolean(errorPassword)}
        loading={isLoading}
        loadingIndicator="Resetting password"
        onClick={onResetPasswordBtnClick}
      >
        Reset password
      </LoadingButton>
      <Button
        component={Link}
        to="/login"
        sx={{ p: 0.5, ml: 0.5 }}
        variant="text"
      >
        Cancel
      </Button>
    </Paper>
  );
};
