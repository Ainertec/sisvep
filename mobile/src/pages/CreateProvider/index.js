/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useRef } from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { Form } from '@unform/mobile';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  ProviderForm,
  providerValidation,
} from '../../components/PrincipalForms';
import Alert from '../../components/Alert';

import sendError from '../../utils/sendError';

import { Button } from '../../components/Form';

import api from '../../services/api';

import { Container, MainScroll } from './styles';

const CreateProvider = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const formRef = useRef(null);
  const successAlertRef = useRef(null);
  const errorAlertRef = useRef(null);

  async function handleSubmit(data) {
    Keyboard.dismiss();
    try {
      formRef.current.setErrors({});

      await providerValidation(data);

      const productResponse = await api
        .post('products', product)
        .catch((error) => {
          if (!error.request.status) errorAlertRef.current.open();
        });
      if (productResponse.status === 200) {
        data.products = [productResponse.data._id];

        const providerResponse = await api
          .post('/providers', data)
          .catch((error) => {
            if (!error.request.status) errorAlertRef.current.open();
          });
        if (providerResponse.status === 200) {
          successAlertRef.current.open();
        }
      }
    } catch (err) {
      sendError(err, formRef);
    }
  }

  const handleClosed = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior='height'
        enable
        keyboardVerticalOffset={100}
      >
        <MainScroll>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <ProviderForm />

            <Button onPress={() => formRef.current.submitForm()} />
          </Form>
        </MainScroll>
      </KeyboardAvoidingView>
      <Alert
        ref={successAlertRef}
        success
        title='sucesso'
        subtitle='Produto e fornecedor cadastrados com sucesso'
        handleClosed={handleClosed}
      />
      <Alert
        ref={errorAlertRef}
        title='Ops...'
        subtitle='Não foi possivel se conectar'
      />
    </Container>
  );
};

export default CreateProvider;
