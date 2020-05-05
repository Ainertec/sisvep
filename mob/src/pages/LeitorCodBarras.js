import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { ActionButton, Icon } from 'react-native-material-ui';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Tooltip } from 'react-native-elements';



export default function LeituraQrCode({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  var [ladoCamera, setLadoCamera] = useState(true);


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
    alert('Codigo de barras capturado: '+data);
    setTimeout(()=>{setScanned(false);}, 3000); 
  };

  if (hasPermission === null) {
    return <Text>É necessario permissão para acessar a camera!</Text>;
  }
  if (hasPermission === false) {
    return <Text>Não é possivel acessar a camera!</Text>;
  }



  return (
    <View style={{ flex: 1, backgroundColor:'#999'}}>
        <View style={{backgroundColor:'#202026', height: '100%', width: 20, justifyContent:'center', position:'absolute'}}>
            <Tooltip popover={<Text>Puxe para a direita para abrir o menu!</Text>}>
              <Icon
                name='last-page'
                size={20}
                color='#fff'
              />
            </Tooltip>
        </View>
        <BarCodeScanner barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8, BarCodeScanner.Constants.BarCodeType.code39]} type={ladoCamera ? ('back'):('front')} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{flex:1, position:'relative', marginLeft:20}}/>
        <ActionButton style={{container:({backgroundColor:'blue'}), icon:({color:'#fff'})}} icon="camera-front" onPress={() => {ladoCamera ? setLadoCamera(false) : setLadoCamera(true)}}/>
    </View>
  );
}