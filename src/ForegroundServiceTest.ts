import notifee, {
  AndroidCategory,
  AndroidImportance,
  Notification,
  Event,
  EventType,
} from '@notifee/react-native';

const FGSvcNotifId = 'FGSVC_TEST';
const FGSvcStopActionId = 'stop_fgsvc';

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
      progress: {
        max: 10,
        current: 0,
        indeterminate: true,
      },
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

export async function CheckStopForegroundServiceTest(event: Event) {
  console.log('OnEventStopForeGroundServiceTest');
  if (
    event.type === EventType.ACTION_PRESS &&
    event.detail?.pressAction?.id === FGSvcStopActionId
  ) {
    await notifee.cancelNotification('Full-screen');
    await notifee.stopForegroundService();
  }
}

export async function ManuallyStopForeGroundServiceTest() {
  console.log('ManuallyStopForeGroundServiceTest');
  await notifee.cancelNotification('Full-screen');
  await notifee.stopForegroundService();
}

export function BuildForegrounServiceTest(notification: Notification) {
  console.log(
    `-- ForegroundService: creating ForegrounServiceTest - Notif id: ${notification?.id}`,
  );

  return new Promise<void>(() => {
    console.log('-- ForegroundService: inside ForegrounServiceTest');

    setTimeout(async () => {
      await displayNotificationFullScreenTest();
    }, 5000);
  });
}

export async function displayNotificationFullScreenTest() {
  return await notifee.displayNotification({
    id: 'Full-screen',
    title: 'Full-screen',
    android: {
      asForegroundService: false,
      channelId: 'high',
      autoCancel: false,
      category: AndroidCategory.CALL,
      importance: AndroidImportance.HIGH,
      fullScreenAction: {
        id: 'default',
      },
    },
  });
}
