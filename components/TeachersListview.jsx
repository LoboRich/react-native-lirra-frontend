import React, { useState } from "react";
import { View, FlatList, Text, Dimensions } from "react-native";
import { Card, Avatar, Menu, IconButton } from "react-native-paper";
import styles from "../assets/styles/teachers.styles";
import ListHeader from "./ListHeader";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import TeacherStatusSegments from "./TeacherStatus";
import { formatPublishDate } from "../lib/utils";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 40) / 2; // 2 cards per row with margin

export default function TeachersGrid({itemList, value, setValue}) {
  const [query, setQuery] = useState("");
  const [menuVisibleId, setMenuVisibleId] = useState(null); 

  const openMenu = (id) => setMenuVisibleId(id);
  const closeMenu = () => setMenuVisibleId(null);
  const renderItem = ({ item }) => (
    <Card style={styles.card} key={item._id}>
      <Card.Content style={styles.content}>
        {/* Absolute positioned menu button */}
        <View style={styles.menuContainer}>
          <Menu
            visible={menuVisibleId === item._id}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="dots-horizontal"
                size={22}
                onPress={() => openMenu(item._id)}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                onConfirm?.(item);
                closeMenu();
              }}
              title="Confirm"
              leadingIcon="check-circle"
            />
            <Menu.Item
              onPress={() => {
                onCancel?.(item);
                closeMenu();
              }}
              title="Cancel"
              leadingIcon="close-circle"
            />
          </Menu>
        </View>

        {/* Avatar + Info */}
        <Avatar.Image
          size={60}
          source={{ uri: item.profileImage }}
          style={{ backgroundColor: COLORS.primary }}
        />
        <Text variant="titleMedium" style={styles.name}>
          {item.username}
        </Text>
        <Text variant="bodyMedium">{item.college || "No college info"}</Text>
        <Text variant="bodySmall">
          Joined: {formatPublishDate(item.createdAt)}
        </Text>
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

