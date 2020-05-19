import styled from 'styled-components/native'
import { Input } from 'react-native-elements'
import { Searchbar } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Dimensions } from 'react-native'

const deviceHeight = Dimensions.get('window').height

export const Label = styled.Text`
  color: #fff;

  margin-top: 35px;
`

export const TextInput = styled(Input).attrs({
  containerStyle: { backgroundColor: '#222' },
  inputStyle: { color: '#fff' },
})``
export const Touchable = styled.TouchableOpacity`
  margin-top: 10px;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background: darkred;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`
export const TouchableText = styled.Text`
  color: #fff;
  font-weight: bold;
`
export const DatePickerCustom = styled(DateTimePicker)`
  background: #222;
  width: 100%;
`

export const PickerView = styled.View`
  background: #222;
  /* flex-direction: row; */
  /* align-items: center; */
  border-bottom-width: 1px;
  border-bottom-color: rgba(250, 250, 250, 0.7);
  margin: 0 9px;
  margin-top: 10px;
  height: 42px;
  justify-content: space-between;
`
export const Picker = styled.Picker`
  color: #fff;
  margin-left: 8px;
`
export const PickerTitle = styled.Text`
  color: #fff;
  font-size: 14px;
`
export const Search = styled(Searchbar)`
  border-radius: 25px;
  z-index: 2;
  margin: ${deviceHeight * 0.02}px 10px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
`
