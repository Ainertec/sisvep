import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Icon } from 'react-native-material-ui';

import { ActionButton } from './styles';

const ActionButtonT = ({ setCameraSide, ...rest }) => {
  const { colors } = useContext(ThemeContext);
  return (
    <ActionButton
      onPress={() => {
        setCameraSide((previousState) => !previousState);
      }}
      {...rest}
    >
      <Icon name='camera-front' size={28} color={colors.secundary} />
    </ActionButton>
  );
};

export default ActionButtonT;
