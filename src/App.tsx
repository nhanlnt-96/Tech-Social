import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Navigation from 'components/navigation/Navigation';
import MainLayout from 'components/layout/MainLayout';

import './scss/App.scss';

const mdTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Navigation />
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
