import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
  justify-content: center;
`;
export const Content = styled.View`
  margin: ${height * 0.014}px ${width * 0.012}px;
  border-radius: ${width * 0.02}px;
  padding-left: ${width * 0.06}px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: rgba(250, 250, 250, 0.7);
`;
export const SettingsView = styled.View`
  padding: ${height * 0.018}px 0 ${width * 0.02}px 0;
`;
export const Scroll = styled.ScrollView`
  margin-top: ${height * 0.02}px;
`;
export const Label = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 20px;
  padding-left: ${width * 0.025}px;
`;
export const UserName = styled.Text`
  color: #fff;
  font-size: 16px;
  padding-left: ${width * 0.025}px;
  align-self: center;
`;

export const SwitchView = styled.Switch.attrs({
  trackColor: { false: '#767577', true: '#ddd' },
})`
  margin-top: ${height * 0.01}px;
  width: ${width * 0.09}px;
`;
