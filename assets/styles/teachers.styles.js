import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20; // 2 cards per row with spacing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 5,
    paddingBottom: 5,
  },
  row: {
    justifyContent: "space-between",
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  pagetitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: COLORS.textPrimary
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    elevation: 2,
    position: "relative",
  },
  content: {
    padding: 16,
    alignItems: "center",
  },
  menuContainer: {
    position: "absolute",
    top: -10,
    right: 0,
    zIndex: 1,
  },
  name: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    marginTop: 8,
  },
  title: {
      fontSize: 16,
      color: '#000',
  },
  description: {
      fontSize: 11,
      fontStyle: 'italic',
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});

export default styles;
