import React, { useState } from 'react';

import QrReader from '../../components/QrReader';
import ActionButton from '../../components/ActionButton';
import { Container, Content } from './styles';

export default function Sold() {
  const [cameraSide, setCameraSide] = useState(true);

  return (
    <Container>
      <Content>
        <QrReader style={{ height: 600 }} cameraSide={cameraSide} sendBarcode />
      </Content>

      <ActionButton setCameraSide={setCameraSide} />
    </Container>
  );
}
