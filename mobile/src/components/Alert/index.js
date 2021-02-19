import React from 'react';

import {
  ModalC,
  Title,
  Subtitle,
  Header,
  Footer,
  Content,
  FooterText,
} from './styles';

const Alert = React.forwardRef(
  ({ title, handleClosed, subtitle, success, rest }, ref) => (
    <ModalC
      ref={ref}
      position='top'
      entry='top'
      coverScreen
      animationDuration={300}
      swipeToClose
      backButtonClose
      onClosed={handleClosed}
      {...rest}
    >
      <Header style={{ backgroundColor: success ? '#2ec4b6' : '#e71d36' }}>
        <Title>{title}</Title>
      </Header>
      <Content>
        <Subtitle>{subtitle}</Subtitle>
      </Content>

      <Footer onPress={() => ref.current.close()}>
        <FooterText>OK</FooterText>
      </Footer>
    </ModalC>
  )
);

export default Alert;
