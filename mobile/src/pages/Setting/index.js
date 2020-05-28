import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { ThemeContext } from 'styled-components';
import ToggleContext from '../../contexts/theme';

import { useAuth } from '../../contexts/auth';

import {
  Container,
  Scroll,
  Label,
  Content,
  SwitchView,
  SettingsView,
  UserName,
} from './styles';

export default function Setting() {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();
  const { colors, title } = useContext(ThemeContext);
  const { toggleTheme } = useContext(ToggleContext);

  return (
    <Container>
      <Scroll>
        <Content>
          <SettingsView>
            <Icon
              name='leak-add'
              color='darkred'
              size={35}
              onPress={() => {
                navigation.navigate('IpSetting');
              }}
            />
          </SettingsView>
          <Label>Configurar ip</Label>
        </Content>
        <Content>
          <SettingsView>
            <SwitchView
              onValueChange={toggleTheme}
              thumbColor={colors.primary}
              // trackColor={{ false: '#767577', true: '#81b0ff' }}
              // thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
              value={title === 'dark'}
            />
          </SettingsView>
          <Label>Trocar tema</Label>
        </Content>
        <Content>
          <SettingsView>
            <Icon
              name='exit-to-app'
              color='darkred'
              size={35}
              onPress={() => signOut()}
            />
          </SettingsView>

          <Label>Sair, logado com {user.name} </Label>
          {/* <UserName>Usuário logado: {user.name}</UserName> */}
        </Content>
      </Scroll>
    </Container>
  );
}
