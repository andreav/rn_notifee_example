/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {useForegroundNotifications} from './src/useForegroundNotifications';

import notifee, {
  AndroidChannel,
  AndroidImportance,
} from '@notifee/react-native';
import {
  displayNotificationFullScreenTest,
  StartForeGroundServiceTest,
  ManuallyStopForeGroundServiceTest,
} from './src/ForegroundServiceTest';

const channels: AndroidChannel[] = [
  {
    name: 'High Importance',
    id: 'high',
    importance: AndroidImportance.HIGH,
  },
  {
    name: 'Default Importance',
    id: 'default',
    importance: AndroidImportance.DEFAULT,
  },
  {
    name: 'Foreground Svc',
    id: 'low',
    importance: AndroidImportance.LOW,
  },
  {
    name: 'Min Importance',
    id: 'min',
    importance: AndroidImportance.MIN,
  },
];

const createNotifChannels = async () => {
  console.log('create');
  return await Promise.all(channels.map(ch => notifee.createChannel(ch)));
};

function App(): JSX.Element {
  useEffect(() => {
    async function init() {
      await notifee.requestPermission();
      await createNotifChannels();
    }
    init();
  }, []);

  useForegroundNotifications();

  return (
    <SafeAreaView>
      <View>
        <Text>NotifeeTest</Text>
      </View>
      <View style={styles.buttonView}>
        <Button
          title="Display Notification"
          onPress={() => displayTestNotification()}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          title="Display Full scrren"
          onPress={() => displayNotificationFullScreenTest()}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          title="Run Foreground Service"
          onPress={() => StartForeGroundServiceTest()}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          title="Stop Foreground Service"
          onPress={() => ManuallyStopForeGroundServiceTest()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 20,
  },
});

const displayTestNotification = async () => {
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId: 'high',
      pressAction: {
        id: 'NotifeeTestId',
        launchActivity: 'default',
      },
      progress: {
        max: 10,
        current: 0,
        indeterminate: true,
      },
      importance: AndroidImportance.HIGH,
    },
  });
};

export default App;
