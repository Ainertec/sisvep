import React, { useState, useRef } from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-material-ui'
import { Tooltip } from 'react-native-elements'
import { Form } from '@unform/mobile'

import QrReader from '../../components/QrReader'
import ActionButton from '../../components/ActionButton'

import { Input, Label, Button } from '../../components/Form'

import { Container, Content, MainScroll, Title } from './styles'

export default function SeachUpdate() {
  const [cameraSide, setCameraSide] = useState(true)
  const formRef = useRef(null)
  const navigation = useNavigation()

  function handleSubmit(data, { reset }) {
    console.log(data)

    reset()
    navigation.navigate('UpdateStock', { product: data })
  }

  return (
    <Container>
      <Content>
        <Tooltip popover={<Text>Puxe para a direita para abrir o menu!</Text>}>
          <Icon name='last-page' size={20} color='#fff' />
        </Tooltip>
      </Content>

      <MainScroll>
        <Title>Buscar Produto</Title>
        <QrReader formRef={formRef} cameraSide={cameraSide} />

        <Form
          initialData={{ validity: new Date() }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Label>Código de Barras:</Label>
          <Input
            name='barcode'
            keyboardType='numeric'
            placeholder='Digite o código de barras'
            iconName='local-offer'
          />
          <Button onPress={() => formRef.current.submitForm()} />
        </Form>
      </MainScroll>
      <ActionButton setCameraSide={setCameraSide} />
    </Container>
  )
}
