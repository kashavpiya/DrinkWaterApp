import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save data', error);
  }
}

export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Failed to fetch data', error);
  }
}