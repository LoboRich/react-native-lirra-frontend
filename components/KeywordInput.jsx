import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function KeywordInputWithSuggestions({keywords, setKeywords, placeholder}) {
  const [keyword, setKeyword] = useState("");

  const addKeyword = (word = keyword) => {
    const trimmed = word.trim();
    console.log(keywords);
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords((prev) => [...prev, trimmed]);
      setKeyword("");
    }
  };

  const removeKeyword = (index) => {
    setKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (text) => {
    setKeyword(text);
  };

  return (
    <View style={styles.container}>
      {/* Input row */}
      <View style={styles.keywordsContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={keyword}
          onChangeText={handleInputChange}
          onSubmitEditing={() => addKeyword()}
          returnKeyType="done"
        />

        <TouchableOpacity style={styles.addButton} onPress={() => addKeyword()}>
          <Ionicons name="add-circle" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      {/* Chips */}
      { keywords.length > 0 && (
        <View style={styles.chipsContainer}>
          {keywords.map((word, index) => (
            <View key={index} style={styles.chip}>
              <Text style={styles.chipText}>{word}</Text>
              <TouchableOpacity onPress={() => removeKeyword(index)}>
                <Ionicons name="close-circle" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  keywordsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: 48,
    color: COLORS.textDark,
  },
  addButton: {
    marginLeft: 8,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 4,
  },
  chipText: {
    marginRight: 6,
  },
  suggestionsBox: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginTop: 4,
    elevation: 3,
    maxHeight: 150,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  suggestionText: {
    fontSize: 15,
    color: "#333",
  },
});
