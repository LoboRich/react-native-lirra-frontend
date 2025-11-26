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

const wrapLabel = (text, maxChars = 6) => {
  const regex = new RegExp(`(.{1,${maxChars}})`, "g");
  return text.match(regex).join("\n");
};

const labels = ["Java 1st Edition", "Intro to Java", "Java 2nd Edition", "Data Structures", "Algorithms"]
  .map(l => wrapLabel(l));

const barChartData = {
  labels: labels,
  datasets: [
    {
      data: [20, 45, 30, 10, 10],
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
    propsForLabels: {
      fontSize: 9,
      textAnchor: "middle",
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
      {/* <Card style={styles.chartCard}>
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
      </Card> */}

      {/* Bar chart */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Computer Programming</Text>
          <BarChart
            data={barChartData}
            width={CHART_WIDTH}
            height={CHART_HEIGHT}
            chartConfig={chartConfig}
            style={[styles.chart, { paddingBottom: 16 }]}
            showValuesOnTopOfBars
            fromZero
            verticalLabelRotation={20}
          />
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>1. Strongly Recommended Book</Text>
          <Text style={styles.chartText}>
            "Intro to Java" by {"John Doe"} was strongly recommended by faculty members across multiple colleges, particularly from the <Text style={{ color: COLORS.primary }}>College of Computer Studies</Text>, reflecting its relevance and alignment with the core academic curriculum.
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>2. Highly Recommended Book</Text>
          <Text style={styles.chartText}>
            Highly recommended was “{'Java 2nd Edition'}” by {"Anonymous"}, endorsed by {'30'} faculty members from different institutions — {'20'} from <Text style={{ color: COLORS.primary }}>College of Computer Studies</Text>, and {'10'} from <Text style={{ color: COLORS.primary }}>'College of Information Technolog'</Text>
          </Text>
        </Card.Content>
      </Card>
       <LogoutButton />
    </ScrollView>
  );
}
