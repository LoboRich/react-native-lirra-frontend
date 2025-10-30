import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,                     // Take full screen height/width
    backgroundColor: COLORS.background,
    padding: 5,                  // Ensure padding inside the container
    paddingBottom: 5,            // Padding for bottom space
    justifyContent: "center",    // Center elements vertically (optional)
    alignItems: "center",        // Center elements horizontally (optional)
    overflow: "hidden",          // Prevent overflow of words outside the container
  },
});

export default styles;
