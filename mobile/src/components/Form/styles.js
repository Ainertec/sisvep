import styled from 'styled-components/native'
import { Input } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Dimensions } from 'react-native'

export const Label = styled.Text`
  color: #fff;

  margin-top: 35px;
`

export const TextInput = styled(Input).attrs({
  containerStyle: { backgroundColor: '#222' },
  inputStyle: { color: '#fff' },
})``
export const Touchable = styled.TouchableOpacity`
  flex: 1;
  align-self: center;
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
  background: darkred;
  border-radius: 20px;
  margin-top: 10px;
  height: 42px;
  justify-content: center;
`
export const Picker = styled.Picker`
  color: #fff;
`
export const PickerTitle = styled.Text`
  color: #fff;
  font-size: 14px;
`
