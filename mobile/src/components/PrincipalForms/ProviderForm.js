import React from 'react'

import { Input, Label } from '../Form'

const ProviderForm = ({ isEnabled }) => {
  return (
    <>
      <Label>Nome:</Label>
      <Input
        disabled={!isEnabled}
        disabled={!isEnabled}
        name='name'
        iconName='group'
        placeholder='Digite o Nome do produto'
      />
      <Label>Descrição:</Label>
      <Input
        disabled={!isEnabled}
        name='description'
        iconName='description'
        placeholder='Digite a Descrição'
        multiline={true}
        numberOfLines={3}
        editable={true}
      />
      <Label>Telefone:</Label>
      <Input
        disabled={!isEnabled}
        name='phone'
        iconName='phone'
        placeholder='Digite o telefone'
        keyboardType='numeric'
      />
      <Label>Email:</Label>
      <Input
        disabled={!isEnabled}
        name='email'
        iconName='email'
        placeholder='Digite o email'
      />
      <Label>CPF/CNPJ:</Label>
      <Input
        disabled={!isEnabled}
        name='identification'
        iconName='assignment-ind'
        placeholder='Digite o CPF/CNPJ'
      />
    </>
  )
}

export default ProviderForm
