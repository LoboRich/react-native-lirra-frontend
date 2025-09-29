// styles/profile.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.background,
    paddingBottom: 40,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: COLORS.cardBackground,
    elevation: 2,
    minHeight: 90,
  },
  statCardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    fontWeight: "700",
    fontSize: 20,
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  statLabel: {
    textAlign: "center",
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  chartCard: {
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: COLORS.cardBackground,
    elevation: 2,
    overflow: "hidden",
  },
  chartTitle: {
    marginBottom: 8,
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.textDark,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default styles;