import notifee, {
  AndroidCategory,
  AndroidImportance,
  Notification,
} from '@notifee/react-native';
import {
  handleStopActionEvent,
  UpdateNotifData,
  updateNotificationProgressBar_Loop,
} from './ForegroundServiceUtils';

const FGSvcNotifId = 'FGSVC_TEST';

export async function StartForeGroundServiceTest() {
  console.log('StartForeGroundServiceTest');

  return await notifee.displayNotification({
    id: FGSvcNotifId,
    title: 'Test Foreground service',
    body: 'This notification will exist for the lifetime of the service runner',
    android: {
      channelId: 'low',
      asForegroundService: true,
      ongoing: true,
      actions: [
        {
          title: 'Stop',
          pressAction: {
            id: 'stop_fgsvc',
          },
        },
      ],
    },
  });
}

export async function StopForeGroundServiceTest() {
  console.log('StopForeGroundServiceTest');
  return await notifee.cancelNotification(FGSvcNotifId);
}

export function ForegrounServiceTest(notification: Notification) {
  console.log(
    `-- ForegroundService: creating ForegrounServiceTest - Notif id: ${notification?.id}`,
  );

  return new Promise<void>(resolve => {
    console.log('-- ForegroundService: inside ForegrounServiceTest');

    notifee.onForegroundEvent(handleStopActionEvent(resolve, notification));
    notifee.onBackgroundEvent(handleStopActionEvent(resolve, notification));

    // let progressBarIntervalId: NodeJS.Timer =
    updateNotificationProgressBar_Loop(notification);

    // let fullScreenNotifId: string;
    setTimeout(async () => {
      const fullScreenNotifId = await displayNotificationFullScreenTest();
      UpdateNotifData(notification, {fullScreenNotifId});
      console.log('noitfffffffffffffffff', JSON.stringify(notification));
    }, 5000);
  });
}

export async function displayNotificationFullScreenTest() {
  return await notifee.displayNotification({
    title: 'Full-screen',
    android: {
      asForegroundService: false,
      channelId: 'high',
      autoCancel: false,
      category: AndroidCategory.CALL,
      importance: AndroidImportance.HIGH,
      fullScreenAction: {
        id: 'default',
        // mainComponent: 'full_screen',
      },
    },
  });
}
