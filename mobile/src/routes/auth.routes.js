import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../pages/Login'
import IpSetting from '../pages/IpSetting'

const AuthStack = createStackNavigator()

const AuthRoutes = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name='SingIn'
      component={Login}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name='IpSetting'
      component={IpSetting}
      options={{
        headerTitleAlign: 'center',
        headerTitle: 'Configurar Ip',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#222' },
      }}
    />
  </AuthStack.Navigator>
)

export default AuthRoutes
