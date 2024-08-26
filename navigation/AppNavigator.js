import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainHome" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}