import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'

import { useAuth } from '../../contexts/auth'

import {
  Container,
  Scroll,
  Label,
  Content,
  SwitchView,
  SettingsView,
} from './styles'

export default function Setting() {
  const { signOut } = useAuth()
  const navigation = useNavigation()

  return (
    <Container>
      <Scroll>
        <Content>
          <Label>Configurações de ip</Label>
          <SettingsView>
            <Icon
              name='leak-add'
              color='darkred'
              size={35}
              onPress={() => {
                navigation.navigate('IpSetting')
              }}
            />
          </SettingsView>
        </Content>
        <Content>
          <Label>Tema</Label>
          <SettingsView>
            <SwitchView
              thumbColor='darkred'
              // onValueChange={toggleSwitch}
              // value={isEnabled}
            />
          </SettingsView>
        </Content>
        <Content>
          <Label>Logout</Label>
          <SettingsView>
            <Icon
              name='exit-to-app'
              color='darkred'
              size={35}
              onPress={() => signOut()}
            />
          </SettingsView>
        </Content>
      </Scroll>
    </Container>
  )
}
