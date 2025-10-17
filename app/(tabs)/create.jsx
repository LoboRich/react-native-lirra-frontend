import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../assets/styles/create.styles";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../../constants/api";
import KeywordInputWithSuggestions from "../../components/KeywordInput";

export default function Create() {
  const [title, setTitle] = useState("");
  // const [image, setImage] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [subjectTitles, setSubjectTitles] = useState([]);
  const [author, setAuthor] = useState("");
  const [version, setVersion] = useState(null);
  const [edition, setEdition] = useState(null);
  // const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { token, user } = useAuthStore();
  const pickImage = async () => {
    try {
      // Request permission if needed
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
          return;
        }
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setImage(asset.uri);

        // Prefer built-in base64 if provided
        if (asset.base64) {
          setImageBase64(asset.base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: "base64",
          });
          setImageBase64(base64);
        }

        // Validate base64 string
        if (!asset.base64 && !imageBase64) {
          Alert.alert("Error", "Unable to read image file, please try again.");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "There was a problem selecting your image.");
    }
  };

  const handleSubmit = async () => {
    if (!title || !author){
      Alert.alert("Error", "Please fill in all fields and select a valid image.");
      return;
    }

    try {
      setLoading(true);

      // Ensure the image has a valid extension
      // const uriParts = image.split(".");
      // const fileType = uriParts[uriParts.length - 1]?.toLowerCase();
      // const validTypes = ["jpg", "jpeg", "png", "webp"];

      // const imageType = validTypes.includes(fileType)
      //   ? `image/${fileType}`
      //   : "image/jpeg";

      // const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      // if (!imageDataUrl.startsWith("data:image/")) {
      //   throw new Error("Invalid image format. Please try another image.");
      // }

      const response = await fetch(`${API_URL}/reading-materials`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          keywords,
          subjectTitles,
          version,
          edition,
          college: user?.college,
          type: "book",
        }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Non-JSON response:", text);
        throw new Error("Invalid server response. Please check your backend.");
      }

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      Alert.alert("Success", "Your material recommendation has been posted!");
      setTitle("");
      setKeywords([]);
      setSubjectTitles([]);
      setAuthor("");
      setVersion(null);
      setEdition(null);
      router.push("/");
    } catch (error) {
      console.error("Error creating material:", error);
      Alert.alert("Error", error.message || "Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.title}>Add Material Recommendation</Text>
          </View>

          <View style={styles.form}>
            {/* BOOK TITLE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            <View style={{flexDirection: "row", flex: 1, gap: 10}}>
              <View style={[styles.formGroup, {flex: 1}]}>
                <Text style={styles.label}>Version</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    keyboardType="numeric"
                    value={version}
                    style={styles.input}
                    onChangeText={setVersion}
                  />
                </View>
              </View>

              <View style={[styles.formGroup, {flex: 1}]}>
                <Text style={styles.label}>Edition</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    keyboardType="numeric"
                    value={edition}
                    style={styles.input}
                    onChangeText={setEdition}
                  />
                </View>
              </View>
            </View>

            {/* AUTHOR */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Author</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter author"
                  placeholderTextColor={COLORS.placeholderText}
                  value={author}
                  onChangeText={setAuthor}
                />
              </View>
            </View>

            {/* IMAGE */}
            {/* <View style={styles.formGroup}>
              <Text style={styles.label}>Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                    <Text style={styles.placeholderText}>Tap to select image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View> */}
                    
            {/* KEYWORDS */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Keywords</Text>
              <KeywordInputWithSuggestions keywords={keywords} setKeywords={setKeywords} placeholder="Enter keywords..."/>
            </View>

            {/* SUBJECT TITLES */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Subject titles</Text>
              <KeywordInputWithSuggestions keywords={subjectTitles} setKeywords={setSubjectTitles} placeholder="Enter subject titles..."/>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Suggested</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}