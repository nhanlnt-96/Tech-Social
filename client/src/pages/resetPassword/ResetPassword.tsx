import PageNotFound from 'pages/notFound/PageNotFound';
import { ResetPasswordForm } from 'pages/resetPassword/components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { validateToken } from 'services/auth';

import { CircularProgress } from '@mui/material';

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsPageLoading(true);

    validateToken(token)
      .then((res) => {
        if (res.status === 200) {
          setIsPageLoading(false);
        }
      })
      .catch((err) => {
        if (err) {
          setIsPageLoading(false);

          setIsTokenExpired(true);
        }
      });
  }, [token]);

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isPageLoading ? (
        <CircularProgress />
      ) : isTokenExpired ? (
        <PageNotFound />
      ) : (
        <ResetPasswordForm token={token} />
      )}
    </>
  );
};

export default ResetPassword;
