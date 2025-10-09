import React from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { LineChart, BarChart } from "react-native-chart-kit";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/dashboard.styles";
import LogoutButton from "../../components/LogoutButton";

const screenWidth = Dimensions.get("window").width;

// --- sample/mock data ---
const stats = {
  totalMaterials: 124,
  teachers: 18,
  totalVotes: 392,
};

const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [12, 25, 18, 40, 30, 50],
      strokeWidth: 2,
    },
  ],
};

const barChartData = {
  labels: ["Books", "E-books", "Multimedia", "Magazines"],
  datasets: [
    {
      data: [45, 20, 30, 10],
    },
  ],
};

export default function Dashboard() {
  const CHART_WIDTH = Math.min(screenWidth - 32, 1000);
  const CHART_HEIGHT = 220;

  const chartConfig = {
    backgroundGradientFrom: COLORS.cardBackground,
    backgroundGradientTo: COLORS.cardBackground,
    decimalPlaces: 0,
    color: (opacity = 1) => COLORS.primary,
    labelColor: (opacity = 1) => COLORS.textSecondary,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: COLORS.primary,
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Stats row */}
      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statCardContent}>
            <Text style={styles.statNumber}>{stats.totalMaterials}</Text>
            <Text style={styles.statLabel}>Materials</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statCardContent}>
            <Text style={styles.statNumber}>{stats.teachers}</Text>
            <Text style={styles.statLabel}>Teachers</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statCardContent}>
            <Text style={styles.statNumber}>{stats.totalVotes}</Text>
            <Text style={styles.statLabel}>Total Votes</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Line chart */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Materials Over Time</Text>
          <LineChart
            data={lineChartData}
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={false}
          />
        </Card.Content>
      </Card>

      {/* Bar chart */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Materials by Type</Text>
          <BarChart
            data={barChartData}
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars
            fromZero
          />
        </Card.Content>
      </Card>
       <LogoutButton />
    </ScrollView>
  );
}
