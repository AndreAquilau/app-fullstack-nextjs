import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme/theme';
import GlobalStyles from '../styles/global';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
    <GlobalStyles />
  </ThemeProvider>
);

export default MyApp;
