import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import {  } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'

import RestScren from './pages/RestScreen/index'
import LeitorCodBarras from './pages/LeitorCodBarras'
import CreateProduct from './pages/CreateProduct'
import Search from './pages/Search/index'
import UpdateStock from './pages/UpdateStock/index'
import SeachUpdate from './pages/SeachUpdate/index'
import Configuracao from './pages/Configuracao'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const DrawerPages = () => {
  return (
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
      <Drawer.Screen name='Home' component={RestScren} />
      <Drawer.Screen name='Venda' component={LeitorCodBarras} />
      <Drawer.Screen name='Cadastro' component={CreateProduct} />
      <Drawer.Screen name='Atualizar' component={SeachUpdate} />
      <Drawer.Screen name='Busca' component={Search} />
      <Drawer.Screen name='Configurações' component={Configuracao} />
    </Drawer.Navigator>
  )
}

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTitle: 'Sisvep',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#222221' },
        headerRight: () => (
          <Icon name='more-vert' color='#fff' onPress={() => {}} />
        ),
      }}
    >
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: false,
        }}
        name='Home'
        component={DrawerPages}
      />
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: false,
        }}
        name='UpdateStock'
        component={UpdateStock}
      />
    </Stack.Navigator>
  )
}

// function TabAguardo({ navigation }) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTintColor: 'white',
//         headerStyle: { backgroundColor: '#222' },
//         headerRight: () => (
//           <Icon
//             name='more-vert'
//             color='#fff'
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     >
//       <Stack.Screen name='Sisvep' component={RestScren} />
//     </Stack.Navigator>
//   )
// }

// function TabVenda({ navigation }) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTintColor: 'white',
//         headerStyle: { backgroundColor: '#000' },
//         headerRight: () => (
//           <Icon
//             name='more-vert'
//             color='#fff'
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     >
//       <Stack.Screen name='Sisvep' component={LeitorCodBarras} />
//     </Stack.Navigator>
//   )
// }

// function TabCreateProduct({ navigation }) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTintColor: 'white',
//         headerStyle: { backgroundColor: '#222' },
//         headerRight: () => (
//           <Icon
//             name='more-vert'
//             color='#fff'
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     >
//       <Stack.Screen name='Sisvep' component={CreateProduct} />
//     </Stack.Navigator>
//   )
// }

// function TabSearch({ navigation }) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTintColor: 'white',
//         headerStyle: { backgroundColor: '#222' },
//         headerRight: () => (
//           <Icon
//             name='more-vert'
//             color='#fff'
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     >
//       <Stack.Screen name='Sisvep' component={Search} />
//     </Stack.Navigator>
//   )
// }

// function TabUpdateStock({ navigation }) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTintColor: 'white',
//         headerStyle: { backgroundColor: '#222' },
//         headerRight: () => (
//           <Icon
//             name='more-vert'
//             color='#fff'
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     >
//       <Stack.Screen name='Sisvep' component={UpdateStock} />
//     </Stack.Navigator>
//   )
// }

// function TabConfiguracao({ navigation }) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTintColor: 'white',
//         headerStyle: { backgroundColor: '#222' },
//         headerRight: () => (
//           <Icon
//             name='more-vert'
//             color='#fff'
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     >
//       <Stack.Screen name='Sisvep' component={Configuracao} />
//     </Stack.Navigator>
//   )
// }

// const DrawerRoutes = (
//   <NavigationContainer>
//     <Drawer.Navigator
//       initialRouteName='Home'
//       drawerType='back'
//       drawerStyle={{
//         backgroundColor: '#222',
//         width: 240,
//       }}
//       drawerContentOptions={{
//         activeTintColor: '#999',
//         labelStyle: { color: '#fff' },
//       }}
//     >
//       <Drawer.Screen name='Tela de Descanso' component={TabAguardo} />
//       <Drawer.Screen name='Venda' component={TabVenda} />
//       <Drawer.Screen name='Cadastrar produto' component={TabCreateProduct} />
//       <Drawer.Screen name='Buscar produto' component={TabSearch} />
//       <Drawer.Screen name='Estoque' component={TabUpdateStock} />
//       <Drawer.Screen name='Configuração' component={TabConfiguracao} />
//     </Drawer.Navigator>
//   </NavigationContainer>
// )

// const Routes = (

// )

export default Routes
