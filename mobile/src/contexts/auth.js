import React, { createContext, useState, useEffect, useContext } from 'react'
import { AsyncStorage } from 'react-native'

import * as auth from '../services/auth'
import { api } from '../services/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorage() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user')
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token')
      if (storagedUser && storagedToken) {
        const apiService = await api()
        apiService.defaults.headers.Authorization = `Bearer ${storagedToken}`

        setUser(JSON.parse(storagedUser))
      }
      setLoading(false)
    }

    loadStorage()
  }, [])

  async function signIn(data) {
    const response = await auth.signIn(data.name, data.password)

    if (!response.status) {
      return alert('não foi possivel conectar')
    }
    if (response.status === 401) {
      return alert('Usuário ou senha incorretos')
    }

    setUser(response.data.user)
    const apiService = await api()
    apiService.defaults.headers.Authorization = `Bearer ${response.data.token}`

    await AsyncStorage.setItem(
      '@RNAuth:user',
      JSON.stringify(response.data.user)
    )
    await AsyncStorage.setItem('@RNAuth:token', response.data.token)
  }

  function signOut() {
    setUser(null)
    AsyncStorage.removeItem('@RNAuth:user').then(() => {
      setUser(null)
    })
    AsyncStorage.removeItem('@RNAuth:token').then(() => {
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
