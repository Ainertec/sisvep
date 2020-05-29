import React, { useState } from 'react';
import { Dimensions } from 'react-native';

import QrReader from '../../components/QrReader';
import ActionButton from '../../components/ActionButton';
import { Container, Content } from './styles';

const { height } = Dimensions.get('window');
export default function Sold() {
  const [cameraSide, setCameraSide] = useState(true);

  return (
    <Container>
      <Content>
        <QrReader
          style={{ height: height * 0.84 }}
          cameraSide={cameraSide}
          sendBarcode
        />
      </Content>

      <ActionButton setCameraSide={setCameraSide} />
    </Container>
  );
}
