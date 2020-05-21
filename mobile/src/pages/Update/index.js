import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Form } from '@unform/mobile'

import sendError from '../../utils/sendError'
import { ProductForm, productValidation } from '../../components/PrincipalForms'
import { Button, Picker } from '../../components/Form'

import { Container, MainScroll } from './styles'

export default function Update() {
  const [providers, setProviders] = useState([
    { name: 'Julio', _id: 123 },
    { name: 'Jão', _id: 789 },
  ])
  const navigation = useNavigation()
  const route = useRoute()
  const { product } = route.params

  const formRef = useRef(null)

  async function handleSubmit(data, { reset }) {
    try {
      formRef.current.setErrors({})
      await productValidation(data)
      console.log(data)
      reset()
      navigation.goBack()
    } catch (err) {
      sendError(err, formRef)
    }
  }
  useEffect(() => {
    formRef.current.setData(product)
  })

  return (
    <Container>
      <MainScroll>
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
