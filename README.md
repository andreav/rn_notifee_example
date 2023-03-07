# rn_notifee_example

A simple React Native [Notifee](https://notifee.app/) example

This app starts a [Foreground Service](https://notifee.app/react-native/docs/android/foreground-service) and creates a Full Screen notification after a few second.

The notification is shown also if the app is send to background or if it is killed before the timeout occours.

There is a progress bar indicator on the Foreground Service notification and also the possibility to stop the Foreground Service directly form its notification  through an action button.

Stopping the Foreground Service will also dismiss the full screen notification.
