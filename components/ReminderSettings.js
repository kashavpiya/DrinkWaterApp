import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { scheduleReminder } from '../utils/notifications';

export default function ReminderSettings() {
  const [interval, setInterval] = useState('60'); // Default to 60 minutes

  const handleSetReminder = () => {
    const seconds = parseInt(interval) * 60;
    scheduleReminder(seconds);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Set Reminder Interval (minutes):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={interval}
        onChangeText={setInterval}
      />
      <Button title="Set Reminder" onPress={handleSetReminder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: '50%',
    marginBottom: 20,
    textAlign: 'center',
  },
});