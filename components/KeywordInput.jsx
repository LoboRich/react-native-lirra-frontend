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

export default function KeywordInputWithSuggestions({ existingKeywords = [] }) {
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const addKeyword = (word = keyword) => {
    const trimmed = word.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords((prev) => [...prev, trimmed]);
      setKeyword("");
      setSuggestions([]);
    }
  };

  const removeKeyword = (index) => {
    setKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (text) => {
    setKeyword(text);

    if (text.length > 0) {
      const filtered = existingKeywords.filter(
        (k) =>
          k.toLowerCase().includes(text.toLowerCase()) &&
          !keywords.includes(k)
      );
      setSuggestions(filtered.slice(0, 5)); // limit to 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input row */}
      <View style={styles.keywordsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a keyword..."
          value={keyword}
          onChangeText={handleInputChange}
          onSubmitEditing={() => addKeyword()}
          returnKeyType="done"
        />

        <TouchableOpacity style={styles.addButton} onPress={() => addKeyword()}>
          <Ionicons name="add-circle" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Suggestions dropdown (no FlatList) */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionsBox}>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.suggestionItem}
              onPress={() => addKeyword(item)}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Chips */}
      <View style={styles.chipsContainer}>
        {keywords.map((k, i) => (
          <View key={i} style={styles.chip}>
            <Text style={styles.chipText}>{k}</Text>
            <TouchableOpacity onPress={() => removeKeyword(i)}>
              <Ionicons name="close-circle" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  keywordsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
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
