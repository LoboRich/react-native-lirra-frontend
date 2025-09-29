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
  import { API_URL } from "../../constants/api";
  import { Ionicons } from "@expo/vector-icons";
  import { formatPublishDate } from "../../lib/utils";
  import COLORS from "../../constants/colors";
  import Loader from "../../components/Loader";
  import ListHeader from "../../components/ListHeader";
  import styles from "../../assets/styles/for-procurement.styles";
  
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
    
    // inside Approved.js
    const renderItem = ({ item }) => (
      <View style={styles.bookCard}>
        {/* Left: Image */}
        <Image
          source={item.image}
          style={styles.bookImage}
          contentFit="cover"
        />
    
        {/* Right: Details */}
        <View style={styles.bookDetails}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={styles.username}>{item.user.username}</Text>
          </View>
    
          {/* Title + Caption */}
          <Text style={styles.bookTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.caption} numberOfLines={2}>
            {item.caption}
          </Text>
    
          {/* Date */}
          <Text style={styles.date}>
            Shared on {formatPublishDate(item.createdAt)}
          </Text>
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
            <ListHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} title={"For Procurement"} description={"Discover the best reading materials shared by our community."}/>
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