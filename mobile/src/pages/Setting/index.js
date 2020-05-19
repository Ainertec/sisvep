import React, { useRef } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Form } from '@unform/mobile'

import { Input, Label, Button } from '../../components/Form'
import { Container, Scroll, Title } from './styles'

export default function Setting() {
  const formRef = useRef(null)

  async function handleSubmit(data) {
    console.log(data)
  }

  return (
    <Container>
      <Scroll>
        <Title>Configuração</Title>

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
