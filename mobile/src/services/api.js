import axios from 'axios'

export async function api() {
  const apiConfig = axios.create({
    baseURL: `http://192.168.100.107:3333`,
  })

  return apiConfig
}
