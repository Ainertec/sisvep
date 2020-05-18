/* eslint-disable no-underscore-dangle */
import React, { useRef, useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'

import { SearchBar } from '../../components/Form'

import { Container, Item, List, FormContent, ListFooter } from './styles'

const deviceHeight = Dimensions.get('window').height

export default function Search() {
  const formRef = useRef(null)

  useEffect(() => {
    // const staticProviders = setProviders(staticProviders)
  }, [])

  async function handleSubmit(data) {
    console.log(data)
  }

  const SEARCH_TRANSLATE = deviceHeight * 0.2
  const scrollFlatlist = new Animated.Value(0)

  const ScrollDiff = scrollFlatlist.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  })
  const clampScroll = Animated.diffClamp(ScrollDiff, 0, SEARCH_TRANSLATE)
  const heightSearch = clampScroll.interpolate({
    inputRange: [0, SEARCH_TRANSLATE],
    outputRange: [0, -SEARCH_TRANSLATE],
    extrapolate: 'clamp',
  })

  return (
    <Container>
      <FormContent ref={formRef} onSubmit={handleSubmit}>
        <SearchBar
          style={{
            transform: [{ translateY: heightSearch }],
          }}
          name='name'
          onSubmitEditing={() => formRef.current.submitForm()}
        />
      </FormContent>

      <List
        ListFooterComponent={<ListFooter />}
        data={products}
        keyExtractor={(key) => String(key._id)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollFlatlist } },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Item
            title={item.name}
            leftIcon={<Icon name='local-offer' color='#fff' />}
            rightIcon={<Icon name='more' color='#fff' />}
            // bottomDivider
            chevron
            subtitle='R$ 20,00'
          />
        )}
      />
    </Container>
  )
}

const products = [
  {
    _id: 1,
    name: 'pão',
  },
  {
    _id: 2,
    name: 'Quijo',
  },
  {
    _id: 3,
    name: 'Presunto',
  },
  {
    _id: 4,
    name: 'Tomate',
  },
  {
    _id: 5,
    name: 'pão',
  },
  {
    _id: 6,
    name: 'Quijo',
  },
  {
    _id: 7,
    name: 'Presunto',
  },
  {
    _id: 8,
    name: 'Tomate',
  },
  {
    _id: 9,
    name: 'pão',
  },
  {
    _id: 10,
    name: 'Quijo',
  },
  {
    _id: 11,
    name: 'Presunto',
  },
  {
    _id: 12,
    name: 'Tomate',
  },
  {
    _id: 13,
    name: 'pão',
  },
  {
    _id: 14,
    name: 'Quijo',
  },
  {
    _id: 15,
    name: 'Presunto',
  },
  {
    _id: 16,
    name: 'Tomate',
  },
]
