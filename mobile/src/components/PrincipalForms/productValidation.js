import * as Yup from 'yup'

const productSchema = async (data) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório.'),
    barcode: Yup.number()
      .required('O código de barra é obrigatório.')
      .positive('O código de barra precisa ser um número positivo.')
      .integer('O código de barra precisa ser um número inteiro.'),
    description: Yup.string(),
    price: Yup.number()
      .required('O preço é obrigatório.')
      .positive('O preço precisa ser um número positivo.'),
    cust: Yup.number()
      .required('O custo é obrigatório.')
      .positive('O custo precisa ser um número positivo.'),
    stock: Yup.number()
      .required('O estoque é obrigatório.')
      .positive('O estoque precisa ser um número positivo.')
      .integer('O estoque precisa ser um número inteiro.'),
    validity: Yup.date().required('A validade é obrigatória.'),
  })
  await schema.validate(data, {
    abortEarly: false,
  })
}
export default productSchema
