import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import { routes } from '../../configs/routes';

const MainLayout: FC = () => {
  const isLogged = false;
  const renderComponent = (module: JSX.Element, isPrivate: boolean) => () => {
    if (isPrivate) {
      return isLogged ? module : <Redirect to="/login" />;
    }
    return module;
  };

  return (
    <Container>
      <Switch>
        {routes.map((val) => {
          const { path, isExact, isPrivate, module } = val;
          return (
            <Route key={val.path} path={path} exact={isExact}>
              {renderComponent(module, isPrivate)}
            </Route>
          );
        })}
      </Switch>
    </Container>
  );
};

export default MainLayout;
