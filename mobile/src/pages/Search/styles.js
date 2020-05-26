import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Form } from '@unform/mobile';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #222;
`;
export const List = styled(Animated.FlatList)`
  padding-top: ${height * 0.09}px;
`;
export const ListFooter = styled.View`
  padding-bottom: ${height * 0.09}px;
`;
export const Item = styled(ListItem).attrs({
  containerStyle: {
    borderRadius: width * 0.02,
    backgroundColor: '#222',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(250, 250, 250, 0.70)',
    marginHorizontal: width * 0.02,
    marginBottom: width * 0.02,
  },
  titleStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  rightTitleStyle: { color: '#fff' },
})``;
export const FormContent = styled(Form)`
  flex: 1;
  background: red;
`;
