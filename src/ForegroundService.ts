import {Notification} from '@notifee/react-native';
import {BuildForegrounServiceTest} from './ForegroundServiceTest';

/*
 * This FG Service handles multiple Services
 */
export const ForegroundService = (notification: Notification) => {
  console.log(`-- ForegroundService: notification.id: ${notification.id}`);

  switch (notification.id) {
    case 'FGSVC_TEST':
      return BuildForegrounServiceTest(notification);

    // case 'FGSVC_OTHER':
    //   return ForegroundServiceOther(notification);

    default:
      console.error(
        `ForegroundService - notification id not forseen ${notification.id}`,
      );
      break;
  }
};
