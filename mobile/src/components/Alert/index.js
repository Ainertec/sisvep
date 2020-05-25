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

const Alert = React.forwardRef(({ title, subtitle, success, rest }, ref) => (
  <ModalC
    ref={ref}
    position='top'
    entry='top'
    animationDuration={200}
    swipeToClose
    backButtonClose
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
));

export default Alert;
