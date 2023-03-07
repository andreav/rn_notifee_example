import notifee from '@notifee/react-native';
import {useEffect} from 'react';

export type IOnAppOpenedFromNotification = () => void;

export const useBootstrapNotificationInfo = (
  onAppOpenedFromNotification: IOnAppOpenedFromNotification,
) => {
  // Bootstrap sequence function
  async function bootstrap() {
    try {
      const initialNotification = await notifee.getInitialNotification();
      console.log(
        `-- initialNotification: ${JSON.stringify(
          initialNotification,
          null,
          2,
        )}`,
      );

      if (initialNotification) {
        console.log(
          'Notification caused application to open',
          initialNotification.notification,
        );
        console.log(
          'Press action used to open the app',
          initialNotification.pressAction,
        );
      }
    } catch (error) {
      console.error(`exception - bootstrap: ${error}`);
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => onAppOpenedFromNotification())
      .catch(console.error);
  }, [onAppOpenedFromNotification]);
};
