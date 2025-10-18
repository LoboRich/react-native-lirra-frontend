import { SplashScreen, Stack, Tabs, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "../components/SafeScreen";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import COLORS from "../constants/colors";
import { Provider as PaperProvider } from "react-native-paper";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    onPrimary: COLORS.white,
    background: COLORS.background,
    surface: COLORS.cardBackground,
    onSurface: COLORS.textPrimary,
    secondary: COLORS.textSecondary,
    onSecondary: COLORS.white,
    outline: COLORS.border,
    surfaceVariant: COLORS.inputBackground,
    placeholder: COLORS.placeholderText,
    text: COLORS.textPrimary,
  },
};

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth(); // assume this sets user/token
      setAuthChecked(true);
    };
    initAuth();
  }, []);

  // Redirect based on auth state
  useEffect(() => {
    if (!authChecked) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = Boolean(user && token);

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments, authChecked]);

  if (!fontsLoaded || !authChecked) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="wordcloud" options={{ title: "Keywords" }} />
          </Stack>
        </SafeScreen>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
