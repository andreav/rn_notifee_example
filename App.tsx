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
  StopForeGroundServiceTest,
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
          title="Run Foreground Service"
          onPress={() => StopForeGroundServiceTest()}
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
    data: {mykey: 'myval'},
    android: {
      channelId: 'high',
      pressAction: {
        id: 'NotifeeTestId',
        launchActivity: 'default',
      },
      importance: AndroidImportance.HIGH,
    },
  });
};

export default App;
