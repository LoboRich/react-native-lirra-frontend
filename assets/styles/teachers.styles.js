import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20; // 2 cards per row with spacing

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
  title: {
      fontSize: 16,
      color: '#000',
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 12,
      justifyContent: 'center',
  },
  description: {
      fontSize: 11,
      fontStyle: 'italic',
  },
  photo: {
      height: 50,
      width: 50,
  },
  list: {
      padding: 10,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 10,
      margin: 8,
      padding: 12,
      alignItems: "center",
      width: CARD_WIDTH,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3, // android shadow
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
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
    addTeacherButton: {
      backgroundColor: COLORS.primary,
      borderRadius: 12,
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    addTeacherText: {
      color: COLORS.white,
      fontWeight: "600",
      marginLeft: 8,
    },
});

export default styles;
