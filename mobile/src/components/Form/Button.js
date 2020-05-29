import React from 'react';

import { Touchable, TouchableText } from './styles';

const Button = ({ title, outline, ...rest }) => {
  return (
    <Touchable outline={outline} {...rest}>
      <TouchableText>{title || 'Enviar'}</TouchableText>
    </Touchable>
  );
};

export default Button;
