import React, { useState, useRef } from 'react'
import { Text } from 'react-native'
import { ActionButton, Icon } from 'react-native-material-ui'
import { Tooltip } from 'react-native-elements'
import { Form } from '@unform/mobile'

import QrReader from '../../components/QrReader'

import { DatePicker, Input, Label, Button } from '../../components/Form'

import { Container, Content, MainScroll, Title } from './styles'

export default function UpdateStock({ navigation }) {
  const [cameraSide, setCameraSide] = useState(true)
  const [readedCode, setReadedCode] = useState('')
  const formRef = useRef(null)

  function handleSubmit(data, { reset }) {
    console.log(data)

    reset()
  }

  return (
    <Container>
      <Content>
        <Tooltip popover={<Text>Puxe para a direita para abrir o menu!</Text>}>
          <Icon name='last-page' size={20} color='#fff' />
        </Tooltip>
      </Content>

      <MainScroll>
        <Title>Estoque de Produto</Title>
        <QrReader
          formRef={formRef}
          cameraSide={cameraSide}
          setReadedCode={setReadedCode}
        />

        <Form
          initialData={{ teste: new Date() }}
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
          <Label>Nome:</Label>
          <Input
            name='name'
            placeholder='Digite o nome do produto'
            iconName='shopping-cart'
          />
          <Label>Estoque:</Label>
          <Input
            name='stock'
            keyboardType='numeric'
            placeholder='Digite o estoque'
            iconName='storage'
          />
          <Label>Validade:</Label>
          <DatePicker name='teste' />
          {/* <Button
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
            onPress={() => formRef.current.submitForm()}
          /> */}

          <Button onPress={() => formRef.current.submitForm()} />
          {/* <Button
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
            onPress={() => {}}
          /> */}
        </Form>
      </MainScroll>

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
    </Container>
  )
}