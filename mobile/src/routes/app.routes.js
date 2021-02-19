import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import Sold from '../pages/Sold';
import CreateProduct from '../pages/CreateProduct';
import CreateProvider from '../pages/CreateProvider';
import Search from '../pages/Search/index';
import Details from '../pages/Details/index';
import Update from '../pages/Update';
import SeachUpdate from '../pages/SeachUpdate/index';
import Setting from '../pages/Setting';
import IpSetting from '../pages/IpSetting';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const stackOptions = () => {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  return {
    headerTitleAlign: 'center',
    headerTitle: 'Sisvep',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: colors.background,
      elevation: 10,
    },
    headerLeft: () => (
      <View style={{ marginLeft: 15 }}>
        <Icon
          size={26}
          name='menu'
          color={colors.secundary}
          onPress={() => navigation.openDrawer()}
        />
      </View>
    ),
  };
};

function TabVenda() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name='Venda' component={Sold} />
    </Stack.Navigator>
  );
}
function TabCreateProduct() {
  const { colors } = useContext(ThemeContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Cadastro'
        component={CreateProduct}
        options={stackOptions}
      />
      <Stack.Screen
        name='CreateProvider'
        component={CreateProvider}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Cadastrar Fornecedor',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: colors.background, elevation: 10 },
        }}
      />
    </Stack.Navigator>
  );
}
function TabSearch() {
  const { colors } = useContext(ThemeContext);
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
          headerStyle: { backgroundColor: colors.background, elevation: 10 },
        }}
      />
    </Stack.Navigator>
  );
}
function TabUpdateStock() {
  const { colors } = useContext(ThemeContext);
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
          headerStyle: { backgroundColor: colors.background, elevation: 10 },
        }}
      />
    </Stack.Navigator>
  );
}
function TabConfiguracao() {
  const { colors } = useContext(ThemeContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Configuração'
        component={Setting}
        options={stackOptions}
      />
      <Stack.Screen
        name='IpSetting'
        component={IpSetting}
        options={{
          headerTitleAlign: 'center',
          headerTitle: 'Configurar Ip',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: colors.background, elevation: 10 },
        }}
      />
    </Stack.Navigator>
  );
}
const AppRoutes = () => {
  const { colors } = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerType='back'
      drawerStyle={{
        backgroundColor: colors.background,
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor: '#999',
        labelStyle: { color: colors.text },
      }}
    >
      <Drawer.Screen name='Venda' component={TabVenda} />
      <Drawer.Screen name='Cadastrar ' component={TabCreateProduct} />
      <Drawer.Screen name='Buscar ' component={TabSearch} />
      <Drawer.Screen name='Atualizar' component={TabUpdateStock} />
      <Drawer.Screen name='Configurações' component={TabConfiguracao} />
    </Drawer.Navigator>
  );
};

export default AppRoutes;
