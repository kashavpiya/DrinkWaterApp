import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarIcon: (() => (
                <MaterialCommunityIcons
                  focused
                  name={'home'}
                  size={30}
                  color={'#1081ff'}
                />
              )), }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, tabBarIcon: (() => (
                <MaterialCommunityIcons
                  focused
                  name={'cog'}
                  size={30}
                  color={'#1081ff'}
                />
              )), }} />
    </Tab.Navigator>
  );
}