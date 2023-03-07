/**
 * @format
 */
import notifee from '@notifee/react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ForegroundService} from './src/ForegroundService';
import {GlobalOnBackgroundEventHandler} from './src/GlobalOnBackgroundEventHandler';

console.log('-- Subscribing onBackgroundEvent');
notifee.onBackgroundEvent(GlobalOnBackgroundEventHandler);
notifee.registerForegroundService(ForegroundService);

AppRegistry.registerComponent(appName, () => App);
