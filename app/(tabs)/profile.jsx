import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { sleep } from ".";
import styles from "../../assets/styles/profile.styles";
import Loader from "../../components/Loader";
import LogoutButton from "../../components/LogoutButton";
import ProfileHeader from "../../components/ProfileHeader";
import { API_URL } from "../../constants/api";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";

export default function Profile() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);
  const [activeTab, setActiveTab] = useState("recommendations");
  const { token, user } = useAuthStore();

  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/reading-materials/user/materials?filter=${activeTab}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch user books");

      setBooks(data.readingMaterials);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to load profile data. Pull down to refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDeleteBook = async (bookId) => {
    try {
      setDeleteBookId(bookId);

      const response = await fetch(`${API_URL}/reading-materials/${bookId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete book");

      setBooks(books.filter((book) => book._id !== bookId));
      Alert.alert("Success", "Recommendation deleted successfully");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to delete recommendation");
    } finally {
      setDeleteBookId(null);
    }
  };

  const confirmDelete = (bookId) => {
    Alert.alert("Delete Recommendation", "Are you sure you want to delete this recommendation?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => handleDeleteBook(bookId) },
    ]);
  };

  const renderBookItem = ({ item }) => (
    <View style={styles.bookCard} key={item._id}>
      <View style={styles.bookDetails}>
        <View styele={{flexDirection:"column", flex:1, justifyContent:"space-between", marginBottom:10}}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            { item.version && <Text style={styles.headerSubtitle}>Version: {item.version}</Text>}
            { item.edition && <Text style={styles.headerSubtitle}>Edition: {item.edition}</Text>}
          </View>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupLabel}>Publisher Name:</Text>
          <Text style={styles.groupValue}>{item.author }</Text>
        </View>
        
        <View style={styles.keywordsContainer}>
          <Text style={styles.groupLabel}>Keywords:</Text>
          <View style={styles.keywordsPills}>
            {item.keywords && item.keywords.length > 0 ? (
              item.keywords.map((keyword, index) => (
                <View key={index} style={styles.keywordPill}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noKeywords}>None</Text>
            )}
          </View>
        </View>

        <View style={styles.keywordsContainer}>
          <Text style={styles.groupLabel}>Subject titles: </Text>
          <View style={styles.keywordsPills}>
            {item.subjectTitles && item.subjectTitles.length > 0 ? (
              item.subjectTitles.map((keyword, index) => (
                <View key={index} style={styles.subjectPill}>
                  <Text style={styles.subjectPillText}>{keyword}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noKeywords}>None</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    await fetchData();
    setRefreshing(false);
  };

  if (isLoading && !refreshing) return <Loader />;

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />

      {/* YOUR RECOMMENDATIONS */}
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Library Resource Recommendations 📚</Text>
      </View>

      
      <View style={{ flex: 1 }}>
        {/* Tabs Header */}
        <View style={styles.tabsHeader}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => setActiveTab("Suggested")} style={{ padding: 10, flexDirection: "row"}}>
              <Text style={{ color: activeTab === "Suggested" ? "blue" : "gray" }}>Suggested </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("Recommended")} style={{ padding: 10, flexDirection: "row"}}>
              <Text style={{ color: activeTab === "Recommended" ? "blue" : "gray" }}>Recommended</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.booksCount}>{books.length} </Text>
        </View>
        

        <FlatList
            data={books}
            renderItem={renderBookItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.booksList}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="book-outline" size={50} color={COLORS.textSecondary} />
                <Text style={styles.emptyText}>No recommendations yet</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
                  <Text style={styles.addButtonText}>Add Your First Recommendation</Text>
                </TouchableOpacity>
              </View>
            }
          />
      </View>
    </View>
  );
}