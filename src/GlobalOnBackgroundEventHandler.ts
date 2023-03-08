import notifee, {Event} from '@notifee/react-native';
import {CheckStopForegroundServiceTest} from './ForegroundServiceTest';
import {dumpEventType} from './notificationsUtils';

export const GlobalOnBackgroundEventHandler = async (event: Event) => {
  console.log(
    `-- OnBackgroundEventHandler: type: ${dumpEventType(event.type)} - id: ${
      event.detail.notification?.id
    } press_act_id: ${event.detail?.pressAction?.id}`,
  );

  const {notification} = event.detail;

  CheckStopForegroundServiceTest(event);
};
