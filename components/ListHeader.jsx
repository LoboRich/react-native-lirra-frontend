import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

const ListHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 12, textAlign: "center", color: COLORS.textPrimary }}>
        LIRRA
      </Text>

      {/* Search bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.inputBackground || "#f4faf5",
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 8,
            fontSize: 18,
            color: COLORS.textPrimary,
          }}
          placeholder="Search materials..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ListHeader;
