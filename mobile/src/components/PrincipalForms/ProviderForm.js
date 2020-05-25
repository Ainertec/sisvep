import React from 'react'

import { Input, Label } from '../Form'

const ProviderForm = () => {
  return (
    <>
      <Label>Nome:</Label>
      <Input
        name='name'
        iconName='group'
        placeholder='Digite o Nome do produto'
      />
      <Label>Descrição:</Label>
      <Input
        name='description'
        iconName='description'
        placeholder='Digite a Descrição'
        multiline
        numberOfLines={3}
        editable
      />
      <Label>Telefone:</Label>
      <Input
        name='phone'
        iconName='phone'
        placeholder='Digite o telefone'
        keyboardType='numeric'
      />
      <Label>Email:</Label>
      <Input
        name='email'
        iconName='email'
        placeholder='Digite o email'
      />
      <Label>CPF/CNPJ:</Label>
      <Input
        name='identification'
        iconName='assignment-ind'
        placeholder='Digite o CPF/CNPJ'
      />
    </>
  )
}

export default ProviderForm
