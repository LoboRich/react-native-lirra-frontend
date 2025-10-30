import {
    View
  } from "react-native";
  import { useEffect, useState } from "react";
  import Loader from "../../components/Loader";
  import styles from "../../assets/styles/for-procurement.styles";
  import { API_URL } from "../../constants/api";
import WordCloud from "../../components/Wordcloud";
import { useRouter } from "expo-router";
  
  export default function WordCloudScreen() {
    const [words, setWords] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchWords = async () => {
          try {
            const res = await fetch(`${API_URL}/reading-materials/keywords`);
            const data = await res.json();
    
            // ensure data is an array before sorting
            const sortedWords = Array.isArray(data)
              ? data.sort((a, b) => b.count - a.count)
              : [];
    
            setWords(sortedWords);
          } catch (err) {
            console.error("Error loading words:", err);
            setError("Failed to load keywords");
          } finally {
            setLoading(false);
          }
        };
    
        fetchWords();
      }, []);
    if (loading) return <Loader />;

    if (error) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">{error}</Text>
        </View>
      );
    }
  
    if (words.length === 0) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text>No words available</Text>
        </View>
      );
    }

    const handleWordClick = (word) => {
      console.log("Word clicked:", word);
      router.push(`/?keyword=${encodeURIComponent(word)}`);
    };
    
    return (
      <View style={styles.container}>
        <WordCloud words={words} handleWordClick={handleWordClick}/>
      </View>
    );
  }