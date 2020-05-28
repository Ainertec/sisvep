import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
  padding: 0 ${width * 0.02}px;
`;
export const Content = styled.View`
  justify-content: center;
  align-items: center;
  /* flex: 1;
  margin-top: ${height * 0.16}px;
  margin-bottom: ${height * 0.16}px; */
`;
export const Logo = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: ${height * 0.4}px;
  width: ${height * 0.4}px;
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 26px;
  line-height: 30px;
  padding-left: ${width * 0.01}px;
  color: ${(props) => props.theme.colors.text};
`;
