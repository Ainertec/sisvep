/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';

import { Form } from '@unform/mobile';

import QrReader from '../../components/QrReader';
import ActionButton from '../../components/ActionButton';

import {
  ProviderForm,
  ProductForm,
  productValidation,
  providerValidation,
} from '../../components/PrincipalForms';
import sendError from '../../utils/sendError';

import { Button, Picker } from '../../components/Form';

import api from '../../services/api';

import { Container, MainScroll, Title, SwitchView } from './styles';

export default function CreateProduct() {
  const [cameraSide, setCameraSide] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  const productFormRef = useRef(null);
  const providerFormRef = useRef(null);

  async function handleSubmitProvider(data) {
    try {
      providerFormRef.current.setErrors({});
      await providerValidation(data);
      await api.post('/providers', data).catch((error) => {
        if (!error.request.status)
          Alert.alert(
            'Ops...',
            'Não existe produto com esse código de barras'
          );
      });
    } catch (err) {
      sendError(err, providerFormRef);
    }
  }

  async function handleSubmit(data, { reset }) {
    try {
      productFormRef.current.setErrors({});
      await productValidation(data);
      const response = await api.post('/products', data);

      if (isEnabled) {
        const providerData = providerFormRef.current.getData();
        providerData.products = [response.data._id];
        handleSubmitProvider(providerData);
      }
      reset()
    } catch (err) {
      sendError(err, productFormRef);
    }
  }

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior='height'
        enable
        keyboardVerticalOffset={100}
      >
        <MainScroll>
          <Title>Atualizar/Visualizar Produto</Title>

          <QrReader cameraSide={cameraSide} formRef={productFormRef} />

          <Form
            initialData={{ validity: new Date() }}
            ref={productFormRef}
            onSubmit={handleSubmit}
          >
            <ProductForm />
            <Picker name='providerId' enabled={!isEnabled} />
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
      </KeyboardAvoidingView>

      <ActionButton setCameraSide={setCameraSide} />
    </Container>
  );
}
