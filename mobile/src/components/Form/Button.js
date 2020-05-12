import React from 'react'

import { Touchable, TouchableText } from './styles'

const Button = ({ title, ...rest }) => {
  return (
    <Touchable {...rest}>
      <TouchableText>{title ? title : 'Enviar'}</TouchableText>
    </Touchable>
  )
}

export default Button
