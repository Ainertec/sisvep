import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'

import RestScren from './pages/RestScreen/index'
import LeitorCodBarras from './pages/LeitorCodBarras'
import CreateProduct from './pages/CreateProduct'
import Search from './pages/Search'
import UpdateStock from './pages/UpdateStock/index'
import Configuracao from './pages/Configuracao'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function TabAguardo({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#222' },
        headerRight: () => (
          <Icon
            name='more-vert'
            color='#fff'
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name='Sisvep' component={RestScren} />
    </Stack.Navigator>
  )
}

function TabVenda({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#000' },
        headerRight: () => (
          <Icon
            name='more-vert'
            color='#fff'
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name='Sisvep' component={LeitorCodBarras} />
    </Stack.Navigator>
  )
}

function TabCreateProduct({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#222' },
        headerRight: () => (
          <Icon
            name='more-vert'
            color='#fff'
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name='Sisvep' component={CreateProduct} />
    </Stack.Navigator>
  )
}

function TabSearch({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#222' },
        headerRight: () => (
          <Icon
            name='more-vert'
            color='#fff'
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name='Sisvep' component={Search} />
    </Stack.Navigator>
  )
}

function TabUpdateStock({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#222' },
        headerRight: () => (
          <Icon
            name='more-vert'
            color='#fff'
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name='Sisvep' component={UpdateStock} />
    </Stack.Navigator>
  )
}

function TabConfiguracao({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#222' },
        headerRight: () => (
          <Icon
            name='more-vert'
            color='#fff'
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen name='Sisvep' component={Configuracao} />
    </Stack.Navigator>
  )
}

const Routes = (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName='Home'
      drawerType='back'
      drawerStyle={{
        backgroundColor: '#222',
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor: '#999',
        labelStyle: { color: '#fff' },
      }}
    >
      <Drawer.Screen name='Tela de Descanso' component={TabAguardo} />
      <Drawer.Screen name='Venda' component={TabVenda} />
      <Drawer.Screen name='Cadastrar produto' component={TabCreateProduct} />
      <Drawer.Screen name='Buscar produto' component={TabSearch} />
      <Drawer.Screen name='Estoque' component={TabUpdateStock} />
      <Drawer.Screen name='Configuração' component={TabConfiguracao} />
    </Drawer.Navigator>
  </NavigationContainer>
)

export default Routes
