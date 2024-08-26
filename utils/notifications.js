import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const STORAGE_KEY = '@water_intake';
const DATE_KEY = '@last_reset_date';

export async function initializeWaterIntake() {
  const currentDate = new Date().toISOString().slice(0, 10);
  
  try {
    const lastResetDate = await AsyncStorage.getItem(DATE_KEY);
    if (lastResetDate !== currentDate) {
      // Reset water intake for the new day
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(0));
      await AsyncStorage.setItem(DATE_KEY, currentDate);
    }
  } catch (error) {
    console.error('Failed to initialize water intake:', error);
  }
}

export async function getWaterIntake() {
  try {
    const intake = await AsyncStorage.getItem(STORAGE_KEY);
    return intake ? JSON.parse(intake) : 0;
  } catch (error) {
    console.error('Failed to get water intake:', error);
    return 0;
  }
}

export async function updateWaterIntake(amount) {
  try {
    const currentIntake = await getWaterIntake();
    const newIntake = currentIntake + amount;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIntake));
  } catch (error) {
    console.error('Failed to update water intake:', error);
  }
}

export async function scheduleReminder(seconds) {
  if (Device.isDevice) {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
    console.log("drink water noti sent")
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