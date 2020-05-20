import React, { useRef } from 'react'
import { AsyncStorage } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Form } from '@unform/mobile'

import { Input, Label, Button } from '../../components/Form'
import QrReader from '../../components/QrReader'
import { Container, Scroll } from './styles'

export default function Setting() {
  const formRef = useRef(null)
  const navigation = useNavigation()

  async function handleSubmit(data) {
    await AsyncStorage.setItem('@RN:ip', data.ipAddress)
    navigation.goBack()
  }

  return (
    <Container>
      <Scroll>
        <QrReader
          formRef={formRef}
          cameraSide
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Label>Endereço ip:</Label>
          <Input
            name='ipAddress'
            iconName='leak-add'
            placeholder='Digite endereço ip'
          />
          <Button onPress={() => formRef.current.submitForm()} />
        </Form>
      </Scroll>
    </Container>
  )
}
