import React from 'react'

import { Input, Label, Button, DatePicker } from '../Form'

const ProductForm = () => {
  return (
    <>
      <Label>Código de barra:</Label>
      <Input
        name='barcode'
        iconName='local-offer'
        placeholder='Digite o código de barras'
        keyboardType='numeric'
      />
      <Label>Nome:</Label>
      <Input
        name='name'
        iconName='shopping-cart'
        placeholder='Digite o Nome do produto'
      />
      <Label>Descrição:</Label>
      <Input
        name='description'
        iconName='description'
        placeholder='Digite a Descrição'
        multiline={true}
        numberOfLines={3}
        editable={true}
      />
      <Label>Preço de venda (unidade):</Label>
      <Input
        name='price'
        iconName='attach-money'
        placeholder='Digite o Preço'
        keyboardType='numeric'
      />
      <Label>Preço de custo:</Label>
      <Input
        name='cust'
        iconName='attach-money'
        placeholder='Digite o Custo'
        keyboardType='numeric'
      />
      <Label>Estoque:</Label>
      <Input
        name='stock'
        iconName='storage'
        placeholder='Digite o Estoque'
        keyboardType='numeric'
      />
      <Label>Validade:</Label>
      <DatePicker name='validity' />
    </>
  )
}

export default ProductForm
