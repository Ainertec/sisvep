import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background: #222;
`
export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`
export const Scroll = styled.ScrollView`
  flex: 1;
  margin: 0 8px;
  padding-top: 10px;
`

export const DetailField = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  border-radius: 10px;
  margin: 10px 5px;
`
export const FiledTextView = styled.View`
  flex-direction: row;
  margin: 8px 14px;
  padding-left: 8px;
`
export const FieldTitle = styled.Text`
  color: #fff;
  text-transform: capitalize;
  font-size: 18px;
  margin: 0 10px;
`
export const FieldLabel = styled.Text`
  color: #fff;
  margin-bottom: 5px;
  font-size: 15px;
`
