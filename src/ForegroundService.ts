import notifee, {
  AndroidCategory,
  AndroidImportance,
  EventDetail,
  EventType,
  Notification,
} from '@notifee/react-native';

export async function StartForeGroundService() {
  return await notifee.displayNotification({
    id: '123',
    title: 'Foreground service',
    body: 'This notification will exist for the lifetime of the service runner',
    android: {
      channelId: 'default',
      asForegroundService: true,
      ongoing: true,
      actions: [
        {
          title: 'Stop',
          pressAction: {
            id: 'stop',
          },
        },
      ],
    },
  });
}

export async function displayTestNotificationFullScreen() {
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

export const ForegroundService = (notification: Notification) => {
  console.log(`-- ForegroundService: ${JSON.stringify(notification)}`);

  return new Promise<void>(resolve => {
    console.log(
      `-- ForegroundService: inside promise Notif id: ${notification?.id}`,
    );

    async function stopService(): Promise<void> {
      console.warn('Stopping service.');
      if (notification.id) {
        await notifee.cancelNotification(notification?.id);
      }
      return resolve();
    }

    async function handleStopActionEvent({
      type,
      detail,
    }: {
      type: EventType;
      detail: EventDetail;
    }): Promise<void> {
      if (type !== EventType.ACTION_PRESS) {
        return;
      }
      if (detail?.pressAction?.id === 'stop') {
        console.warn('Stop action was pressed');
        clearInterval(intervalId);
        await notifee.cancelNotification(fullScreenNotifId);
        await stopService();
      }
    }
    notifee.onForegroundEvent(handleStopActionEvent);
    notifee.onBackgroundEvent(handleStopActionEvent);

    let intervalId: number;
    async function updateInProgressNotif() {
      let current = 1;
      intervalId = setInterval(async () => {
        console.log(current);
        console.log(current % 10);

        notifee.displayNotification({
          id: notification.id,
          body: notification.body,
          android: {
            ...notification.android,
            progress: {
              max: 10,
              current: current % 10,
            },
          },
        });
        current++;
      }, 1000);
      return intervalId;
    }

    // updateInProgressNotif();

    let fullScreenNotifId: string;
    setTimeout(async () => {
      fullScreenNotifId = await displayTestNotificationFullScreen();
    }, 5000);
  });
};
