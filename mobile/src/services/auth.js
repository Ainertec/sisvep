import { api } from './api'

export async function signIn(name, password) {
  const apiConnection = await api()
  const response = apiConnection
    .post('/sessions', {
      name,
      password,
    })
    .catch((error) => {
      return error.request
    })

  return response
}
