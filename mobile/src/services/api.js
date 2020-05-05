import axios from 'axios'
import { AsyncStorage } from 'react-native';

export default async function api(){

  let api = axios.create({
    baseURL:`http://192.168.100.107:3333`,
  });

  return api;

}


