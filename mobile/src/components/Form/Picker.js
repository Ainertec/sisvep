/* eslint-disable no-underscore-dangle */
import React, { useRef, useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'

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

  const isEnabled = () => {
    if (enabled === undefined) return selectedValue
    if (enabled) return selectedValue
    return undefined
  }

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
  )
}

export default PickerUnform
