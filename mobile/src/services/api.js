import axios from 'axios'
import { AsyncStorage } from 'react-native'

export async function api() {
  const ipAdrress = await AsyncStorage.getItem('@Rn:ip')
  const apiConfig = axios.create({
    baseURL: `http://${ipAdrress}:3333`,
  })
  return apiConfig
}
