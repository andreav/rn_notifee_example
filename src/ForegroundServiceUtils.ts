import notifee, {
  AndroidCategory,
  AndroidChannel,
  AndroidImportance,
  EventDetail,
  Notification,
} from '@notifee/react-native';
import {EventType} from '@notifee/react-native';

/*
 * Draw a progress bar on the FGSvc Notif
 */
export const updateNotificationProgressBar_Loop = (
  notification: Notification,
): NodeJS.Timer => {
  let current = 1;
  const progressBarIntervalId = setInterval(async () => {
    // console.log('current', current);
    // console.log(current % 10);
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

  UpdateNotifData(notification, {progressBarIntervalId});

  // attacco alla notifia l'interval cosi chi interrompe la notifica sa come interrompere l'interval
  //   notifee.displayNotification({
  //     id: notification.id,
  //     body: notification.body,
  //     android: {
  //       ...notification.android,
  //       progress: {
  //         max: 10,
  //         current: current % 10,
  //       },
  //     },
  //     data: {
  //       ...notification.data,
  //       progressBarIntervalId,
  //     },
  //   });

  return progressBarIntervalId;
};

/*
 * Add informations to FGSvc Notif in order to make it indipendent from where it is stopped
 */
export function UpdateNotifData(
  notification: Notification,
  newData: {[key: string]: string | number | object},
) {
  console.log(
    `UpdateNotifData: notifId ${notification.id}`,
    JSON.stringify(newData),
  );

  notification.data = {
    ...notification.data,
    ...newData,
  };

  // notifee.displayNotification({
  //   id: notification.id,
  //   data: {
  //     ...notification.data,
  //     ...newData,
  //   },
  // });
}

/*
 * Generic FGSvc Notif stop event
 * Clears interval if detail.notification?.data?.progressBarIntervalId is set
 * Clears full screen notif if detail.notification?.data?.fullScreenNotifId is set
 */
export const handleStopActionEvent =
  (resolve: any, origNotification: Notification) =>
  async ({
    type,
    detail,
  }: {
    type: EventType;
    detail: EventDetail;
  }): Promise<void> => {
    console.log('handleStopActionEvent');

    try {
      if (type !== EventType.ACTION_PRESS) {
        return;
      }
      console.log(
        'handleStopActionEvent: ',
        JSON.stringify(detail.notification, null, 2),
      );

      const notificationId = origNotification?.id;
      const progressBarIntervalId: any =
        origNotification?.data?.progressBarIntervalId;
      const fullScreenNotifId = origNotification?.data?.fullScreenNotifId;

      console.log(
        `notificationId: ${notificationId} - progressBarIntervalId: ${progressBarIntervalId} - fullScreenNotifId: ${fullScreenNotifId}`,
      );

      if (detail?.pressAction?.id === 'stop_fgsvc') {
        console.warn('Stop action was pressed');
        clearInterval(progressBarIntervalId);
        if (fullScreenNotifId) {
          console.log('canceling full screen notif: ', notificationId);
          await notifee.cancelNotification(`${fullScreenNotifId}`);
        }

        // Stopping service
        console.warn('Stopping service ForegroundServiceStartMeeting');
        if (notificationId) {
          console.log('canceling fgvìsvc notif: ', notificationId);
          await notifee.cancelNotification(notificationId);
        }
        return await resolve();
      }
    } catch (error) {
      console.error('@ handleStopActionEvent error: ', error);
    }
  };
