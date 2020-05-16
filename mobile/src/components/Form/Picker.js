/* eslint-disable no-underscore-dangle */
import React, { useRef, useEffect, useState } from 'react'

import { useField } from '@unform/core'

import { PickerView, Picker, PickerTitle } from './styles'

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
  }, [registerField, fieldName, pickerRef])

  return (
    <PickerView>
      <PickerTitle>Lista de Fornecedores</PickerTitle>
      <Picker
        ref={pickerRef}
        selectedValue={enabled ? selectedValue : undefined}
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
    </PickerView>
  )
}

export default PickerUnform
