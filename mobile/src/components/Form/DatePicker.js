import React, { useRef, useEffect, useState } from 'react'
import { useField } from '@unform/core'
import DateTimePicker from '@react-native-community/datetimepicker'

import { Input } from 'react-native-elements'
import { Icon } from 'react-native-material-ui'
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
    inputRef.current.value = String(date)
  }, [date])

  return (
    <>
      <Input
        ref={inputRef}
        value={String(date)}
        defaultValue={defaultValue}
        disabled={true}
        inputStyle={{ color: '#fff' }}
        containerStyle={{ backgroundColor: '#222' }}
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
      <Button title='Selcionar data' onPress={showDatePicker} />
      {show && (
        <DateTimePicker
          style={{ width: '100%', backgroundColor: '#222' }}
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
