import React, { useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Icon } from 'react-native-material-ui'
import { Tooltip } from 'react-native-elements'
import { Form } from '@unform/mobile'

import ProductForm from '../../components/PrincipalForms/ProductForm'
import { Button, Picker } from '../../components/Form'

import { Container, Content, MainScroll, Title } from './styles'

export default function UpdateStock() {
  const [providers, setProviders] = useState([
    { name: 'Julio', _id: 123 },
    { name: 'Jão', _id: 789 },
  ])
  const navigation = useNavigation()
  const route = useRoute()
  const { product } = route.params

  const formRef = useRef(null)

  function handleSubmit(data, { reset }) {
    console.log(data)
    reset()
    navigation.goBack()
  }
  useEffect(() => {
    formRef.current.setData(product)
  })

  return (
    <Container>
      <Content>
        <Tooltip popover={<Text>Puxe para a direita para abrir o menu!</Text>}>
          <Icon name='last-page' size={20} color='#fff' />
        </Tooltip>
      </Content>

      <MainScroll>
        <Title>Atualizar Produto</Title>

        <Form
          initialData={{ validity: new Date() }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <ProductForm />
          <Picker name='providerId' providers={providers} />

          <Button
            style={{ marginTop: 40 }}
            onPress={() => formRef.current.submitForm()}
          />
        </Form>
      </MainScroll>
    </Container>
  )
}
