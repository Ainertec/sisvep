import React from 'react';
// import * as SplashScreen from 'expo-splash-screen';
import { AppLoading } from 'expo';

import { useAuth } from '../contexts/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes = () => {
  const { signed, loading } = useAuth();

  // useEffect(() => {
  //   async function loadingScreen() {
  //     if (loading) {
  //       await SplashScreen.preventAutoHideAsync();
  //     } else {
  //       await SplashScreen.hideAsync();
  //     }
  //   }
  //   loadingScreen();
  // }, [loading]);

  if (loading) {
    return <AppLoading />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
