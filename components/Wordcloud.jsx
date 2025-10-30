import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";
import styles from "../assets/styles/wordcloud.styles"; // Make sure this is the correct path
import { API_URL } from "../constants/api";
import { useRouter } from "expo-router";

export default function WordCloud({ words = [], handleWordClick }) {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");
  const centerX = width / 2;
  const centerY = height / 2;

  if (!words.length) return null;

  // --- Sort words by count (descending) ---
  const sortedWords = [...words].sort((a, b) => b.count - a.count);

  // --- Font scaling ---
  const maxCount = Math.max(...sortedWords.map((w) => w.count));
  const minFontSize = 10;  // Smaller font sizes
  const maxFontSize = 36;  // Smaller maximum font size
  const scaleFont = (count) =>
    minFontSize + ((count / maxCount) * (maxFontSize - minFontSize));

  // --- Placed words tracking ---
  const placedWords = [];

  // --- Check for overlap ---
  const isOverlapping = (x, y, fontSize, text) => {
    const boxWidth = text.length * (fontSize * 0.5); // Smaller box width for smaller fonts
    const boxHeight = fontSize;
    return placedWords.some((p) => {
      const pw = p.text.length * (p.fontSize * 0.5); // Adjusted size for better overlap detection
      const ph = p.fontSize;
      return !(
        x + boxWidth / 2 < p.x - pw / 2 ||
        x - boxWidth / 2 > p.x + pw / 2 ||
        y + boxHeight / 2 < p.y - ph / 2 ||
        y - boxHeight / 2 > p.y + ph / 2
      );
    });
  };

  // --- Get a safe position ---
  const getPosition = (i, fontSize, text) => {
    let angle = Math.random() * Math.PI * 2;  // Random start angle
    let radius = 0;
    let x, y;
    let attempts = 0;

    const padding = fontSize * 1.4; // buffer from edges
    const step = 6;  // spiral step size

    do {
      x = centerX + Math.cos(angle) * radius;
      y = centerY + Math.sin(angle) * radius;

      // Check for boundary limits
      const boxWidth = text.length * (fontSize * 0.5); // Adjusted for smaller fonts
      const boxHeight = fontSize;
      const withinBounds =
        x - boxWidth / 2 > padding &&
        x + boxWidth / 2 < width - padding &&
        y - boxHeight / 2 > padding &&
        y + boxHeight / 2 < height - padding;

      if (withinBounds && !isOverlapping(x, y, fontSize, text)) {
        placedWords.push({ x, y, fontSize, text });
        return { x, y };
      }

      // Spiral outwards
      angle += 0.3 + Math.random() * 0.1; // Slight variation in angle
      radius += step;  // Increase radius to create spacing
      attempts++;
    } while (attempts < 800); // max attempts to avoid infinite loop

    // Fallback to center if placement fails
    return { x: centerX, y: centerY };
  };

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {sortedWords.map((w, i) => {
          const fontSize = scaleFont(w.count);  // Scale font size based on count
          const { x, y } = getPosition(i, fontSize, w.word);
          const color = `hsl(${Math.random() * 360}, 70%, 45%)`;

          return (
            <SvgText
              key={i}
              onPress={() => handleWordClick(w.word)}
              x={x}
              y={y}
              fill={color}
              fontSize={fontSize}
              fontWeight="bold"
              textAnchor="middle"
            >
              {w.word}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}