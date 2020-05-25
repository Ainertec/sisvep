import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { Form } from '@unform/core';
import * as Yup from 'yup';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { Input, Label, Button } from '../../components/Form';
import Alert from '../../components/Alert';

import logo from '../../assets/logo.png';
import { useAuth } from '../../contexts/auth';

import { Container, Content, Logo, Title, ConfigIcon } from './styles';

const Login = () => {
  const formRef = useRef(null);
  const errorRef = useRef(null);
  const disconectRef = useRef(null);

  const { signIn } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    try {
      Keyboard.dismiss();
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório.'),
        password: Yup.string().required('A senha é obrigatória.'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      const status = await signIn(data);

      if (status === 200) return;

      if (status === 404) {
        disconectRef.current.open();
      }

      if (status === 401) {
        errorRef.current.open();
      }
      setLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        formRef.current.setErrors(errorMessages);
      }
    }
  }
  return (
    <Container>
      <Content>
        <ConfigIcon>
          <Icon
            name='more-vert'
            size={30}
            color='#fff'
            onPress={() => navigation.navigate('IpSetting')}
          />
        </ConfigIcon>

        <KeyboardAvoidingView behavior='position' enable>
          <Logo source={logo} />
          <Title>Faça login</Title>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Label>Nome:</Label>
            <Input name='name' placeholder='Digite o nome' iconName='person' />
            <Label>Senha:</Label>
            <Input
              name='password'
              placeholder='Digite a senha'
              iconName='lock'
              secureTextEntry
            />

            <Button
              title='Entrar'
              onPress={() => formRef.current.submitForm()}
            />
          </Form>
        </KeyboardAvoidingView>
        <Alert
          ref={errorRef}
          title='Ops...'
          subtitle='Usuário ou senha incorretos'
        />
        <Alert
          ref={disconectRef}
          title='Ops...'
          subtitle='Não foi possivel se conectar'
        />

        {loading && <ActivityIndicator size='large' color='#eee' />}
      </Content>
    </Container>
  );
};

export default Login;
