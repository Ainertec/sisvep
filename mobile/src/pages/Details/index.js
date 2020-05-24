import React from 'react'
import { Icon } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'

import {
  Container,
  Scroll,
  DetailField,
  FieldLabel,
  FieldTitle,
  FiledTextView,
} from './styles'

const Details = () => {
  const route = useRoute()
  const { product } = route.params

  return (
    <Container>
      <Scroll>
        <DetailField>
          <FieldLabel>Código de barra:</FieldLabel>
          <FiledTextView>
            <Icon name='local-offer' color='#fff' />
            <FieldTitle>{product.barcode}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Nome:</FieldLabel>
          <FiledTextView>
            <Icon name='shopping-cart' color='#fff' />
            <FieldTitle>{product.name}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Descrição:</FieldLabel>
          <FiledTextView>
            <Icon name='description' color='#fff' />
            <FieldTitle>{product.description}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Preço de venda (unidade):</FieldLabel>
          <FiledTextView>
            <Icon name='attach-money' color='#fff' />
            <FieldTitle>{product.price}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Preço de custo:</FieldLabel>
          <FiledTextView>
            <Icon name='attach-money' color='#fff' />
            <FieldTitle>{product.cost}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Estoque:</FieldLabel>
          <FiledTextView>
            <Icon name='storage' color='#fff' />
            <FieldTitle>{product.stock}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Validade:</FieldLabel>
          <FiledTextView>
            <Icon name='date-range' color='#fff' />
            <FieldTitle>{product.validity}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Fornecedor:</FieldLabel>
          <FiledTextView>
            <Icon name='local-shipping' color='#fff' />
            <FieldTitle>{[product.provider.name]}</FieldTitle>
          </FiledTextView>
        </DetailField>
      </Scroll>
    </Container>
  )
}

export default Details
