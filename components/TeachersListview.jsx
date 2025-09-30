import React from "react";
import { View, FlatList, Text, Dimensions } from "react-native";
import { Card, Avatar } from "react-native-paper";
import styles from "../assets/styles/teachers.styles";
import ListHeader from "./ListHeader";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import TeacherStatusSegments from "./TeacherStatus";
import { formatPublishDate } from "../lib/utils";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 40) / 2; // 2 cards per row with margin

export default function TeachersGrid({itemList, value, setValue}) {
  let tempImage = "https://api.dicebear.com/7.x/avataaars/png?seed=loborich"
  const [query, setQuery] = React.useState("");
  console.log(value)
  const renderItem = ({ item }) => (
    <Card style={styles.card} key={item._id}>
      <Card.Content style={styles.content}>
        {/* <Avatar.Image size={60} source={{ uri: item.profileImage}} /> */}
        <Avatar.Image size={60} source={{ uri: tempImage}} style={{ backgroundColor: COLORS.primary}} />
        <Text variant="titleMedium" style={styles.name}>
          {item.username}
        </Text>
        <Text variant="bodyMedium">{item.college || "No college info"}</Text>
        <Text variant="bodySmall">Joined: {formatPublishDate(item.createdAt)}</Text>
      </Card.Content>
    </Card>
  );
  return (
    <View style={styles.container}>
      <ListHeader title="Teachers" description="List of teachers who have contributed to the community" searchQuery={query} setSearchQuery={setQuery} />
      <TeacherStatusSegments value={value} setValue={setValue}/>
      <FlatList
        data={itemList}
        keyExtractor={(item) => item._id}
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

