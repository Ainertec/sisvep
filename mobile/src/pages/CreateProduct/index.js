import React, { useState, useRef, useEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import { Form } from '@unform/mobile'

import QrReader from '../../components/QrReader'
import ActionButton from '../../components/ActionButton'

import {
  ProviderForm,
  ProductForm,
  productValidation,
  providerValidation,
} from '../../components/PrincipalForms'
import sendError from '../../utils/sendError'

import { Button, Picker } from '../../components/Form'

import { Container, MainScroll, Title, SwitchView } from './styles'

export default function CreateProduct() {
  const [cameraSide, setCameraSide] = useState(true)
  const [isEnabled, setIsEnabled] = useState(false)
  const [providers, setProviders] = useState([
    { name: 'Julio', _id: 123 },
    { name: 'Jão', _id: 789 },
  ])

  const productFormRef = useRef(null)
  const providerFormRef = useRef(null)

  async function handleSubmitProvider(data) {
    try {
      providerFormRef.current.setErrors({})
      await providerValidation(data)
      console.log(data)
    } catch (err) {
      sendError(err, providerFormRef)
    }
  }

  async function handleSubmit(data) {
    try {
      productFormRef.current.setErrors({})
      await productValidation(data)
      console.log(data)
      if (isEnabled) {
        const providerData = providerFormRef.current.getData()
        providerData.products = [1234]
        handleSubmitProvider(providerData)
      }
    } catch (err) {
      sendError(err, productFormRef)
    }
  }

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  useEffect(() => {
    // const staticProviders = setProviders(staticProviders)
  }, [])

  return (
    <Container>
      <MainScroll>
        <Title>Atualizar/Visualizar Produto</Title>

        <QrReader cameraSide={cameraSide} formRef={productFormRef} />

        <Form
          initialData={{ validity: new Date() }}
          ref={productFormRef}
          onSubmit={handleSubmit}
        >
          <ProductForm />
          <Picker
            name='providerId'
            providers={providers}
            enabled={!isEnabled}
          />
        </Form>
        <SwitchView
          thumbColor={isEnabled ? '#080705' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />

        <Title>Cadastrar fornecedor</Title>

        <Form ref={providerFormRef}>
          <ProviderForm isEnabled={isEnabled} />

          <Button onPress={() => productFormRef.current.submitForm()} />
        </Form>
      </MainScroll>

      <ActionButton setCameraSide={setCameraSide} />
    </Container>
  )
}
