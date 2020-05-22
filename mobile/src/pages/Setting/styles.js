import styled from 'styled-components/native'
import { ListItem } from 'react-native-elements'

export const Container = styled.View`
  flex: 1;
  background: #222;
  justify-content: center;
`
export const Content = styled.View`
  margin: 10px 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: rgba(250, 250, 250, 0.7);
`
export const SettingsView = styled.View`
  padding: 0 0 10px 0;
`
export const Scroll = styled.ScrollView`
  margin-top: 50px;
  /* margin-bottom: 10px; */
`
export const Label = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-bottom: 5px;
  /* text-align: center; */
`
export const UserName = styled.Text`
  color: #fff;
  font-size: 14px;
`

export const Item = styled(ListItem).attrs({
  containerStyle: {
    borderRadius: 10,
    backgroundColor: '#222',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(250, 250, 250, 0.70)',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  titleStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  rightTitleStyle: { color: '#fff' },
})``

export const SwitchView = styled.Switch.attrs({
  trackColor: { false: '#767577', true: '#ddd' },
})`
  margin-top: 10px;
`
