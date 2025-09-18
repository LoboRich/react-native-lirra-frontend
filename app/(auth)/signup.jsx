import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
  } from "react-native";
  import styles from "../../assets/styles/signup.styles";
  import { Ionicons } from "@expo/vector-icons";
  import COLORS from "../../constants/colors";
  import { useState } from "react";
  import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
  
  export default function Signup() {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [postnomials, setPostnomials] = useState("");
    const [college, setCollege] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { isLoading, register } = useAuthStore();
    const router = useRouter();
    
    const handleSignUp = async () => {
      const result = await register(username, firstname, lastname, postnomials, college, email, password);

      if(!result.success) {
        Alert.alert("Error", result.error);
      }
      if (result.success) router.push("/(auth)");
    };
  
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
          
          <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.title}>LIRRA</Text>
            </View>
  
            <View style={styles.formContainer}>
              {/* USERNAME INPUT */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="johndoe"
                    placeholderTextColor={COLORS.placeholderText}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* POSTNOMIAL INPUT */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Postnommials</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="ribbon-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="PhD"
                    placeholderTextColor={COLORS.placeholderText}
                    value={postnomials}
                    onChangeText={setPostnomials}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* FIRSTNAME INPUT */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Firstname</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="John"
                    placeholderTextColor={COLORS.placeholderText}
                    value={firstname}
                    onChangeText={setFirstname}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* LASTNAME INPUT */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Lastname</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="people-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Doe"
                    placeholderTextColor={COLORS.placeholderText}
                    value={lastname}
                    onChangeText={setLastname}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* COLLEGE SELECT */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>College</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="school-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="MIT"
                    placeholderTextColor={COLORS.placeholderText}
                    value={college}
                    onChangeText={setCollege}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              
  
              {/* EMAIL INPUT */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="johndoe@gmail.com"
                    value={email}
                    placeholderTextColor={COLORS.placeholderText}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
  
              {/* PASSWORD INPUT */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="******"
                    placeholderTextColor={COLORS.placeholderText}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
  
              {/* SIGNUP BUTTON */}
              <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
  
              {/* FOOTER */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }