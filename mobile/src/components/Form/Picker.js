/* eslint-disable no-underscore-dangle */
import React, { useRef, useEffect, useState } from 'react';
import { Alert } from 'react-native';
// import { Icon } from 'react-native-elements';

import { useField } from '@unform/core';

import api from '../../services/api';
import { PickerView, Picker, PickerTitle } from './styles';

const PickerUnform = ({ name, enabled, providerId, ...rest }) => {
  const pickerRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  const [providers, setProviders] = useState([]);
  const [selectedValue, setSelectedValue] = useState('epeita');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      path: 'props.selectedValue',
      clearValue() { },
    });
  }, [registerField, fieldName]);

  useEffect(() => {
    async function loadProvider() {
      const response = await api.get('/providers').catch((error) => {
        if (error.request.status === 0)
          Alert.alert(
            'Ops...',
            'Não foi possivel se conectar, verifique as configurações de ip'
          );
      });
      setProviders(response.data);
      if (providerId)
        response.data.forEach(provider => {
          if (provider._id === providerId) {
            setSelectedValue(provider._id)
          }
        })
    }

    loadProvider();
  }, []);

  const isEnabled = () => {
    if (enabled === undefined) return selectedValue;
    if (enabled) return selectedValue;
    return undefined;
  };

  return (
    <>
      <PickerTitle>Fornecedor:</PickerTitle>
      <PickerView>
        <Picker
          // mode='dropdown'
          ref={pickerRef}
          selectedValue={isEnabled()}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          enabled={enabled}
          {...rest}
        >
          {providers.map((provider) => (
            <Picker.Item
              key={provider._id}
              label={provider.name}
              value={provider._id}
            />
          ))}
        </Picker>
        {/* <Icon name='local-shipping' color='#fff' /> */}
      </PickerView>
    </>
  );
};

export default PickerUnform;
