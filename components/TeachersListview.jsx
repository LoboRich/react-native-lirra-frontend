import React, { useState } from "react";
import { View, FlatList, Text, Dimensions } from "react-native";
import { Card, Avatar, Menu, IconButton } from "react-native-paper";
import styles from "../assets/styles/teachers.styles";
import ListHeader from "./ListHeader";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import TeacherStatusSegments from "./TeacherStatus";
import { formatPublishDate } from "../lib/utils";
import { API_URL } from "../constants/api";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 40) / 2; // 2 cards per row with margin

export default function TeachersGrid({itemList, value, setValue, token}) {
  const [query, setQuery] = useState("");
  const [menuVisibleId, setMenuVisibleId] = useState(null); 

  const openMenu = (id) => setMenuVisibleId(id);
  const closeMenu = () => setMenuVisibleId(null);

  const activateUser = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/auth/${userId}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("Failed to activate user");
  
      const data = await res.json();
      console.log("Activated:", data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  
  const deleteUser = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/auth/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("Failed to delete user");
  
      const data = await res.json();
      console.log("Deleted:", data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  
  const renderItem = ({ item }) => (
    <Card style={styles.card} key={item._id}>
      <Card.Content style={styles.content}>
        {/* Show only when value is pending */}
        {value === "pending" && (
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
                onPress={async () => {
                  await activateUser(item._id);
                  closeMenu();
                }}
                title="Activate"
                leadingIcon="check-circle"
              />

              <Menu.Item
                onPress={async () => {
                  await deleteUser(item._id);
                  closeMenu();
                }}
                title="Delete"
                leadingIcon="delete"
                titleStyle={{ color: "red" }}
              />
            </Menu>
          </View>
        )}
        {/* Avatar + Info */}
        <Avatar.Image
          size={60}
          source={{ uri: item.profileImage }}
          style={{ backgroundColor: COLORS.primary}}
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
      <Text style={styles.pagetitle}>Teachers</Text>
      <TeacherStatusSegments value={value} setValue={setValue}/>
      <FlatList
        data={itemList}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
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

