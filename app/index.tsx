import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Hello</Text>
      <Image source={require("../assets/images/research.svg")} style={{ width: 100, height: 100 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  }
});