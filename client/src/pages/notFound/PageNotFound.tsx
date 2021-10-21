import React, { FC } from 'react';
import { Button } from '@mui/material';
import IconPNF from 'img/page-not-found.png';

import './PageNotFound.scss';
import { Link } from 'react-router-dom';

const PageNotFound: FC = () => {
  return (
    <div className="page-not-found">
      <img src={IconPNF} alt="page-not-found" />
      <h3>OOPS !!</h3>
      <h2>PAGE NOT FOUND</h2>
      <Button
        component={Link}
        to="/"
        sx={{ mb: 2.4 }}
        variant="contained"
        disableElevation
      >
        Go to Home
      </Button>
    </div>
  );
};

export default PageNotFound;
