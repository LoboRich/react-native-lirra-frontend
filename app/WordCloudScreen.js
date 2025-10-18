// app/WordCloudScreen.js
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";
import cloud from "d3-cloud";
import * as d3 from "d3-scale";
import { API_URL } from "../constants/api";

export default function WordCloudScreen() {
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const res = await fetch(`${API_URL}/reading-materials/keywords`);
        const data = await res.json();

        // Expecting data = [{ text: "Math", count: 12 }, { text: "Science", count: 5 }]
        const words = Array.isArray(data)
          ? data.map((d) => ({
              text: d.text,
              size: Math.max(10, d.count * 5),
            }))
          : [];

        const layoutGen = cloud()
          .size([350, 350])
          .words(words)
          .padding(5)
          .rotate(() => (Math.random() > 0.5 ? 0 : 90))
          .font("sans-serif")
          .fontSize((d) => d.size)
          .on("end", (computed) => {
            setLayout(computed);
            setLoading(false);
          });

        layoutGen.start();
      } catch (err) {
        console.error("Error fetching keywords:", err);
        setLoading(false);
      }
    };

    fetchKeywords();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!layout.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No keywords found</Text>
      </View>
    );
  }

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Word Cloud
      </Text>

      <Svg width={350} height={350}>
        {layout.map((word, i) => (
          <SvgText
            key={i}
            x={word.x + 175}
            y={word.y + 175}
            fontSize={word.size}
            fill={colorScale(i)}
            textAnchor="middle"
            rotation={word.rotate}
          >
            {word.text}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
