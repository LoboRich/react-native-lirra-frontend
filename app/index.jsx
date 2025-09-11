import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();

  console.log(user, token);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Hello {user?.username}</Text>
      <Image source={require("../assets/images/research.svg")} style={{ width: 100, height: 100 }} />
      <Link href="/(auth)/signup">Signup</Link>
      <Link href="/(auth)">Login</Link>
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