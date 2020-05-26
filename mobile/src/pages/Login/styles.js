import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #222;
  padding: 0 ${width * 0.02}px;
`;
export const Logo = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  height: ${height * 0.14}px;
  margin-top: ${height * 0.16}px;
  margin-bottom: ${height * 0.16}px;
  justify-content: center;
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 26px;
  line-height: 30px;
  padding-left: ${width * 0.01}px;
  color: #fff;
`;
