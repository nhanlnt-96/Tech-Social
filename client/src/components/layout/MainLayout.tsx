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
import Cookies from 'js-cookie';
import { IRootState } from 'store/rootReducer';
import { useSelector } from 'react-redux';

const mdTheme = createTheme();

const MainLayout: FC = () => {
  const token = Cookies.get('accessToken');
  const { isLogged } = useSelector((state: IRootState) => state.loginUser);
  const renderComponent =
    (module: JSX.Element, isPrivate: boolean, isAuth: boolean) => () => {
      if (isAuth) {
        return !isLogged && !token ? module : <Redirect to="/" />;
      }
      if (isPrivate) {
        return isLogged || token ? module : <Redirect to="/login" />;
      }
      return module;
    };

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      {/* Header */}
      {(isLogged || token) && <Navigation />}
      {/* /Header */}
      {/* Content */}
      <Container sx={{ marginTop: '40px', marginBottom: '40px' }}>
        <Switch>
          {routes.map((val) => {
            const { path, isExact, isPrivate, isAuth, module } = val;
            return (
              <Route key={val.path} path={path} exact={isExact}>
                {renderComponent(module, isPrivate, isAuth)}
              </Route>
            );
          })}
        </Switch>
      </Container>
      {/* /Content */}
      {/* Footer */}
      {(isLogged || token) && <Footer />}
      {/* /Footer */}
    </ThemeProvider>
  );
};

export default MainLayout;
