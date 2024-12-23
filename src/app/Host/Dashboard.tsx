import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart, ProgressChart, PieChart } from 'react-native-chart-kit';
import { parkingData } from './DashboardData';

const screenWidth = Dimensions.get('window').width;

export default function HostDashboard() {
  const defaultData = {
    labels: [],
    datasets: [{ data: [] }],
  };

  const revenueData = parkingData?.revenue || defaultData;
  const expenseProfitData = parkingData?.expenseProfit || defaultData;
  const usageStats = parkingData?.usageStats || { labels: [], data: [] };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Parking Host Dashboard</Text>

      {/* Summary Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Daily Revenue</Text>
          <Text style={styles.summaryValue}>Rs:{parkingData.revenue.daily}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Weekly Revenue</Text>
          <Text style={styles.summaryValue}>Rs:{parkingData.revenue.weekly}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Monthly Revenue</Text>
          <Text style={styles.summaryValue}>Rs:{parkingData.revenue.monthly}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Parking Slots</Text>
          <Text style={styles.summaryValue}>{parkingData.totalSlots}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Hours Utilized</Text>
          <Text style={styles.summaryValue}>{parkingData.hoursUtilized} hrs</Text>
        </View>
      </ScrollView>

      {/* Revenue Chart */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Revenue Overview</Text>
        <LineChart
          data={revenueData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
        />
      </View>

      {/* Expense vs Profit */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Expense vs Profit</Text>
        <BarChart
          data={expenseProfitData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
      </View>

      {/* Usage Distribution */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Parking Usage Distribution</Text>
        <PieChart
          data={parkingData.usageDistribution}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Income Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Last Income</Text>
        <ProgressChart
          data={usageStats}
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
  summaryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    width: 150,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    color: '#00796b',
    marginBottom: 10,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d40',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
