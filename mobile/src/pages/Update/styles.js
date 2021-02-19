import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;
export const MainScroll = styled.ScrollView`
  flex: 1;
  padding: 0 ${width * 0.02}px;
`;
export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-top: ${height * 0.03}px;
  text-align: center;
`;
