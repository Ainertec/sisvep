import 'react-native-gesture-handler';
import React, { Text } from 'react';
import { YellowBox } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

import dark from './src/themes/dark';
import light from './src/themes/light';
import usePersistedState from './src/utils/usePersistedState';

import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth';
import ToggleContext from './src/contexts/theme';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  // 'componentWillReceiveProps',
  // 'Possible Unhandled Promise',
]);
export default function App() {
  const [theme, setTheme] = usePersistedState('theme', dark);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };
  if (theme === null) {
    return <Text>Loadin....</Text>;
  }
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <ToggleContext.Provider value={{ toggleTheme }}>
            <Routes />
          </ToggleContext.Provider>
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
