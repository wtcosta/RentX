import React from 'react';
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo'
import {
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter'

import { LogBox } from 'react-native'

import theme from './src/styles/theme';

import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Inter_400Regular,
    Inter_500Medium
  })

  if (!fontsLoaded) {
    return null;
  }

  LogBox.ignoreLogs([
    'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.'
  ])

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}