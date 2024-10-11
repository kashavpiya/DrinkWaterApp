import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import WaterIntakeTracker from '../components/WaterIntakeTracker';
import * as Animatable from 'react-native-animatable';
import Header from '../components/Header';
import WeeklyIntake from '../components/WeeklyIntake';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header /> 
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Water Intake Tracker</Text>
        <Animatable.View animation="fadeInUp" style={styles.boxContainer}>
          <WaterIntakeTracker />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.boxContainer}>
          <WeeklyIntake />
        </Animatable.View> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  boxContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: '700',
    color: '#444',
    marginBottom: 15,
    textAlign: 'center',
  },
});
