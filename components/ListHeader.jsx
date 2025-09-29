import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { Searchbar } from "react-native-paper";
import styles from "../assets/styles/teachers.styles";

const ListHeader = ({ searchQuery, setSearchQuery, title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 12, textAlign: "center", color: COLORS.textPrimary }}>
        {title}
      </Text>
      <Text style={{ fontSize: 14, marginBottom: 12, textAlign: "center", color: COLORS.textDark }}>
        {description}
      </Text>

      {/* Search bar */}
      <Searchbar
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClearIconPress={() => setSearchQuery("")}
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: COLORS.inputBackground || "#f4faf5",
          marginHorizontal: 10,
        }}
        inputStyle={{
          fontSize: 16,
          color: COLORS.textPrimary,
        }}
        iconColor={COLORS.textSecondary}
        placeholderTextColor={COLORS.textSecondary}
      />
    </View>
  );
};

export default ListHeader;
