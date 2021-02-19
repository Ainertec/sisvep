/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import api from '../../services/api';
import sendError from '../../utils/sendError';
import {
  ProductForm,
  productValidation,
} from '../../components/PrincipalForms';
import { Button, Picker } from '../../components/Form';
import Alert from '../../components/Alert';

import { Container, MainScroll } from './styles';

export default function Update() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const formRef = useRef(null);
  const successAlertRef = useRef(null);
  const errorAlertRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      formRef.current.setErrors({});
      await productValidation(data);

      reset();
      const response = await api
        .put(
          `products`,
          {
            ...data,
            providerId: undefined,
          },
          {
            params: {
              id: product._id,
              providerId: data.providerId,
            },
          }
        )
        .catch((error) => {
          if (!error.request.status) errorAlertRef.current.open();
        });
      if (response.status === 200) {
        successAlertRef.current.open();
      }
    } catch (err) {
      sendError(err, formRef);
    }
  }

  const handleClosed = () => {
    navigation.goBack();
  };

  useEffect(() => {
    formRef.current.setData({
      ...product,
      price: [product.price].toString(),
      cost: [product.cost].toString(),
      stock: [product.stock].toString(),
      barcode: [product.barcode].toString(),
      validity: [product.validity].toString(),
    });
  });

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
            <ProductForm />
            <Picker name='providerId' providerId={product.provider._id} />

            <Button
              style={{ marginTop: 40 }}
              onPress={() => formRef.current.submitForm()}
            />
          </Form>
        </MainScroll>
      </KeyboardAvoidingView>
      <Alert
        ref={successAlertRef}
        success
        title='sucesso'
        subtitle='Produto cadastrado com sucesso'
        handleClosed={handleClosed}
      />
      <Alert
        ref={errorAlertRef}
        title='Ops...'
        subtitle='Não foi possivel se conectar'
      />
    </Container>
  );
}
