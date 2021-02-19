import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Form } from '@unform/mobile';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;
export const List = styled(Animated.FlatList)`
  padding-top: ${height * 0.1}px;
`;
export const ListFooter = styled.View`
  padding-bottom: ${height * 0.09}px;
`;
export const Item = styled(ListItem).attrs((props) => ({
  containerStyle: {
    borderRadius: width * 0.02,
    backgroundColor: props.theme.colors.background,
    borderBottomWidth: 1.5,
    borderBottomColor: props.theme.colors.border,
    marginHorizontal: width * 0.02,
    marginBottom: width * 0.02,
  },
  titleStyle: {
    color: props.theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  rightTitleStyle: { color: props.theme.colors.text },
}))``;
export const FormContent = styled(Form)`
  flex: 1;
  /* background: red; */
`;
