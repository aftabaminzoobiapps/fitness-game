/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Screens from "./src/screens";
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, isReadyRef  } from './RootNavigation';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-native-styled-toast';
import { scale } from 'react-native-size-matters';
const theme= {
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  fontFamily: "Yekan",
  colors: {
    text: '#0A0A0A',
    background: '#FFF',
    border: '#E2E8F0',
    muted: '#F0F1F3',
    success: '#7DBE31',
    error: '#FC0021',
    info: '#00FFFF'
  }
}
import {store} from './src/store/configureStore';
const persistor = persistStore(store);

import {openDatabase} from 'react-native-sqlite-storage';
global.db = openDatabase(
          {
            name: 'database1.db',
            createFromLocation: 1
          },
          ()=>console.log("Database Success"),
          ()=>console.log("Daatbase Fail")
          );

const App: () => React$Node = () => {
  return (
    <>
      <ThemeProvider theme={{...theme}}>
      <ToastProvider maxToasts={3} offset={scale(50)} position="BOTTOM">
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navigationRef} onReady={() => {
                isReadyRef.current = true;
              }}>
              <Screens/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
      </ToastProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
