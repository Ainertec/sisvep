/* eslint-disable no-underscore-dangle */
import React, { useRef, useState } from 'react'
import { Animated, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'

import api from '../../services/api'
import { SearchBar } from '../../components/Form'

import { Container, Item, List, FormContent, ListFooter } from './styles'

const deviceHeight = Dimensions.get('window').height

export default function Search() {
  const formRef = useRef(null)
  const navigation = useNavigation()
  const [products, setProducts] = useState([])

  async function handleSubmit(data) {
    if (data.name === '')
      setProducts([])
    else {
      const response = await api.get('products', {
        params: data
      })
      setProducts(response.data)

    }

  }
  // useFocusEffect(
  //   useCallback(() => { setProducts([]); formRef.current.reset({}) }, [])

  // )

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
            leftIcon={<Icon name='shopping-cart' color='darkred' size={30} />}
            onPress={() => navigation.navigate('Details', { product: item })}
            chevron
            rightTitle={`R$ ${item.price}`}

          />
        )}
      />
    </Container>
  )
}

