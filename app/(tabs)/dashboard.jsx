import React from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import styles from '../../assets/styles/dashboard.styles';

export default function Dashboard() {
  const screenWidth = Dimensions.get('window').width

  // --- Mock data ---
  const stats = [
    { id: '1', label: 'Pending', value: 1284, data: [50, 60, 90, 120, 100, 140, 160] },
    { id: '2', label: 'For Procurement', value: 342, data: [10, 20, 30, 25, 40, 35, 45] },
    { id: '3', label: 'Teachers', value: 12, data: [1, 0, 2, 1, 3, 2, 0] },
  ];

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [300, 450, 400, 520, 480, 600, 700],
      },
    ],
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    propsForDots: {
      r: '3',
      strokeWidth: '1',
      stroke: '#10B981',
    },
  };

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.header}>Dashboard</Text>
        <View style={styles.statsHeader}>
            {/* Cards row */}
            <View style={styles.cardsRow}>
                {stats.map((s, index) => (
                    <View
                    key={s.id}
                    style={[styles.card, index < stats.length - 1 && { marginRight: 12 }]} // spacing between cards
                    >
                        <Text style={styles.cardLabel}>{s.label}</Text>
                        <Text style={styles.cardValue}>{s.value}</Text>
                    </View>
                ))}
            </View>
        </View>
      <View style={styles.card}>
            {/* Large charts */}
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Recommendations</Text>
                <LineChart
                    data={monthlyData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                />
            </View>

            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Approved Recommendations</Text>
                <BarChart
                    data={barData}
                    width={screenWidth}
                    height={220}
                    chartConfig={{
                    ...chartConfig,
                    color: (opacity = 1) => `rgba(14,165,233, ${opacity})`,
                    }}
                    style={styles.chart}
                    fromZero
                    showValuesOnTopOfBars
                />
            </View>
      </View>
    </ScrollView>
  );
}