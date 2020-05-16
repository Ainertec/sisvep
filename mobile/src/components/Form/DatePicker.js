import React, { useRef, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useField } from '@unform/core'
import formatISO from 'date-fns/formatISO'

import { Icon } from 'react-native-material-ui'
import { TextInput, DatePickerCustom } from './styles'
import Button from './Button'

const DatePickerT = ({ name, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name)
  const inputRef = useRef(null)
  const [date, setDate] = useState(defaultValue)
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const showDatePicker = () => {
    setShow(true)
  }

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
  useEffect(() => {
    inputRef.current.value = formatISO(date)
  }, [date])

  return (
    <>
      <TextInput
        ref={inputRef}
        value={formatISO(date)}
        defaultValue={formatISO(defaultValue)}
        disabled
        leftIcon={
          <Icon
            name='date-range'
            size={24}
            color='#fff'
            style={{ marginRight: 20 }}
          />
        }
        {...rest}
      />
      <Button title='Selcionar validade' onPress={showDatePicker} />
      {show && (
        <DatePickerCustom
          value={date}
          mode='date'
          onChange={onChange}
          {...rest}
        />
      )}
    </>
  )
}

export default DatePickerT
