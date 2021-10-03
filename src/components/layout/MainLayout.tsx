import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import Navigation from 'components/navigation/Navigation';
import Footer from 'components/footer/Footer';
import { routes } from 'configs/routes';

const mdTheme = createTheme();

const MainLayout: FC = () => {
  const isLogged = false;
  const renderComponent = (module: JSX.Element, isPrivate: boolean) => () => {
    if (isPrivate) {
      return isLogged ? module : <Redirect to="/login" />;
    }
    return module;
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      {/* Header */}
      <Navigation />
      {/* /Header */}
      {/* Content */}
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
      {/* /Content */}
      {/* Footer */}
      <Footer />
      {/* /Footer */}
    </ThemeProvider>
  );
};

export default MainLayout;
