import styled from 'styled-components/native';
import Modal from 'react-native-modalbox';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const ModalC = styled(Modal)`
  background: #fdfffc;
  height: ${height * 0.19}px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;
`;
export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
  color: #011627;
`;
export const Subtitle = styled.Text`
  font-size: 17px;
  color: #011627;
`;
export const Header = styled.View`
  background: #e71d36;
  height: 40%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const Content = styled.View`
  width: 100%;
  height: 30%;
  justify-content: center;
  align-items: center;
`;
export const Footer = styled.TouchableOpacity`
  width: 100%;
  height: 30%;
  justify-content: center;
  align-items: center;
  border-top-color: #ccc;
  border-top-width: 0.7px;
`;
export const FooterText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #011627;
`;
