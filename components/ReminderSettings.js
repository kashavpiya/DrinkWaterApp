import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { scheduleReminder } from '../utils/notifications';
import * as Animatable from 'react-native-animatable';

export default function ReminderSettings() {
  const [interval, setInterval] = useState('60'); // Default to 60 minutes

  const handleSetReminder = () => {
    const seconds = parseInt(interval) * 60;
    scheduleReminder(seconds);
  };

  return (
    <Animatable.View animation="fadeInUp" style={styles.container}>
      <Text style={styles.label}>Set Reminder Interval</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter interval in minutes"
        keyboardType="numeric"
      />
      <Button title="Save" onPress={() => { /* Save action */ }} color="#444" />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
});