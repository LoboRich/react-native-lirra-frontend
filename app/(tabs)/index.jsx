import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import { useAuthStore } from "../../store/authStore";
  import { useCallback, useEffect, useState } from "react";
  import styles from "../../assets/styles/home.styles";
  import { API_URL } from "../../constants/api";
  import { Ionicons } from "@expo/vector-icons";
  import COLORS from "../../constants/colors";
  import Loader from "../../components/Loader";
  import ListHeader from "../../components/ListHeader";
  import { useFocusEffect } from "expo-router";
  
  export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  export default function Home() {
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
          `${API_URL}/reading-materials?approved=false&page=${pageNum}&limit=5&search=${encodeURIComponent(
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

    useFocusEffect(
      useCallback(() => {
        fetchReadingMaterials(1, true);
      }, [])
    );

    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        fetchReadingMaterials(1, true);
      }, 500);
    
      return () => clearTimeout(delayDebounce);
    }, [searchQuery]);
    const handleLoadMore = async () => {
      if (hasMore && !loading && !refreshing) {
        await fetchReadingMaterials(page + 1);
      }
    };
    const handleVote = async (materialId) => {
      try {
        const response = await fetch(`${API_URL}/votes/${materialId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to vote");
        }
    
        const data = await response.json();
    
        setreadingMaterials((prev) =>
          prev.map((m) =>
            m._id === materialId
              ? { ...m, hasVoted: data.voted, votesCount: data.votesCount }
              : m
          )
        );
      } catch (err) {
        console.log("Vote error:", err);
      }
    };
    const handleApprove = async (materialId) => {
      try {
        const response = await fetch(`${API_URL}/reading-materials/${materialId}/approve`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to vote");
        }
        Alert.alert("Success", "Book approved successfully");
        const data = await response.json();
        await fetchReadingMaterials(1, true);
        
      } catch (err) {
        console.log("Vote error:", err);
      }
    };    
    const renderItem = ({ item }) => (
      <View style={styles.bookCard} key={item._id}>
        {/* Book Details */}
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

        <View style={styles.voteApproveIcons}>
           {/* Vote Section */}
           <View style={styles.voteSection}>
            <TouchableOpacity
              style={[styles.voteButton, item.hasVoted && styles.voteButtonActive]}
              onPress={() => handleVote(item._id)}
            >
              <Ionicons
                name={item.hasVoted ? "thumbs-up" : "thumbs-up-outline"}
                size={22}
                color={item.hasVoted ? COLORS.primary : COLORS.textSecondary}
              />
              <Text style={styles.voteText}>{item.votesCount || 0}</Text>
              <Text style={{color:COLORS.primary}} >Recommend</Text>
            </TouchableOpacity>
          </View>
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
            <ListHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} title={"LIRRA"} description={"Library Resources Recommender Application"}/>
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