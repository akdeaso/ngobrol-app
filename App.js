import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Root from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}
