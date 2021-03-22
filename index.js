/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppMetrica from 'react-native-appmetrica';

AppMetrica.activate({
    apiKey: 'daa0a500-fe17-491a-9074-9eb55bebb8df',
    sessionTimeout: 120,
    firstActivationAsUpdate: false,
  });

AppRegistry.registerComponent(appName, () => App);
