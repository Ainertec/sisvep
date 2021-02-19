import api from './api';

export async function signIn(name, password) {
  // const apiConnection = await api();
  const response = api
    .post('/sessions', {
      name,
      password,
    })
    .catch((error) => {
      return error.request;
    });

  return response;
}
