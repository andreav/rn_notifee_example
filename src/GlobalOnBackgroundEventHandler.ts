import notifee, {EventType, EventDetail} from '@notifee/react-native';
import {dumpEventType} from './notificationsUtils';

export const GlobalOnBackgroundEventHandler = async ({
  type,
  detail,
}: {
  type: EventType;
  detail: EventDetail;
}) => {
  console.log(
    `-- OnBackgroundEventHandler: type: ${dumpEventType(type)} - id: ${
      detail.notification?.id
    } press_act_id: ${detail?.pressAction?.id}`,
  );

  const {notification} = detail;

  if (notification?.id) {
    // await notifee.cancelNotification(notification.id);
  }
};
