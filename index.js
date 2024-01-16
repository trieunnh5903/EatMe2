/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  console.log('notification', notification);
  console.log('pressAction', pressAction);
  await notifee.cancelNotification(notification.id);
});

AppRegistry.registerComponent(appName, () => App);
