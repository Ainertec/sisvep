import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

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
              thumbColor='darkred'
              // onValueChange={toggleSwitch}
              value
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
