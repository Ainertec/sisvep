import React from 'react'
import { SplashScreen } from 'expo'

import { useAuth } from '../contexts/auth'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

const Routes = () => {
  const { signed, loading } = useAuth()

  if (loading) {
    SplashScreen.preventAutoHide()
  }
  return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
