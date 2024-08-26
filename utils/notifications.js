import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export async function scheduleReminder(seconds) {
  await Permissions.askAsync(Permissions.NOTIFICATIONS);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time to Drink Water!',
      body: 'Stay hydrated by drinking a glass of water.',
    },
    trigger: {
      seconds,
      repeats: true,
    },
  });
}