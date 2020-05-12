import React, { useState, useRef } from 'react'
import { Text, View, ScrollView, Picker, Switch } from 'react-native'
import { ActionButton, Icon } from 'react-native-material-ui'
import { Tooltip } from 'react-native-elements'

import { Form } from '@unform/mobile'
import { Scope } from '@unform/core'

import QrReader from '../components/QrReader'

import PrincipalForm from '../components/PrincipalForms/ProductForm'
import ProviderForm from '../components/PrincipalForms/ProviderForm'
import { Button as Btn } from '../components/Form'

export default function LeituraQrCode({ navigation }) {
  const [cameraSide, setCameraSide] = useState(true)
  const [readedCode, setReadedCode] = useState('')
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const [selectedValue, setSelectedValue] = useState('Fornecedor 1')

  const formRef = useRef(null)
  function handleSubmit(data) {
    console.log(data)
  }

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
          Atualizar/Visualizar Produto
        </Text>

        <QrReader cameraSide={cameraSide} setReadedCode={setReadedCode} />
        <Form
          initialData={{ validity: new Date() }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <PrincipalForm />
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <Scope path='provider'>
            <ProviderForm isEnabled={isEnabled} />
          </Scope>

          <Btn onPress={() => formRef.current.submitForm()} />
        </Form>

        {/* <View style={{ backgroundColor: '#333', marginTop: 35 }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Lista de Fornecedores:{' '}
          </Text>
          <Picker
            selectedValue={selectedValue}
            style={{ backgroundColor: '#555', color: '#fff', marginTop: 20 }}
            enabled={!isEnabled}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item label='Fornecedor 1' value='Fornecedor 1' />
            <Picker.Item label='Fornecedor 2' value='Fornecedor 2' />
            <Picker.Item label='Fornecedor 3' value='Fornecedor 3' />
            <Picker.Item label='Fornecedor 4' value='Fornecedor 4' />
            <Picker.Item label='Fornecedor 5' value='Fornecedor 5' />
            <Picker.Item label='Fornecedor 6' value='Fornecedor 6' />
            <Picker.Item label='Fornecedor 7' value='Fornecedor 7' />
            <Picker.Item label='Fornecedor 8' value='Fornecedor 8' />
            <Picker.Item label='Fornecedor 9' value='Fornecedor 9' />
            <Picker.Item label='Fornecedor 10' value='Fornecedor 10' />
            <Picker.Item label='Fornecedor 11' value='Fornecedor 11' />
            <Picker.Item label='Fornecedor 12' value='Fornecedor 12' />
            <Picker.Item label='Fornecedor 13' value='Fornecedor 13' />
            <Picker.Item label='Fornecedor 14' value='Fornecedor 14' />
            <Picker.Item label='Fornecedor 15' value='Fornecedor 15' />
            <Picker.Item label='Fornecedor 16' value='Fornecedor 16' />
            <Picker.Item label='Fornecedor 17' value='Fornecedor 17' />
            <Picker.Item label='Fornecedor 18' value='Fornecedor 18' />
            <Picker.Item label='Fornecedor 19' value='Fornecedor 19' />
            <Picker.Item label='Fornecedor 20' value='Fornecedor 20' />
          </Picker> */}

        {/* <Text
            style={{
              color: '#fff',
              marginTop: 35,
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            Cadastrar fornecedor:
          </Text>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          */}
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
