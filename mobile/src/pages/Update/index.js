/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import api from '../../services/api';
import sendError from '../../utils/sendError';
import {
  ProductForm,
  productValidation,
} from '../../components/PrincipalForms';
import { Button, Picker } from '../../components/Form';

import { Container, MainScroll } from './styles';

export default function Update() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      formRef.current.setErrors({});
      await productValidation(data);

      reset();
      await api
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
          if (!error.request.status)
            Alert.alert(
              'Ops...',
              'Não existe produto com esse código de barras'
            );
        });

      navigation.goBack();

    } catch (err) {
      sendError(err, formRef);
    }
  }
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
          <Form
            initialData={{ validity: new Date() }}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <ProductForm />
            <Picker name='providerId' providerId={product.provider._id} />

            <Button
              style={{ marginTop: 40 }}
              onPress={() => formRef.current.submitForm()}
            />
          </Form>
        </MainScroll>
      </KeyboardAvoidingView>
    </Container>
  );
}
