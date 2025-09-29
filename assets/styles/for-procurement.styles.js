import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 12,
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    overflow: "hidden",
    padding: 10,
  },
  bookImage: {
    width: 90,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: COLORS.inputBackground,
  },
  bookDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 6,
  },
  username: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  caption: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: COLORS.placeholderText,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  footerLoader: {
    marginVertical: 16,
  },
});
