import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#434343',
        },
        tabBarShowLabel: true, // Hides labels if needed
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={focused ? 35 : 30} // Increase size when focused
              color={focused ? '#0E82FF' : '#fff'} // Blue when focused, white otherwise
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cog"
              size={focused ? 35 : 30} // Increase size when focused
              color={focused ? '#0E82FF' : '#fff'} // Blue when focused, white otherwise
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
