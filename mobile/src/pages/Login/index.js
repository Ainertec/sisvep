import React, { useRef } from 'react'
import { Form } from '@unform/core'

import { Input, Label, Button } from '../../components/Form'
import { Container, Logo, Title } from './styles'
import logo from '../../assets/logo.png'

const Login = () => {
  const formRef = useRef(null)

  async function handleSubmit(data) {
    console.log(data)
  }
  return (
    <Container>
      <Logo source={logo} />
      <Title>Faça login</Title>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label>Nome:</Label>
        <Input name='name' placeholder='Digite o nome' />
        <Label>Senha:</Label>
        <Input name='password' placeholder='Digite a senha' />
        <Button title='Entrar' onPress={() => formRef.current.submitForm()} />
      </Form>
    </Container>
  )
}

export default Login
