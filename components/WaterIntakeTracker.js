import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment'; // We'll use this to handle date/time comparisons

export default function WaterIntakeTracker() {
  const [glasses, setGlasses] = useState(0);
  const [maxValue, setMaxValue] = useState(3); // Default to 3 liters
  const [unit, setUnit] = useState('liters');
  const [containerType, setContainerType] = useState('glass');
  const [target, setTarget] = useState(3);

  // Fetch saved glasses count and settings when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchGlasses = async () => {
        try {
          const savedGlasses = await AsyncStorage.getItem('glasses');
          const savedDate = await AsyncStorage.getItem('lastSavedDate');

          // Check if today is a new day compared to the saved date
          const currentDate = moment().format('YYYY-MM-DD');
          if (savedDate !== currentDate) {
            // It's a new day, reset the glasses count
            setGlasses(0);
            await AsyncStorage.setItem('lastSavedDate', currentDate);
          } else if (savedGlasses) {
            setGlasses(parseInt(savedGlasses));
          }
        } catch (error) {
          console.error('Failed to fetch glasses count:', error);
        }
      };

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

            setMaxValue(calculatedMaxValue);
          } else {
            setMaxValue(3); // Default to 3 liters
          }
        } catch (error) {
          console.error('Failed to fetch settings:', error);
        }
      };

      fetchGlasses();
      fetchSettings();
    }, []) // The empty dependency array ensures this effect runs once on mount and when focused
  );

  useEffect(() => {
    // Save glasses count to AsyncStorage whenever it updates
    const saveGlasses = async () => {
      try {
        await AsyncStorage.setItem('glasses', glasses.toString());
        const currentDate = moment().format('YYYY-MM-DD');
        await AsyncStorage.setItem('lastSavedDate', currentDate);
      } catch (error) {
        console.error('Failed to save glasses count:', error);
      }
    };

    if (glasses > 0) {
      saveGlasses();
    }
  }, [glasses]);

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
          value={glasses}
          maxValue={maxValue}
          radius={120}
          duration={0}
          progressValueColor={'#1081ff'}
          progressValueStyle={{ fontSize: 54 }}
          activeStrokeColor={'#1081ff'}
          title={getTitle()}
          titleColor={'#1081ff'}
          titleStyle={{ fontSize: 17 }}
          delay={0}
          activeStrokeWidth={22}
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