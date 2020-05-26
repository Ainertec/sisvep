import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #222;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  margin: 0 ${width * 0.02}px;
  padding: ${height * 0.02}px 0;
`;
export const DetailField = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  border-radius: ${width * 0.01}px;
  margin: ${height * 0.015}px ${width * 0.01}px;
`;
export const FiledTextView = styled.View`
  flex-direction: row;
  margin: ${height * 0.01}px ${width * 0.015}px;
  padding-left: 8px;
`;
export const FieldTitle = styled.Text`
  color: #fff;
  text-transform: capitalize;
  font-size: 18px;
  margin: 0 ${width * 0.013}px;
`;
export const FieldLabel = styled.Text`
  color: #fff;
  margin-bottom: ${height * 0.009}px;
  font-size: 15px;
`;
