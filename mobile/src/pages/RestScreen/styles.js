import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background: #222;
`
export const Image = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  flex: 1;

  justify-content: center;
`
export const Content = styled.View`
  background: #202026;
  height: 100%;
  width: 20px;
  justify-content: center;
`
