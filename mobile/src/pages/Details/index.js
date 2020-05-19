import React, { useEffect, useState } from 'react'
// import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'

import {
  Container,
  Title,
  Scroll,
  DetailField,
  FieldLabel,
  FieldTitle,
  FiledTextView,
} from './styles'

const Details = () => {
  const [providerDetails, setProviderDetails] = useState({})
  const route = useRoute()
  useEffect(() => {
    const { product } = route.params
    setProviderDetails(product)
  }, [])
  return (
    <Container>
      {/* <Title>Detalhes</Title> */}
      <Scroll>
        <DetailField>
          <FieldLabel>Código de barra:</FieldLabel>
          <FiledTextView>
            <Icon name='local-offer' color='#fff' />
            <FieldTitle>{providerDetails.barcode}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Nome:</FieldLabel>
          <FiledTextView>
            <Icon name='shopping-cart' color='#fff' />
            <FieldTitle>{providerDetails.name}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Descrição:</FieldLabel>
          <FiledTextView>
            <Icon name='description' color='#fff' />
            <FieldTitle>{providerDetails.description}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Preço de venda (unidade):</FieldLabel>
          <FiledTextView>
            <Icon name='attach-money' color='#fff' />
            <FieldTitle>{providerDetails.price}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Preço de custo:</FieldLabel>
          <FiledTextView>
            <Icon name='attach-money' color='#fff' />
            <FieldTitle>{providerDetails.cust}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Estoque:</FieldLabel>
          <FiledTextView>
            <Icon name='storage' color='#fff' />
            <FieldTitle>{providerDetails.stock}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Validade:</FieldLabel>
          <FiledTextView>
            <Icon name='date-range' color='#fff' />
            <FieldTitle>{providerDetails.validity}</FieldTitle>
          </FiledTextView>
        </DetailField>
        <DetailField>
          <FieldLabel>Fornecedor:</FieldLabel>
          <FiledTextView>
            <Icon name='local-shipping' color='#fff' />
            <FieldTitle>{providerDetails.provider}</FieldTitle>
          </FiledTextView>
        </DetailField>
      </Scroll>
    </Container>
  )
}

export default Details
