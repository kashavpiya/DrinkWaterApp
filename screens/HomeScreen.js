import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WaterIntakeTracker from '../components/WaterIntakeTracker';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Intake Tracker</Text>
      <WaterIntakeTracker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});