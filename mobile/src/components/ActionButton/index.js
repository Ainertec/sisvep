import React from 'react'
import { Icon } from 'react-native-material-ui'

import { ActionButton } from './styles'

const ActionButtonT = ({ setCameraSide, ...rest }) => {
  return (
    <ActionButton
      onPress={() => {
        setCameraSide((previousState) => !previousState)
      }}
      {...rest}
    >
      <Icon name='camera-front' size={28} color='#fff' />
    </ActionButton>
  )
}

export default ActionButtonT
