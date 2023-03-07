import {EventType} from '@notifee/react-native';

export const dumpEventType = (eventType: EventType) => {
  switch (eventType) {
    case EventType.UNKNOWN:
      return 'UNKNOWN';
    case EventType.DISMISSED:
      return 'DISMISSED';
    case EventType.PRESS:
      return 'PRESS';
    case EventType.ACTION_PRESS:
      return 'ACTION_PRESS';
    case EventType.DELIVERED:
      return 'DELIVERED';
    case EventType.APP_BLOCKED:
      return 'APP_BLOCKED';
    case EventType.CHANNEL_BLOCKED:
      return 'CHANNEL_BLOCKED';
    case EventType.CHANNEL_GROUP_BLOCKED:
      return 'CHANNEL_GROUP_BLOCKED';
    case EventType.TRIGGER_NOTIFICATION_CREATED:
      return 'TRIGGER_NOTIFICATION_CREATED';
    case EventType.FG_ALREADY_EXIST:
      return 'FG_ALREADY_EXIST';
    default:
      return `EventType NON PREVISTO: ${eventType}`;
  }
};
