import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import { useAuthStore } from "../../store/authStore";
  
  import { Image } from "expo-image";
  import { useEffect, useState } from "react";
  
  import styles from "../../assets/styles/home.styles";
  import { API_URL } from "../../constants/api";
  import { Ionicons } from "@expo/vector-icons";
  import { formatPublishDate } from "../../lib/utils";
  import COLORS from "../../constants/colors";
  import Loader from "../../components/Loader";
  import ListHeader from "../../components/ListHeader";
  
  export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  export default function Approved() {
    const { token } = useAuthStore();
    const [readingMaterials, setreadingMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchReadingMaterials = async (pageNum = 1, refresh = false) => {
      try {
        if (refresh) setRefreshing(true);
        else if (pageNum === 1) setLoading(true);
    
        const response = await fetch(
          `${API_URL}/reading-materials?page=${pageNum}&limit=5&search=${encodeURIComponent(
            searchQuery
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
    
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch reading materials");
    
        const uniquereadingMaterials =
          refresh || pageNum === 1
            ? data.readingMaterials
            : Array.from(
                new Set([...readingMaterials, ...data.readingMaterials].map((book) => book._id))
              ).map((id) =>
                [...readingMaterials, ...data.readingMaterials].find((book) => book._id === id)
              );
    
        setreadingMaterials(uniquereadingMaterials);
        setHasMore(pageNum < data.totalPages);
        setPage(pageNum);
      } catch (error) {
        console.log("Error fetching reading Materials", error);
      } finally {
        if (refresh) {
          await sleep(800);
          setRefreshing(false);
        } else setLoading(false);
      }
    };
    
  
    useEffect(() => {
        fetchReadingMaterials();
    }, []);

    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        fetchReadingMaterials(1, true);
      }, 500); // 500ms delay after typing stops
    
      return () => clearTimeout(delayDebounce);
    }, [searchQuery]);
    
  
    const handleLoadMore = async () => {
      if (hasMore && !loading && !refreshing) {
        await fetchReadingMaterials(page + 1);
      }
    };  
    
    const renderItem = ({ item }) => (
      <View style={styles.bookCard}>
        {/* Header: User info */}
        <View style={styles.bookHeader}>
          <View style={styles.userInfo}>
            <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
            <Text style={styles.username}>{item.user.username}</Text>
          </View>
        </View>

        {/* Book Image */}
        <View style={styles.bookImageContainer}>
          <Image source={item.image} style={styles.bookImage} contentFit="cover" />
        </View>

        {/* Book Details */}
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
          <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>
        </View>
      </View>

    );
  
    if (loading) return <Loader />;
  
    return (
      <View style={styles.container}>
        <FlatList
          data={readingMaterials}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchReadingMaterials(1, true)}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={
            <ListHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          }
          ListFooterComponent={
            hasMore && readingMaterials.length > 0 ? (
              <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>No recommendations yet</Text>
              <Text style={styles.emptySubtext}>Be the first to share a recommendation!</Text>
            </View>
          }
        />
      </View>
    );
  }