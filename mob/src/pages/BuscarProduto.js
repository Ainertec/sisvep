import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Picker, Switch } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ActionButton, Icon } from 'react-native-material-ui';
import { Button, Input, Tooltip } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'



export default function LeituraQrCode({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  var [ladoCamera, setLadoCamera] = useState(true);
  var [codigoLido, setCodigoLido] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [selectedValue, setSelectedValue] = useState("Fornecedor 1");


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

        <Text style={{color:'#fff', fontSize:20, marginTop:20, textAlign:'center'}}>Atualizar/Visualizar Produto</Text>
          
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
            leftIcon={
              <Icon
                name='shopping-cart'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          <Text style={{color:'#fff', marginTop:35}}>Descrição:</Text>
          <Input 
            multiline={true}
            placeholder="Descrição"
            inputStyle={{color:'#fff'}}
            numberOfLines={3}
            editable={true}
            containerStyle={{backgroundColor:'#222'}}
            leftIcon={
              <Icon
                name='description'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          <Text style={{color:'#fff', marginTop:35}}>Preço venda unidade:</Text>
          <Input
            placeholder='Preço de venda'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#222'}}
            keyboardType='numeric'
            leftIcon={
              <Icon
                name='attach-money'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          <Text style={{color:'#fff', marginTop:35}}>Preço de custo:</Text>
          <Input
            placeholder='Preço de custo'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#222'}}
            keyboardType='numeric'
            leftIcon={
              <Icon
                name='attach-money'
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


          <Text style={{color:'#fff', marginTop:35}}>Data de chegada: </Text>
          <DatePicker
            style={{width: '100%', backgroundColor:'#222'}}
            date={new Date()}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
              },
              dateInput: {
                  marginLeft: 36,
                  backgroundColor:'#fff'
              }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
           />

          <Text style={{color:'#fff', marginTop:35}}>Data de validade: </Text>
          <DatePicker
            style={{width: '100%', backgroundColor:'#222'}}
            date={new Date()}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
              },
              dateInput: {
                  marginLeft: 36,
                  backgroundColor:'#fff'
              }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
           />


          <View style={{backgroundColor:'#333', marginTop:35}}>

          <Text style={{color:'#fff', textAlign:'center', fontSize:20, marginTop:10}}>Lista de Fornecedores: </Text>
          <Picker
            selectedValue={selectedValue}
            style={{ backgroundColor:'#555', color:'#fff', marginTop:20}}
            enabled={!isEnabled}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Fornecedor 1" value="Fornecedor 1" />
            <Picker.Item label="Fornecedor 2" value="Fornecedor 2" />
            <Picker.Item label="Fornecedor 3" value="Fornecedor 3" />
            <Picker.Item label="Fornecedor 4" value="Fornecedor 4" />
            <Picker.Item label="Fornecedor 5" value="Fornecedor 5" />
            <Picker.Item label="Fornecedor 6" value="Fornecedor 6" />
            <Picker.Item label="Fornecedor 7" value="Fornecedor 7" />
            <Picker.Item label="Fornecedor 8" value="Fornecedor 8" />
            <Picker.Item label="Fornecedor 9" value="Fornecedor 9" />
            <Picker.Item label="Fornecedor 10" value="Fornecedor 10" />
            <Picker.Item label="Fornecedor 11" value="Fornecedor 11" />
            <Picker.Item label="Fornecedor 12" value="Fornecedor 12" />
            <Picker.Item label="Fornecedor 13" value="Fornecedor 13" />
            <Picker.Item label="Fornecedor 14" value="Fornecedor 14" />
            <Picker.Item label="Fornecedor 15" value="Fornecedor 15" />
            <Picker.Item label="Fornecedor 16" value="Fornecedor 16" />
            <Picker.Item label="Fornecedor 17" value="Fornecedor 17" />
            <Picker.Item label="Fornecedor 18" value="Fornecedor 18" />
            <Picker.Item label="Fornecedor 19" value="Fornecedor 19" />
            <Picker.Item label="Fornecedor 20" value="Fornecedor 20" />
          </Picker>

          <Text style={{color:'#fff', marginTop:35, textAlign:'center', fontSize:20}}>Cadastrar fornecedor:</Text>
          <View style={{alignItems:'center', marginTop:10}}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "blue" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <Text style={{color:'#fff', marginTop:35}}>Nome fornecedor:</Text>
          <Input
            placeholder='Nome'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#333'}}
            disabled={!isEnabled}
            leftIcon={
              <Icon
                name='group'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          <Text style={{color:'#fff', marginTop:35}}>Descrição:</Text>
          <Input
            placeholder='Descrição'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#333'}}
            disabled={!isEnabled}
            leftIcon={
              <Icon
                name='description'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          <Text style={{color:'#fff', marginTop:35}}>Telefone:</Text>
          <Input
            placeholder='Telefone'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#333'}}
            disabled={!isEnabled}
            leftIcon={
              <Icon
                name='phone'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          <Text style={{color:'#fff', marginTop:35}}>Email:</Text>
          <Input
            placeholder='Email'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#333'}}
            disabled={!isEnabled}
            leftIcon={
              <Icon
                name='email'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          <Text style={{color:'#fff', marginTop:35}}>CPF ou CNPJ:</Text>
          <Input
            placeholder='CPF ou CNPJ'
            inputStyle={{color:'#fff'}}
            containerStyle={{backgroundColor:'#333'}}
            disabled={!isEnabled}
            leftIcon={
              <Icon
                name='assignment-ind'
                size={24}
                color='#fff'
                style={{marginRight:20}}
              />
            }
          />

          </View>

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