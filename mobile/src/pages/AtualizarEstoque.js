import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Picker } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ActionButton, Icon } from 'react-native-material-ui';
import { Button, Input, Tooltip } from 'react-native-elements';



export default function LeituraQrCode({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  var [ladoCamera, setLadoCamera] = useState(true);
  var [codigoLido, setCodigoLido] = useState(true);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    /////////////////////////////////////////////////// aqui pega o código ohhhhhh //////////////////////////////////////////////////////////
    //await AsyncStorage.setItem('id',data);
    //navigation.navigate('Home');
    setCodigoLido(data);
    alert('Codigo de barras n: '+data);
    setTimeout(()=>{setScanned(false);}, 3000); 
  };

  if (hasPermission === null) {
    return <Text>É necessario permissão para acessar a camera!</Text>;
  }
  if (hasPermission === false) {
    return <Text>Não é possivel acessar a camera!</Text>;
  }



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

        <Text style={{color:'#fff', fontSize:20, marginTop:20, textAlign:'center'}}>Estoque de Produto</Text>
          
        <BarCodeScanner barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8, BarCodeScanner.Constants.BarCodeType.code39]} type={('back')} type={ladoCamera ? ('back'):('front')} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{height: 250, position:'relative', marginTop:20}}/>

          <Text style={{color:'#fff', marginTop:35}}>Código de Barras:</Text>
          <Input
            placeholder='Código de Barras'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#222'}}
            keyboardType='numeric'
            leftIcon={
              <Icon
                name='local-offer'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
            value={codigoLido}
          />
          
          <Text style={{color:'#fff', marginTop:35}}>Nome:</Text>
          <Input
            placeholder='Nome'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#222'}}
            disabled={true}
            leftIcon={
              <Icon
                name='shopping-cart'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          <Text style={{color:'#fff', marginTop:35}}>Estoque:</Text>
          <Input
            placeholder='Estoque'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#222'}}
            keyboardType='numeric'
            leftIcon={
              <Icon
                name='storage'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          <Button
            title="Atualizar"
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
            title="Limpar"
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
            onPress={()=>{setCodigoLido(true)}}
          />

        </ScrollView>
        <ActionButton style={{container:({backgroundColor:'blue'}), icon:({color:'#fff'})}} icon="camera-front" onPress={() => {ladoCamera ? setLadoCamera(false) : setLadoCamera(true)}}/>
    </View>
  );
}