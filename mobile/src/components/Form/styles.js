import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Label = styled.Text`
  color: #fff;
  margin-top: ${height * 0.05}px;
`;

export const TextInput = styled(Input).attrs({
  containerStyle: { backgroundColor: '#222' },
  inputStyle: { color: '#fff' },
})``;
export const Touchable = styled.TouchableOpacity`
  margin-top: ${height * 0.01}px;
  width: 100%;
  height: ${height * 0.05}px;
  border-radius: 20px;
  background: darkred;
  align-items: center;
  justify-content: center;
  margin-bottom: ${height * 0.024}px;
`;
export const TouchableText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
export const DatePickerCustom = styled(DateTimePicker)`
  background: #222;
  width: 100%;
`;

export const PickerView = styled.View`
  background: #222;
  border-bottom-width: 1px;
  border-bottom-color: rgba(250, 250, 250, 0.7);
  margin: 0 ${width * 0.02}px;
  margin-top: 10px;
  height: ${height * 0.057}px;
  justify-content: space-between;
`;
export const Picker = styled.Picker`
  color: #fff;
  margin-left: ${width * 0.02}px;
`;
export const PickerTitle = styled.Text`
  color: #fff;
  font-size: 14px;
`;
export const Search = styled(Searchbar)`
  border-radius: ${width * 0.06}px;
  z-index: 2;
  margin: ${height * 0.02}px ${height * 0.01}px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
`;
