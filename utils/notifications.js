import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function scheduleReminder(seconds) {
  if (Device.isDevice) {
    // Request permissions
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
    
    // Schedule notification
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
  } else {
    console.log('Must use physical device for notifications');
  }
}