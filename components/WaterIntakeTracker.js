import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

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

          const currentDate = moment().format('YYYY-MM-DD');
          if (savedDate !== currentDate) {
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
            const targetValue = settings.dailyTarget || 3;
            const unitValue = settings.unit || 'liters';
            const container = settings.containerType || 'glass';

            setContainerType(container);
            setUnit(unitValue);
            setTarget(targetValue);

            let calculatedMaxValue = targetValue;
            if (unitValue === 'gallons') {
              calculatedMaxValue *= 0.264172;
            }

            setMaxValue(calculatedMaxValue);
          } else {
            setMaxValue(3);
          }
        } catch (error) {
          console.error('Failed to fetch settings:', error);
        }
      };

      fetchGlasses();
      fetchSettings();
    }, [])
  );

  const saveDailyHistory = async () => {
    try {
      const currentDate = moment().format('YYYY-MM-DD');
      const savedHistory = await AsyncStorage.getItem('intakeHistory');
      let history = savedHistory ? JSON.parse(savedHistory) : {};
      
      history[currentDate] = glasses;
      await AsyncStorage.setItem('intakeHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save daily history:', error);
    }
  };

  useEffect(() => {
    saveDailyHistory();
  }, [glasses]);

  useEffect(() => {
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
        return 'Total Glasses';
      case 'bottle':
        return 'Total Bottles';
      case 'cup':
        return 'Total Cups';
      default:
        return 'Total Water';
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
          progressValueColor={'#0E82FF'}
          progressValueStyle={{ fontSize: 54 }}
          activeStrokeColor={'#0E82FF'}
          title={getTitle()}
          titleColor={'#0E82FF'}
          titleStyle={{ fontSize: 17 }}
          delay={0}
          activeStrokeWidth={22}
          inActiveStrokeColor={'#0E82FF'}
          inActiveStrokeWidth={22}
        />
      </View>
      <Button title={`Add a ${containerType}`} onPress={incrementGlasses} color="#0E82FF"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  topContainer: {
    marginBottom: 20,
  }
});
