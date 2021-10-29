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
import { useSelector } from 'react-redux';
import { IRootState } from 'store/rootReducer';

const mdTheme = createTheme();

const styleIsAuth = {
  marginTop: '40px',
  marginBottom: '40px',
};

const styleNotAuth = {
  width: '100%',
  height: '100vh',
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const MainLayout: FC = () => {
  const token = Cookies.get('accessToken');
  const {
    userLogin: { isLogged },
  } = useSelector((state: IRootState) => state.loginUser);
  const renderComponent =
    (module: JSX.Element, isPrivate: boolean, isAuth: boolean) => () => {
      if (isAuth) {
        return !token && !isLogged ? module : <Redirect to="/" />;
      }
      if (isPrivate) {
        return token || isLogged ? module : <Redirect to="/login" />;
      }
      return module;
    };

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      {/* Header */}
      {(token || isLogged) && <Navigation />}
      {/* /Header */}
      {/* Content */}
      <Container sx={token ? styleIsAuth : styleNotAuth}>
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
      {(token || isLogged) && <Footer />}
      {/* /Footer */}
    </ThemeProvider>
  );
};

export default MainLayout;
