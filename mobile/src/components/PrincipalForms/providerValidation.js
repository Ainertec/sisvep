import * as Yup from 'yup'

const providerSchema = async (data) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório.'),
    description: Yup.string(),
    phone: Yup.number().required('O telefone obrigatório.'),
    email: Yup.string()
      .email('Digite um email valido')
      .required('O custo é obrigatório.'),
    identification: Yup.string().required('O estoque é obrigatório.'),
  })
  await schema.validate(data, {
    abortEarly: false,
  })
}
export default providerSchema
