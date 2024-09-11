import React from 'react';
import type { AppProps } from 'next/app';
import '../globals.css'; // Ensure correct path
import { UserProvider } from './context/UserContext';

function MyApp({ Component, pageProps }: AppProps) {  // Explicitly define types
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
