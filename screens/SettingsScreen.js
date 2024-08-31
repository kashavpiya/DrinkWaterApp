import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button , TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import SwitchSelector from 'react-native-switch-selector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { scheduleReminder } from '../utils/notifications';
import Header from '../components/Header'; 

export default function ReminderSettings() {
  const [unit, setUnit] = useState('liters');
  const [containerType, setContainerType] = useState('bottle');
  const [customContainer, setCustomContainer] = useState('');
  const [containerSize, setContainerSize] = useState('');
  const [dailyTarget, setDailyTarget] = useState(2);
  const [reminderInterval, setReminderInterval] = useState(1);

  const handleSetReminder = () => {
    const seconds = parseInt(reminderInterval) * 60;
    scheduleReminder(seconds);
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadSettings = async () => {
        try {
          const settingsJson = await AsyncStorage.getItem('settings');
          if (settingsJson) {
            const settings = JSON.parse(settingsJson);
            console.log('Loaded settings:', settings); // Debug log

            setUnit(settings.unit || 'liters');
            setContainerType(settings.containerType || 'bottle');
            setCustomContainer(settings.customContainer || '');
            setContainerSize(settings.containerSize || '');
            setDailyTarget(settings.dailyTarget || 2);
            setReminderInterval(settings.reminderInterval || 1);
          } else {
            // Set default values if no settings found
            setUnit('liters');
            setContainerType('bottle');
            setCustomContainer('');
            setContainerSize('');
            setDailyTarget(2);
            setReminderInterval(1);
          }
        } catch (error) {
          console.error('Failed to load settings', error);
        }
      };

      loadSettings();
    }, [])
  );

  const saveSettings = async () => {
    handleSetReminder();
    try {
      await AsyncStorage.setItem('settings', JSON.stringify({
        unit,
        containerType,
        customContainer,
        containerSize,
        dailyTarget,
        reminderInterval
      }));
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings', error);
    }
  };

  const unitOptions = [
    { label: "Liters", value: "liters" },
    { label: "Gallons", value: "gallons" },
  ];

  const containerTypeOptions = [
    { label: "Bottle", value: "bottle" },
    { label: "Glass", value: "glass" },
    { label: "Other", value: "other" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.title}>Preferences</Text>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Select Unit</Text>
        <SwitchSelector
          options={unitOptions}
          initial={unitOptions.findIndex(option => option.value === unit)}
          buttonColor={'#0E82FF'}
          backgroundColor={'#F3F3F3'}
          onPress={value => setUnit(value)}
          style={styles.switchSelector}
        />
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Select Container Type</Text>
        <SwitchSelector
          options={containerTypeOptions}
          initial={containerTypeOptions.findIndex(option => option.value === containerType)}
          buttonColor={'#0E82FF'}
          backgroundColor={'#F3F3F3'}
          onPress={value => setContainerType(value)}
          style={styles.switchSelector}
        />
        {containerType === 'other' && (
          <TextInput
            placeholder="Enter container type"
            value={customContainer}
            onChangeText={(text) => setCustomContainer(text)}
            style={styles.input}
          />
        )}
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Container Size ({unit})</Text>
        <TextInput
          placeholder={`Enter size in ${unit}`}
          value={containerSize}
          onChangeText={(text) => setContainerSize(text)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Daily Target ({containerType})</Text>
        <Text style={styles.subLabel}>The recommended amount for women is 2.7l and men is 3.7l a day</Text>
        <Slider
          minimumValue={1}
          maximumValue={20}
          step={1}
          value={dailyTarget}
          onValueChange={(value) => setDailyTarget(value)}
          style={styles.slider}
        />
        <Text>{dailyTarget} {containerType}</Text>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.label}>Reminder Interval (hours)</Text>
        <Slider
          minimumValue={1}
          maximumValue={24}
          step={1}
          value={reminderInterval}
          onValueChange={(value) => setReminderInterval(value)}
          style={styles.slider}
        />
        <Text>Every {reminderInterval} minutes</Text>
      </View>

      <TouchableOpacity style={styles.gradientButton} onPress={saveSettings}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F3F3F3', 
    paddingHorizontal: 16,
    paddingBottom: 50,
  },
  title: {
    marginTop: 36, 
    fontSize: 26,
    fontWeight: '700',
    color: '#444',
    marginBottom: 15,
    textAlign: 'center',
  },
  boxContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'left',
    width: '100%',
  },
  subLabel: {
    color: 'grey',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  switchSelector: {
    width: '100%',
    marginBottom: 10,
  },
  gradientButton: {
    marginVertical: 30,
    borderWidth: 3,
    borderColor: '#0E82FF',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 6,
  },
  buttonText: {
    fontFamily: 'SofiaSans_400Regular',
    textDecorationLine: 'none',
    color: '#0E82FF',
    fontSize: 18,
  },
});
