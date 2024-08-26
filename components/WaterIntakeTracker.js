import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function WaterIntakeTracker() {
  const [glasses, setGlasses] = useState(0);
  const [maxValue, setMaxValue] = useState(3); // Default to 3 liters
  const [unit, setUnit] = useState('liters');
  const [containerType, setContainerType] = useState('glass');
  const [target, setTarget] = useState(3);

  useFocusEffect(
    React.useCallback(() => {
      const fetchSettings = async () => {
        try {
          const settingsJson = await AsyncStorage.getItem('settings');
          if (settingsJson) {
            const settings = JSON.parse(settingsJson);
            console.log('Fetched settings:', settings);

            const targetValue = settings.dailyTarget || 3;
            const unitValue = settings.unit || 'liters';
            const container = settings.containerType || 'glass';

            setContainerType(container);
            setUnit(unitValue);
            setTarget(targetValue);

            // Update maxValue based on target and unit
            let calculatedMaxValue = targetValue;
            if (unitValue === 'gallons') {
              calculatedMaxValue *= 0.264172; // Convert liters to gallons
            }

            console.log('Calculated maxValue:', calculatedMaxValue); // Debug log

            // Update the state with calculated value
            setMaxValue(calculatedMaxValue);
          } else {
            setMaxValue(3); // Default to 3 liters
          }
        } catch (error) {
          console.error('Failed to fetch settings:', error);
        }
      };

      fetchSettings();
    }, []) // The empty dependency array ensures this effect runs once on mount and when focused
  );

  useEffect(() => {
    // Log updated maxValue to ensure it's updated
    console.log('Updated maxValue:', maxValue);
  }, [maxValue]); // Effect will run when maxValue changes

  const incrementGlasses = () => {
    setGlasses(glasses + 1);
  };

  const getTitle = () => {
    switch (containerType) {
      case 'glass':
        return 'Total Glasses Today';
      case 'bottle':
        return 'Total Bottles Today';
      case 'cup':
        return 'Total Cups Today';
      default:
        return 'Total Water Today';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <CircularProgress
          value={maxValue}
          initialValue={glasses}
          radius={120}
          duration={0}
          progressValueColor={'#1081ff'}
          progressValueStyle={{ fontSize: 54 }}
          activeStrokeColor={'#1081ff'}
          maxValue={maxValue}
          title={getTitle()}
          titleColor={'#1081ff'}
          titleStyle={{ fontSize: 17 }}
          delay={0}
          activeStrokeWidth={22}
          startInPausedState
          inActiveStrokeColor={'#1081ff'}
          inActiveStrokeWidth={20}
        />
      </View>
      <Button title={`Add a ${containerType}`} onPress={incrementGlasses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  topContainer: {
    marginBottom: 20,
  },
});
