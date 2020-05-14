import React from 'react'

import ActionButton from 'react-native-action-button'

import { Icon } from 'react-native-material-ui'

// import { Container } from './styles';

const ActionButtonT = ({ setCameraSide, ...rest }) => {
  return (
    <ActionButton
      buttonColor='#2d080a'
      renderIcon={() => <Icon name='camera-front' size={28} color='#fff' />}
      onPress={() => {
        setCameraSide((previousState) => !previousState)
      }}
      {...rest}
    />
  )
}

export default ActionButtonT
