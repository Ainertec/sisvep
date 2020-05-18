/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from 'react'

import { useField } from '@unform/core'

import { Search } from './styles'

const SearchBar = ({ name, ...rest }) => {
  const searchRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    searchRef.current.value = defaultValue
  }, [defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: searchRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = ''
        ref.clear()
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value })
        searchRef.current.value = value
      },
      getValue(ref) {
        return ref.value
      },
    })
  }, [fieldName, registerField])
  return (
    <Search
      ref={searchRef}
      onChangeText={(value) => {
        if (searchRef.current) {
          searchRef.current.value = value
        }
      }}
      placeholder='Pesquise o produto'
      {...rest}
    />
  )
}

export default SearchBar
