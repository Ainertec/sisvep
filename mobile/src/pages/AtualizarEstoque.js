import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Picker } from 'react-native'
import { ActionButton, Icon } from 'react-native-material-ui'
import { Button, Input, Tooltip } from 'react-native-elements'

import QrReader from '../components/QrReader'

export default function LeituraQrCode({ navigation }) {
  var [cameraSide, setCameraSide] = useState(true)
  var [readedCode, setReadedCode] = useState('')

  return (
    <View style={{ flex: 1, backgroundColor: '#222' }}>
      <View
        style={{
          backgroundColor: '#202026',
          height: '100%',
          width: 20,
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <Tooltip popover={<Text>Puxe para a direita para abrir o menu!</Text>}>
          <Icon name='last-page' size={20} color='#fff' />
        </Tooltip>
      </View>

      <ScrollView style={{ flex: 3, marginLeft: 20, marginBottom: 10 }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Estoque de Produto
        </Text>
        <QrReader cameraSide={cameraSide} setReadedCode={setReadedCode} />

        <Text style={{ color: '#fff', marginTop: 35 }}>Código de Barras:</Text>
        <Input
          placeholder='Código de Barras'
          inputStyle={{ color: '#fff' }}
          containerStyle={{ backgroundColor: '#222' }}
          keyboardType='numeric'
          leftIcon={
            <Icon
              name='local-offer'
              size={24}
              color='#fff'
              style={{ marginRight: 20 }}
            />
          }
          value={readedCode}
        />

        <Text style={{ color: '#fff', marginTop: 35 }}>Nome:</Text>
        <Input
          placeholder='Nome'
          inputStyle={{ color: '#fff' }}
          containerStyle={{ backgroundColor: '#222' }}
          disabled={true}
          leftIcon={
            <Icon
              name='shopping-cart'
              size={24}
              color='#fff'
              style={{ marginRight: 20 }}
            />
          }
        />

        <Text style={{ color: '#fff', marginTop: 35 }}>Estoque:</Text>
        <Input
          placeholder='Estoque'
          inputStyle={{ color: '#fff' }}
          containerStyle={{ backgroundColor: '#222' }}
          keyboardType='numeric'
          leftIcon={
            <Icon
              name='storage'
              size={24}
              color='#fff'
              style={{ marginRight: 20 }}
            />
          }
        />

        <Button
          title='Atualizar'
          color='#fff'
          titleStyle={{ color: '#fff' }}
          buttonStyle={{ marginTop: 20, backgroundColor: 'green' }}
          icon={
            <Icon
              name='save'
              size={15}
              color='white'
              style={{ color: '#fff', marginRight: 10 }}
            />
          }
          onPress={() => {
            alert('ola')
          }}
        />

        <Button
          title='Limpar'
          color='#fff'
          titleStyle={{ color: '#fff' }}
          buttonStyle={{ marginTop: 10, backgroundColor: 'red' }}
          icon={
            <Icon
              name='close'
              size={15}
              color='white'
              style={{ color: '#fff', marginRight: 10 }}
            />
          }
          onPress={() => {
            setCodigoLido(true)
          }}
        />
      </ScrollView>
      <ActionButton
        style={{
          container: { backgroundColor: 'blue' },
          icon: { color: '#fff' },
        }}
        icon='camera-front'
        onPress={() => {
          cameraSide ? setCameraSide(false) : setCameraSide(true)
        }}
      />
    </View>
  )
}
