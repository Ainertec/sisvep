import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

function usePersistedState({ key, initialState }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function saveTheme() {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    }
    saveTheme();
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
