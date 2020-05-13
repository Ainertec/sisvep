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

  const productFormRef = useRef(null)
  const providerFormRef = useRef(null)

  function handleSubmit(data) {
    console.log(data)
    if (isEnabled) {
      const providerData = providerFormRef.current.getData()
      providerData.products = [1234]
      console.log(providerData)
    }
  }
  function handleSubmitProvider(data) {
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
          ref={productFormRef}
          onSubmit={handleSubmit}
        >
          <PrincipalForm />
        </Form>

        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <Form ref={providerFormRef}>
          <ProviderForm isEnabled={isEnabled} />
          <Btn onPress={() => productFormRef.current.submitForm()} />
        </Form>

        {/* <View style={{ backgroundColor: '#333', marginTop: 35 }}>
          

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
