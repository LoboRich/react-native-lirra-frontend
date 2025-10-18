// app/wordcloud.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
// @ts-ignore
import WordCloud from "react-native-word-cloud";
import { API_URL } from "../constants/api";

export default function WordCloudScreen() {
  const [words, setWords] = useState(
    [ { "word": "Math", "count": 5 }, { "word": "Science", "count": 3 }]
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchWords = async () => {
  //     try {
  //       const res = await fetch(`${API_URL}/reading-materials/keywords`);
  //       const data = await res.json();

  //       // ensure data is an array before sorting
  //       const sortedWords = Array.isArray(data)
  //         ? data.sort((a, b) => b.count - a.count)
  //         : [];

  //       setWords(sortedWords);
  //     } catch (err) {
  //       console.error("Error loading words:", err);
  //       setError("Failed to load keywords");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWords();
  // }, []);

  console.log(words);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

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

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-2">Word Cloud</Text>
      <WordCloud
        words={words.map((w) => ({ word: w.word, frequency: w.count }))}
        minFontSize={14}
        maxFontSize={40}
      />
    </View>
  );
}
