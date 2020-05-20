import 'react-native-gesture-handler'
import React from 'react'
import { YellowBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'
import { AuthProvider } from './src/contexts/auth'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  // 'componentWillReceiveProps',
  // 'Possible Unhandled Promise',
])
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}
