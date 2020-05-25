/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { Form } from '@unform/mobile';

import QrReader from '../../components/QrReader';
import ActionButton from '../../components/ActionButton';

import {
  ProductForm,
  productValidation,

} from '../../components/PrincipalForms';
import sendError from '../../utils/sendError';

import { Button, Picker } from '../../components/Form';

import api from '../../services/api';

import { Container, MainScroll, Title } from './styles';

export default function CreateProduct() {
  const [cameraSide, setCameraSide] = useState(true);
  const navigation = useNavigation();

  const formRef = useRef(null);

  async function handleCreateProvider() {
    Keyboard.dismiss()
    const product = formRef.current.getData();
    try {
      formRef.current.setErrors({});
      await productValidation(product);
      product.providerId = undefined

      navigation.navigate('CreateProvider', { product })

    } catch (err) {
      sendError(err, formRef);
    }

  }

  async function handleSubmit(data, { reset }) {
    try {
      Keyboard.dismiss()
      formRef.current.setErrors({});
      await productValidation(data);
      await api.post('/products', data);
      reset()
      alert('opa foi');

    } catch (err) {
      sendError(err, formRef);
    }
  }


  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior='height'
        enable
        keyboardVerticalOffset={100}
      >
        <MainScroll>
          <Title>Cadastrar Produto</Title>

          <QrReader cameraSide={cameraSide} formRef={formRef} />

          <Form

            ref={formRef}
            onSubmit={handleSubmit}
          >
            <ProductForm />
            <Picker name='providerId' />

            <Button title='Cadastrar novo fornecedor' onPress={() => handleCreateProvider()} />

            <Button onPress={() => formRef.current.submitForm()} />
          </Form>

        </MainScroll>
      </KeyboardAvoidingView>

      <ActionButton setCameraSide={setCameraSide} />
    </Container>
  );
}
