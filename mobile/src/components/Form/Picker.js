/* eslint-disable no-underscore-dangle */
import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Picker } from 'react-native'

import { useField } from '@unform/core'

// import { Container } from './styles';

const PickerUnform = ({ name, providers, enabled, ...rest }) => {
  const pickerRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  const [selectedValue, setSelectedValue] = useState(providers[0]._id)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      path: 'props.selectedValue',
      clearValue() {},
    })
    console.log(pickerRef.current.props.enabled)
  }, [registerField, fieldName, pickerRef])

  return (
    <View style={{ backgroundColor: '#333', marginTop: 35 }}>
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: 20,
          marginTop: 10,
        }}
      >
        Lista de Fornecedores:{' '}
      </Text>
      <Picker
        ref={pickerRef}
        selectedValue={enabled ? selectedValue : undefined}
        style={{ backgroundColor: '#555', color: '#fff', marginTop: 20 }}
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
    </View>
  )
}

export default PickerUnform
