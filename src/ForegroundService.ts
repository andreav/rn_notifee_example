import {Notification} from '@notifee/react-native';
import {
  BuildForegrounServiceTest,
  FGSvcTestNotifId,
} from './ForegroundServiceTest';

/*
 * This FG Service handles multiple Services
 */
export const ForegroundService = (notification: Notification) => {
  console.log(`-- ForegroundService: notification.id: ${notification.id}`);

  switch (notification.id) {
    case FGSvcTestNotifId:
      return BuildForegrounServiceTest(notification);

    // case FGSvcOtherNotifId:
    //   return BuildForegrounServiceOther(notification);

    default:
      console.error(
        `ForegroundService - notification id not forseen ${notification.id}`,
      );
      break;
  }
};
