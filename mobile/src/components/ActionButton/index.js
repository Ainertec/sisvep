import React from 'react'

import ActionButton from 'react-native-action-button'

import { Icon } from 'react-native-material-ui'

const ActionButtonT = ({ setCameraSide, ...rest }) => {
  return (
    <ActionButton
      buttonColor='#080705'
      renderIcon={() => <Icon name='camera-front' size={28} color='#fff' />}
      onPress={() => {
        setCameraSide((previousState) => !previousState)
      }}
      {...rest}
    />
  )
}

export default ActionButtonT
