import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #222;
`;
export const Scroll = styled.ScrollView`
  flex: 1;
  margin-bottom: ${height * 0.09}px;
`;
