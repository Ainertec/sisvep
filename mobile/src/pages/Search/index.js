import React, { useState, useRef, useEffect } from 'react'
import { Text } from 'react-native'
import { Icon } from 'react-native-material-ui'
import { Tooltip } from 'react-native-elements'

import { Form } from '@unform/mobile'

import QrReader from '../../components/QrReader'
import ActionButton from '../../components/ActionButton'

import PrincipalForm from '../../components/PrincipalForms/ProductForm'
import ProviderForm from '../../components/PrincipalForms/ProviderForm'
import { Button, Picker } from '../../components/Form'

import { Container, Content, MainScroll, Title, SwitchView } from './styles'

export default function Search() {
  const [cameraSide, setCameraSide] = useState(true)
  const [isEnabled, setIsEnabled] = useState(false)
  const [providers, setProviders] = useState([
    { name: 'Julio', _id: 123 },
    { name: 'Jão', _id: 789 },
  ])

  const productFormRef = useRef(null)
  const providerFormRef = useRef(null)

  function handleSubmitProvider(data) {
    console.log(data)
  }

  function handleSubmit(data) {
    console.log(data)
    if (isEnabled) {
      const providerData = providerFormRef.current.getData()
      providerData.products = [1234]
      handleSubmitProvider(providerData)
    }
  }

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  useEffect(() => {
    // const staticProviders = setProviders(staticProviders)
  }, [])

  return (
    <Container>
      <Content>
        <Tooltip popover={<Text>Puxe para a direita para abrir o menu!</Text>}>
          <Icon name='last-page' size={20} color='#fff' />
        </Tooltip>
      </Content>

      <MainScroll>
        <Title>Atualizar/Visualizar Produto</Title>

        <QrReader cameraSide={cameraSide} formRef={productFormRef} />

        <Form
          initialData={{ validity: new Date() }}
          ref={productFormRef}
          onSubmit={handleSubmit}
        >
          <PrincipalForm />
          <Picker
            name='providerId'
            providers={providers}
            enabled={!isEnabled}
          />
        </Form>

        <SwitchView
          thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />

        <Title>Cadastrar fornecedor:</Title>

        <Form ref={providerFormRef}>
          <ProviderForm isEnabled={isEnabled} />

          <Button onPress={() => productFormRef.current.submitForm()} />
        </Form>
      </MainScroll>
      <ActionButton setCameraSide={setCameraSide} />
    </Container>
  )
}
