import {useEffect} from 'react';
import notifee, {EventType, EventDetail} from '@notifee/react-native';
import {dumpEventType} from './notificationsUtils';

// Subscribe to events
export const useForegroundNotifications = () => {
  useEffect(() => {
    console.log('-- Subscribing to foreground notifications');
    let unsubscribe: () => void | undefined;
    try {
      unsubscribe = notifee.onForegroundEvent(
        ({type, detail}: {type: EventType; detail: EventDetail}) => {
          console.log(
            `-- onForegroundEvent: type: ${dumpEventType(type)} id: ${
              detail?.notification?.id
            } - press_act_id: ${detail?.pressAction?.id}`,
          );

          switch (type) {
            case EventType.DELIVERED:
              // console.log('notification delivered');
              break;
            case EventType.DISMISSED:
              console.log('User dismissed notification', detail.notification);
              break;
            case EventType.PRESS:
              console.log('User pressed notification', detail.notification);
              break;
          }
        },
      );
    } catch (error) {
      console.error(`exception - bootstrap: ${error}`);
    }
    return () => {
      if (unsubscribe) {
        console.log('-- Unsubscribing to foreground notifications');
        unsubscribe();
      }
    };
  }, []);
};
