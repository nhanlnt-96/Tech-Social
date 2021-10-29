import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import PageNotFound from 'pages/notFound/PageNotFound';
import { ResetPasswordForm } from 'pages/resetPassword/components';

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsPageLoading(true);
  }, []);
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
