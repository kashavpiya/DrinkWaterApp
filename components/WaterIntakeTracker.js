import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WaterIntakeTracker() {
  const [glasses, setGlasses] = useState(0);

  const incrementGlasses = () => {
    setGlasses(glasses + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Glasses of water today: {glasses}</Text>
      <Button title="Add a Glass" onPress={incrementGlasses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});