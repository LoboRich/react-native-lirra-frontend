import React from "react";
import { View, FlatList, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import styles from "../assets/styles/teachers.styles";
import ListHeader from "./ListHeader";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

const { width } = Dimensions.get("window");
// Function to calculate number of columns based on screen size
const getNumColumns = () => {
  if (width >= 900) return 4; // tablets/large screens
  if (width >= 600) return 3; // medium devices
  return 2; // phones
};

const numColumns = getNumColumns();
const CARD_WIDTH = width / numColumns - 24; // dynamic card width
const TeacherCard = ({ fullname, image_url, date_joined }) => (
  <View style={styles.card}>
    {/* <Image source={{ uri: image_url }} style={styles.image} /> */}
    {/* <Image source={image_url} style={styles.image} contentFit="cover" /> */}
    <Image source={{ uri: "https://api.dicebear.com/7.x/avataaars/png?seed=loborich" }} style={styles.image} contentFit="cover" />
    <Text style={styles.name}>{fullname}</Text>
    <Text style={styles.date}>Joined: {date_joined}</Text>
  </View>
);

export default function TeachersGrid({itemList}) {
  return (
    <View style={styles.container}>
      <ListHeader title="Contributors" description="List of teachers who have contributed to the community" searchQuery={""} setSearchQuery={""} />

      <FlatList
        data={itemList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TeacherCard
            fullname={item.fullname}
            image_url={item.image_url}
            date_joined={item.date_joined}
          />
        )}
        numColumns={numColumns}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

