import React, { useRef } from 'react'
import { Form } from '@unform/core'

import { Input, Label, Button } from '../../components/Form'
import logo from '../../assets/logo.png'
import { useAuth } from '../../contexts/auth'

import { Container, Logo, Title } from './styles'

const Login = () => {
  const formRef = useRef(null)
  const { signed, signIn } = useAuth()
  console.log(signed)

  async function handleSubmit(data) {
    signIn()
    console.log(data)
  }
  return (
    <Container>
      <Logo source={logo} />
      <Title>Faça login</Title>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label>Nome:</Label>
        <Input name='name' placeholder='Digite o nome' iconName='person-pin' />
        <Label>Senha:</Label>
        <Input
          name='password'
          placeholder='Digite a senha'
          iconName='person-pin'
        />
        <Button title='Entrar' onPress={() => formRef.current.submitForm()} />
      </Form>
    </Container>
  )
}

export default Login
