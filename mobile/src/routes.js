import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';


import TelaDeRepouso from './pages/TelaDeRepouso';
import LeitorCodBarras from './pages/LeitorCodBarras';
import CadastroDeProduto from './pages/CadastroDeProdutos';
import BuscarProduto from './pages/BuscarProduto';
import AtualizarEstoque from './pages/AtualizarEstoque';
import Configuracao from './pages/Configuracao';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function TabAguardo({navigation}){
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#222' },
            headerRight: ()=>(<Icon name='more-vert' color='#fff' onPress={()=>(navigation.openDrawer())}></Icon>)
          }}>
            <Stack.Screen name="Sisvep" component={TelaDeRepouso} />
        </Stack.Navigator>
    )
}


function TabVenda({navigation}){
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#000' },
            headerRight: ()=>(<Icon name='more-vert' color='#fff' onPress={()=>(navigation.openDrawer())}></Icon>)
          }}>
            <Stack.Screen name="Sisvep" component={LeitorCodBarras} />
        </Stack.Navigator>
    )
}


function TabProdutoCadastro({navigation}){
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#222' },
            headerRight: ()=>(<Icon name='more-vert' color='#fff' onPress={()=>(navigation.openDrawer())}></Icon>)
          }}>
            <Stack.Screen name="Sisvep" component={CadastroDeProduto} />
        </Stack.Navigator>
    )
}


function TabProdutoBusca({navigation}){
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#222' },
            headerRight: ()=>(<Icon name='more-vert' color='#fff' onPress={()=>(navigation.openDrawer())}></Icon>)
          }}>
            <Stack.Screen name="Sisvep" component={BuscarProduto} />
        </Stack.Navigator>
    )
}



function TabAtualizarEstoque({navigation}){
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#222' },
            headerRight: ()=>(<Icon name='more-vert' color='#fff' onPress={()=>(navigation.openDrawer())}></Icon>)
          }}>
            <Stack.Screen name="Sisvep" component={AtualizarEstoque} />
        </Stack.Navigator>
    )
}



function TabConfiguracao({navigation}){
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#222' },
            headerRight: ()=>(<Icon name='more-vert' color='#fff' onPress={()=>(navigation.openDrawer())}></Icon>)
          }}>
            <Stack.Screen name="Sisvep" component={Configuracao} />
        </Stack.Navigator>
    )
}



const Routes = (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerType='back'
                drawerStyle={{
                    backgroundColor: '#222',
                    width: 240,
                }}
                drawerContentOptions={{
                    activeTintColor: '#999',
                    labelStyle:{color:'#fff'},
            }}>
                <Drawer.Screen name="Tela de Descanso" component={TabAguardo} />
                <Drawer.Screen name="Venda" component={TabVenda} />
                <Drawer.Screen name="Cadastrar produto" component={TabProdutoCadastro} />
                <Drawer.Screen name="Buscar produto" component={TabProdutoBusca} />
                <Drawer.Screen name="Estoque" component={TabAtualizarEstoque} />
                <Drawer.Screen name="Configuração" component={TabConfiguracao} />
                
            </Drawer.Navigator>
        </NavigationContainer>
);

export default Routes;