import React, { useRef, useEffect, useState } from 'react'
import { useField } from '@unform/core'

import DatePicker from 'react-native-datepicker'

const DatePickerT = ({ name, ...rest }) => {
  const datepickerRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  const [date, setDate] = useState(defaultValue)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.date',
      clearValue(ref) {},
    })
  }, [fieldName, registerField])

  return (
    <DatePicker
      ref={datepickerRef}
      style={{ width: '100%', backgroundColor: '#222' }}
      date={!date ? defaultValue : date}
      mode='date'
      placeholder='select date'
      format='YYYY-MM-DD:HH:MM:SS'
      confirmBtnText='Confirm'
      cancelBtnText='Cancel'
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 36,
          backgroundColor: '#fff',
        },
      }}
      onDateChange={(value) => setDate(value)}
      {...rest}
    />
  )
}

export default DatePickerT
