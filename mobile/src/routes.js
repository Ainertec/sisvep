import React from 'react'
import { View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'

import RestScren from './pages/RestScreen/index'
import LeitorCodBarras from './pages/LeitorCodBarras'
import CreateProduct from './pages/CreateProduct'
import Search from './pages/Search/index'
import Details from './pages/Details/index'
import Update from './pages/Update'
import SeachUpdate from './pages/SeachUpdate/index'
import Configuracao from './pages/Configuracao'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const stackOptions = () => {
  const navigation = useNavigation()
  return {
    headerTitleAlign: 'center',
    headerTitle: 'Sisvep',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#222' },
    headerLeft: () => (
      <View style={{ marginLeft: 15 }}>
        <Icon
          size={26}
          name='menu'
          color='#fff'
          onPress={() => navigation.openDrawer()}
        />
      </View>
    ),
  }
}
function TabRest() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name='Home' component={RestScren} />
    </Stack.Navigator>
  )
}
function TabVenda() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name='Venda' component={LeitorCodBarras} />
    </Stack.Navigator>
  )
}
function TabCreateProduct() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name='Cadastro' component={CreateProduct} />
    </Stack.Navigator>
  )
}
function TabSearch() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Busca' component={Search} options={stackOptions} />
      <Stack.Screen
        name='Details'
        component={Details}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Detalhes',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#222' },
        }}
      />
    </Stack.Navigator>
  )
}
function TabUpdateStock() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Busca'
        component={SeachUpdate}
        options={stackOptions}
      />
      <Stack.Screen
        name='Update'
        component={Update}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Atualizar Produto',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#222' },
        }}
      />
    </Stack.Navigator>
  )
}
function TabConfiguracao() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name='Configuração' component={Configuracao} />
    </Stack.Navigator>
  )
}
const Routes = () => (
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
    <Drawer.Screen name='Home' component={TabRest} />
    <Drawer.Screen name='Venda' component={TabVenda} />
    <Drawer.Screen name='Cadastrar produto' component={TabCreateProduct} />
    <Drawer.Screen name='Buscar produto' component={TabSearch} />
    <Drawer.Screen name='Estoque' component={TabUpdateStock} />
    <Drawer.Screen name='Configuração' component={TabConfiguracao} />
  </Drawer.Navigator>
)

export default Routes
