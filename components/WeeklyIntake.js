import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

const getLastWeekData = async () => {
  try {
    const savedHistory = await AsyncStorage.getItem('intakeHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : {};

    let last7Days = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
      last7Days.push({ date, intake: history[date] || 0 });
    }

    return last7Days.reverse(); // Return in chronological order
  } catch (error) {
    console.error('Failed to fetch history:', error);
    return [];
  }
};

export default function WeeklyIntake() {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      const data = await getLastWeekData();
      setWeeklyData(data);
    };

    fetchWeeklyData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      {weeklyData.length > 0 && (
        <LineChart
        data={{
            labels: weeklyData.map(d => moment(d.date).format('M/D')), // Format date as 'M-D' (e.g., 9-10)
            datasets: [{ data: weeklyData.map(d => d.intake) }]
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#434343',
            backgroundGradientFrom: '#434343',
            backgroundGradientTo: '#434343',
            decimalPlaces: 0,
            // color: (opacity = 1) => `rgba(16, 129, 255, ${opacity})`,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={{ marginVertical: 8,  borderRadius: 16 }}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 35,
    },
    title:{
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});