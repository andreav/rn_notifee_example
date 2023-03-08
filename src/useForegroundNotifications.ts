import {useEffect} from 'react';
import notifee, {Event} from '@notifee/react-native';
import {dumpEventType} from './notificationsUtils';
import {CheckStopForegroundServiceTest} from './ForegroundServiceTest';

export const useForegroundNotifications = () => {
  useEffect(() => {
    console.log('-- Subscribing to foreground notifications');
    let unsubscribe: () => void | undefined;
    try {
      unsubscribe = notifee.onForegroundEvent((event: Event) => {
        console.log(
          `-- onForegroundEvent: type: ${dumpEventType(event.type)} id: ${
            event.detail.notification?.id
          } - press_act_id: ${event.detail.pressAction?.id}`,
        );

        CheckStopForegroundServiceTest(event);
      });
    } catch (error) {
      console.error(`useForegroundNotifications exception: ${error}`);
    }
    return () => {
      if (unsubscribe) {
        console.log('-- Unsubscribing to foreground notifications');
        unsubscribe();
      }
    };
  }, []);
};
