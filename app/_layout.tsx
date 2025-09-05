import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "../components/SafeScreen";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}/>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}