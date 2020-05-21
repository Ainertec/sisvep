import React, { useRef } from 'react'
import { AsyncStorage } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import { Input, Label, Button } from '../../components/Form'
import QrReader from '../../components/QrReader'
import { Container, Scroll } from './styles'

export default function Setting() {
  const formRef = useRef(null)
  const navigation = useNavigation()

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        ipAddress: Yup.string().required('O ip é obrigatório.'),
      })
      await schema.validate(data, {
        abortEarly: false,
      })

      await AsyncStorage.setItem('@RN:ip', data.ipAddress)
      navigation.goBack()
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message
        })
        formRef.current.setErrors(errorMessages)
      }
    }
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
