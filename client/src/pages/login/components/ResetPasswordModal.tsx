import React, { FC, useState } from 'react';
import { Backdrop, Box, Fade, Modal, TextField } from '@mui/material';
import { emailRegex } from 'shared/regex';
import { LoadingButton } from '@mui/lab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { resetPasswordRequest } from 'services/auth';
import { message } from 'antd';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ISentEmailSuccess {
  isSent: boolean;
  message: string;
}

export const ResetPasswordModal: FC<Props> = ({ visible, setVisible }) => {
  const [sentSuccess, setSentSuccess] = useState<ISentEmailSuccess>({
    isSent: false,
    message: '',
  });
  const [emailInput, setEmailInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleCancel = () => {
    setVisible(false);
  };
  const onUserInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };
  const errorEmail = emailInput && !emailRegex.test(emailInput);
  const onSendEmailBtnClick = () => {
    setIsLoading(true);
    resetPasswordRequest(emailInput)
      .then((response: any) => {
        if (response.status === 200) {
          setSentSuccess({
            isSent: true,
            message: response.data,
          });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        message.error(error.response.data.error, 1.5).then(() => {
          setSentSuccess({
            isSent: false,
            message: '',
          });
          setIsLoading(false);
        });
      });
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={visible}
      onClose={handleCancel}
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
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          {!sentSuccess.isSent ? (
            <>
              <div className="auth-title">
                <h1>Forgot password?</h1>
                <p>
                  Don&apos;t worry! Enter your email below and we&apos;ll email
                  you with instruction on how to reset your password.
                </p>
              </div>
              <TextField
                required
                sx={{ mb: 2 }}
                label="Email"
                fullWidth
                name="email"
                autoComplete="off"
                value={emailInput}
                error={Boolean(errorEmail)}
                helperText={Boolean(errorEmail) && 'Invalid email.'}
                onChange={onUserInputHandler}
              />
              <LoadingButton
                fullWidth
                variant="contained"
                disableElevation
                disabled={emailInput === '' || Boolean(errorEmail)}
                loading={isLoading}
                loadingIndicator="Sending"
                onClick={onSendEmailBtnClick}
              >
                Send email
              </LoadingButton>
            </>
          ) : (
            <div className="send-mail-success">
              <CheckCircleIcon sx={{ color: '#52c41a', fontSize: '75px' }} />
              <p>Email has been sent!</p>
              <span>{sentSuccess.message}</span>
            </div>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};
