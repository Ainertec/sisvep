import React, { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'

import { useAuth } from '../contexts/auth'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

const Routes = () => {
  const { signed, loading } = useAuth()

  useEffect(() => {
    async function loadingScreen() {
      if (loading) {
        await SplashScreen.preventAutoHideAsync()
      } else {
        await SplashScreen.hideAsync()
      }
    }
    loadingScreen()
  }, [loading])

  return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
