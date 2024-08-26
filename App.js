import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { initializeWaterIntake } from './utils/notifications'; // Ensure this path is correct

export default function App() {
  useEffect(() => {
    initializeWaterIntake();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}