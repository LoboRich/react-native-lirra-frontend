import React from "react";
import { View, FlatList, Text, Dimensions } from "react-native";
import { Card, Avatar } from "react-native-paper";
import styles from "../assets/styles/teachers.styles";
import ListHeader from "./ListHeader";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import TeacherStatusSegments from "./TeacherStatus";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 40) / 2; // 2 cards per row with margin

export default function TeachersGrid({itemList}) {
  const [query, setQuery] = React.useState("");

  // Filter teachers by name or department
  const filteredTeachers = itemList.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(query.toLowerCase()) ||
      teacher.department.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Avatar.Image size={60} source={{ uri: item.image }} />
        <Text variant="titleMedium" style={styles.name}>
          {item.name}
        </Text>
        <Text variant="bodyMedium">{item.department}</Text>
        <Text variant="bodySmall">Joined: {item.joined}</Text>
      </Card.Content>
    </Card>
  );
  return (
    <View style={styles.container}>
      <ListHeader title="Teachers" description="List of teachers who have contributed to the community" searchQuery={""} setSearchQuery={""} />
      <TeacherStatusSegments />
      <FlatList
        data={filteredTeachers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={60} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No teachers yet</Text>
          </View>
        }
      />
    </View>
  );
}

