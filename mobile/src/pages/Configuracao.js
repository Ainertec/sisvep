import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Input, Tooltip, Icon } from 'react-native-elements';



export default function LeituraQrCode({navigation}) {
  var [ip, setIp] = useState(true);


  return (
    <View style={{ flex: 1, backgroundColor:'#222'}}>
        
        <View style={{backgroundColor:'#202026', height: '100%', width: 20, justifyContent:'center', position:'absolute'}}>
            <Tooltip popover={<Text>Puxe para a direita para abrir o menu!</Text>}>
              <Icon
                name='last-page'
                size={20}
                color='#fff'
              />
            </Tooltip>
        </View>

        <ScrollView style={{flex:3, marginLeft:20, marginBottom:10}}>

        <Text style={{color:'#fff', fontSize:20, marginTop:20, textAlign:'center'}}>Configuração</Text>
          
          <Text style={{color:'#fff', marginTop:35}}>Endereço IP:</Text>
          <Input
            placeholder=' ex.: 192.168.0.1'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#222'}}
            value={ip}
            leftIcon={
              <Icon
                name='leak-add'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          <Button
            title=" Salvar"
            color='#fff'
            titleStyle={{color:'#fff'}}
            buttonStyle={{marginTop:20, backgroundColor:'green'}}
            icon={
              <Icon
                name="save"
                size={15}
                color="white"
                style={{color:'#fff', marginRight:10}}
              />
            }
            onPress={()=>{alert('ola')}}
          />

          <Button
            title=" Cancelar"
            color='#fff'
            titleStyle={{color:'#fff'}}
            buttonStyle={{marginTop:10, backgroundColor:'red'}}
            icon={
              <Icon
                name="close"
                size={15}
                color="white"
                style={{color:'#fff', marginRight:10}}
              />
            }
            onPress={()=>{setIp(true)}}
          />

        </ScrollView>
    </View>
  );
}