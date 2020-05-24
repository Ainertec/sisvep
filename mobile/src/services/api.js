import axios from 'axios';
import { AsyncStorage } from 'react-native';

// async function api() {
//   const ipAdrress = await AsyncStorage.getItem('@RN:ip');
//   const apiConfig = axios.create({
//     baseURL: `http://${ipAdrress}:3333`,
//   })

//   return apiConfig;
// }

const api = axios.create();
AsyncStorage.getItem('@RN:ip').then((result) => {
  api.defaults.baseURL = `http://${result}:3333`;
});

export default api;
