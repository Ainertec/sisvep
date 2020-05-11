import React, { useRef, useEffect } from 'react'
import { useField } from '@unform/core'
import { Input as ElementsInput } from 'react-native-elements'

// import { Container } from './styles';

const Input = ({ name, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    inputRef.current.value = defaultValue
  }, [defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = ''
        ref.clear()
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value })
        inputRef.current.value = value
      },
      getValue(ref) {
        return ref.value
      },
    })
  }, [fieldName, registerField])
  return (
    <ElementsInput
      ref={inputRef}
      defaultValue={defaultValue}
      onChangeText={(value) => {
        if (inputRef.current) {
          inputRef.current.value = value
        }
      }}
      inputStyle={{ color: '#fff' }}
      containerStyle={{ backgroundColor: '#222' }}
      {...rest}
    />
  )
}

export default Input
