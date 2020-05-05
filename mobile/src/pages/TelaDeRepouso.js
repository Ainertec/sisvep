import React from 'react';
import { View, ActivityIndicator, ImageBackground, Text } from 'react-native';
import { Icon } from 'react-native-material-ui';
import { Tooltip } from 'react-native-elements';



export default function TelaDescanso({navigation}) {

  return (
    <View style={{ flex: 1, backgroundColor:'#222'}}>
      <ImageBackground source={require('../../assets/splash.png')} PlaceholderContent={<ActivityIndicator />} style={{ flex:1, resizeMode: "cover", justifyContent: "center" }}>
        
        <View style={{backgroundColor:'#202026', height: '100%', width: 20, justifyContent:'center'}}>
            <Tooltip popover={<Text>Puxe para a direita para abrir o menu!</Text>}>
              <Icon
                name='last-page'
                size={20}
                color='#fff'
              />
            </Tooltip>
        </View>

      </ImageBackground>
    </View>
  );
}