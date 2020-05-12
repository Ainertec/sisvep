import React from 'react'

import { Touchable, TouchableText } from './styles'

const Button = ({ ...rest }) => {
  return (
    <Touchable {...rest}>
      <TouchableText>Enviar</TouchableText>
    </Touchable>
  )
}

export default Button
