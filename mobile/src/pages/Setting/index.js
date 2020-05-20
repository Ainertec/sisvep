import React, { useRef } from 'react'

import { Form } from '@unform/mobile'

import { useAuth } from '../../contexts/auth'

import { Input, Label, Button } from '../../components/Form'
import { Container, Scroll, Title } from './styles'

export default function Setting() {
  const formRef = useRef(null)
  const { signOut } = useAuth()

  async function handleSubmit(data) {
    console.log(data)
  }
  async function signedOut() {
    signOut()
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

        <Button title='Logout' onPress={() => signedOut()} />
      </Scroll>
    </Container>
  )
}
