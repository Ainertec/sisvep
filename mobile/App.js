import { YellowBox } from 'react-native'
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'componentWillReceiveProps',
  'Possible Unhandled Promise',
])
export default function App() {
  return Routes
}

