import React from 'react'
import { View } from 'react-native'

import { Label as Labeltext } from './styles'

const Label = ({ ...rest }) => {
  return <Labeltext {...rest} />
}

export default Label
