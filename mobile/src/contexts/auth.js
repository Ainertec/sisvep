import React, { createContext, useState, useEffect, useContext } from 'react'
import { AsyncStorage } from 'react-native'
import { SplashScreen } from 'expo'

import * as auth from '../services/auth'
import { api } from '../services/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    SplashScreen.preventAutoHide()
    async function loadStorage() {
      SplashScreen.preventAutoHide()
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user')
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token')
      if (storagedUser && storagedToken) {
        const apiService = await api()
        apiService.defaults.headers.Authorization = `Bearer ${storagedToken}`

        setUser(JSON.parse(storagedUser))
        setLoading(false)
        SplashScreen.hide()
      }
    }

    loadStorage()
  }, [])

  async function signIn() {
    const response = await auth.signIn()

    setUser(response.user)

    const apiService = await api()
    apiService.defaults.headers.Authorization = `Bearer ${response.token}`

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user))
    await AsyncStorage.setItem('@RNAuth:token', response.token)
  }

  function signOut() {
    setUser(null)
    AsyncStorage.clear().then(() => {
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
