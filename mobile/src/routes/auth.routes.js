import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import IpSetting from '../pages/IpSetting';

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name='SignIn'
        component={Login}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#222', elevation: 10 },
          headerRight: () => (
            <View style={{ paddingRight: 15 }}>
              <Icon
                size={25}
                name='cog'
                color='#fff'
                onPress={() => {
                  navigation.navigate('IpSetting');
                }}
              />
            </View>
          ),
        })}
      />
      <AuthStack.Screen
        name='IpSetting'
        component={IpSetting}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Configurar Ip',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#222', elevation: 10 },
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
