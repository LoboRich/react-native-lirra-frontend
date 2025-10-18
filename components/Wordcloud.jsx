import React from "react";
import { View, Text, Dimensions } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";
import styles from "../assets/styles/wordcloud.styles";

export default function WordCloud({words = []}) {
  // const words = [
  //   { text: "Math", count: 20 },
  //   { text: "Science", count: 6 },
  //   { text: "Reading", count: 5 },
  //   { text: "Art", count: 4 },
  //   { text: "Music", count: 3 },
  //   { text: "History", count: 3 },
  //   { text: "Language", count: 2 },
  //   { text: "Complexity", count: 2 },
  //   { text: "Organic", count: 3 },
  //   { text: "Whitening", count: 3 },
  //   { text: "Renew", count: 2 },
  //   { text: "Hydration", count: 2 },
  //   { text: "Brighthening", count: 7 },
  //   { text: "Firming", count: 6 },
  //   { text: "Farming", count: 3 },
  //   { text: "Pesticide", count: 3 },
  //   { text: "Renew", count: 2 },
  //   { text: "Copper", count: 2 },
  // ];
  const { width } = Dimensions.get("window");
  const height = 400; // Fixed height for the cloud area
  const centerX = width / 2;
  const centerY = height / 2;

  // Scale font sizes
  const maxCount = Math.max(...words.map((w) => w.count));
  const scaleFont = (count) => 12 + (count / maxCount) * 28;

  // Place words around a spiral
  const placedWords = [];
  const isOverlapping = (x, y, fontSize, text) => {
    const boxWidth = text.length * (fontSize * 0.6);
    const boxHeight = fontSize;
    return placedWords.some((p) => {
      const pw = p.text.length * (p.fontSize * 0.6);
      const ph = p.fontSize;
      return !(
        x + boxWidth / 2 < p.x - pw / 2 ||
        x - boxWidth / 2 > p.x + pw / 2 ||
        y + boxHeight / 2 < p.y - ph / 2 ||
        y - boxHeight / 2 > p.y + ph / 2
      );
    });
  };

  const getPosition = (i, total, fontSize, text) => {
    let angle = i * 0.5;
    let radius = 5;
    let x, y;
    let attempts = 0;

    do {
      x = centerX + Math.cos(angle) * radius;
      y = centerY + Math.sin(angle) * radius;

      angle += 0.3;
      radius += 4;
      attempts++;
    } while (isOverlapping(x, y, fontSize, text) && attempts < 300);

    placedWords.push({ x, y, fontSize, text });
    return { x, y };
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.pagetitle}>Teachers</Text> */}

      <Svg width={width - 32} height={height}>
        {words.map((w, i) => {
          const fontSize = scaleFont(w.count);
          const { x, y } = getPosition(i, words.length, fontSize, w.word);
          const color = `hsl(${Math.random() * 360}, 70%, 45%)`;

          return (
            <SvgText
              key={i}
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
