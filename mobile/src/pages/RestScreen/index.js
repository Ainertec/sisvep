import React from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { Icon } from 'react-native-material-ui'
import { Tooltip } from 'react-native-elements'

import { Container, Image, Content } from './styles'
import image from '../../../assets/splash.png'

export default function RestScreen({ navigation }) {
  return (
    <Container>
      <Image source={image} PlaceholderContent={<ActivityIndicator />}>
        <Content>
          <Tooltip
            popover={<Text>Puxe para a direita para abrir o menu!</Text>}
          >
            <Icon name='last-page' size={20} color='#fff' />
          </Tooltip>
        </Content>
      </Image>
    </Container>
  )
}
