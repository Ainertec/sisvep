import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background: #222;
  /* background: #000; */
`
export const Content = styled.View`
  /* background: #000; */
  height: 100%;
  width: 20px;
  justify-content: center;
  position: absolute;
`
export const MainScroll = styled.ScrollView`
  flex: 1;

  padding: 0 8px;
`
export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`
export const SwitchView = styled.Switch.attrs({
  trackColor: { false: '#767577', true: '#ddd' },
})`
  align-self: center;
  margin-top: 10px;
`
