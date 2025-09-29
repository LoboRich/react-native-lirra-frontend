import React from "react";
import { View } from "react-native";
import { useTheme, SegmentedButtons } from "react-native-paper";
import COLORS from "../constants/colors";

const theme = {
    colors: {
      primary: COLORS.primary,
      onPrimary: COLORS.white,
      surfaceVariant: COLORS.inputBackground,
      onSurfaceVariant: COLORS.textDark,
    },
  };
export default function TeacherStatusSegments() {
    const [value, setValue] = React.useState("contributors");

  return (
    <View style={{ marginHorizontal: 10, marginTop: 50 }}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "contributors",
            label: "Contributors",
            style: { 
              borderRadius: 8,
              backgroundColor: value === "contributors" 
                ? theme.colors.primary 
                : theme.colors.surfaceVariant 
            },
            labelStyle: { 
              color: value === "contributors" 
                ? theme.colors.onPrimary 
                : theme.colors.onSurfaceVariant 
            }
          },
          {
            value: "all",
            label: "All",
            style: { 
              borderRadius: 8,
              backgroundColor: value === "all" 
                ? theme.colors.primary 
                : theme.colors.surfaceVariant 
            },
            labelStyle: { 
              color: value === "teachers" 
                ? theme.colors.onPrimary 
                : theme.colors.onSurfaceVariant 
            }
          },
          { 
            value: "pending", 
            label: "Pending",
            style: { 
              borderRadius: 8,
              backgroundColor: value === "pending" 
                ? theme.colors.primary 
                : theme.colors.surfaceVariant 
            },
            labelStyle: { 
              color: value === "pending" 
                ? theme.colors.onPrimary 
                : theme.colors.onSurfaceVariant 
            }
          },
        ]}
      />
    </View>
  );
}
