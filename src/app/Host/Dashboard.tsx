import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HostDashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Host Dashboard</Text>

      {/* Stats Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Coders Types</Text>
        <LineChart
          data={{
            labels: ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m'],
            datasets: [
              { data: [20, 45, 28, 80, 99, 43, 50, 60], color: () => `#4CAF50` },
              { data: [30, 70, 50, 60, 80, 90, 100, 120], color: () => `#2196F3` },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
        />
      </View>

      {/* New Employees */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>New Employees</Text>
        <BarChart
          data={{
            labels: ['2021', '2022'],
            datasets: [
              { data: [50, 80], color: () => `#4CAF50` },
              { data: [60, 90], color: () => `#2196F3` },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
      </View>

      {/* Last Data */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Last Data</Text>
        <BarChart
          data={{
            labels: ['10k', '20k', '30k', '40k', '50k', '60k', '70k', '80k'],
            datasets: [
              { data: [10, 20, 30, 40, 50, 60, 70, 80], color: () => `#4CAF50` },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </View>

      {/* Income Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Last Income</Text>
        <ProgressChart
          data={{
            labels: ['Apr', 'May', 'Jun'],
            data: [0.5, 0.7, 0.8],
          }}
          width={screenWidth - 40}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
        />
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#f7f7f7',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
