import {Notification} from '@notifee/react-native';
import {ForegrounServiceTest} from './ForegroundServiceTest';

/*
 * This FG Service handles multiple Services
 */
export const ForegroundService = (notification: Notification) => {
  console.log(`-- ForegroundService: notification.id: ${notification.id}`);

  switch (notification.id) {
    case 'FGSVC_TEST':
      return ForegrounServiceTest(notification);

    // case 'FGSVC_OTHER':
    //   return ForegroundServiceOther(notification);

    default:
      console.error(
        `ForegroundService - notification id not forseen ${notification.id}`,
      );
      break;
  }
};
